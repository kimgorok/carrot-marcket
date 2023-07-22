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
  const alreadyExists = await db.fav.findFirst({
    // 유저가 이미 좋아요를 눌렀는지 탐색
    where: {
      tweetId: +id.toString(),
      userId: user?.id,
    },
  });
  // 이미 좋아요를 눌렀을 경우 좋아요 취소
  if (alreadyExists) {
    await db.fav.delete({
      where: {
        // 이미 존재하는 좋아요 데이터의 id를 사용하여 삭제
        id: alreadyExists.id,
      },
    });
    // 좋아요를 누르지 않았을 경우 좋아요!
  } else {
    await db.fav.create({
      data: {
        // 좋아요를 누른 유저(id)와 트윗을 연결시킴
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            // tweet id를 숫자로 변환
            id: +id.toString(),
          },
        },
      },
    });
  }

  // 클라이언트에 성공적으로 처리하였다고 응답
  res.json({ status: "success" });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
