import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import withHandler from "../../../../lib/server/withHandler";
import { withApiSession } from "../../../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 요청에서 유저 id와 세션의 유저 정보를 가져옴
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: {
      id: +id!,
    },
    // 트윗을 작성한 유저 정보를 조회
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // 유저가 이미 좋아요를 눌렀는지
  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        tweetId: tweet?.id,
        // 세션 정보에서 id를 가져와 해당 유저의 좋아요 여부 확인
        userId: user?.id,
      },
    })
  );

  // 조회한 트윗 정보와 사용자가 좋아요를 눌렀는지를 보냄
  res.json({ status: "success", tweet, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
