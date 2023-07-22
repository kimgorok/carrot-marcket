import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 메서드가 GET일 경우
  if (req.method === "GET") {
    // 데이터에서 트윗 목록을 조회
    const tweets = await db.tweet.findMany({
      include: {
        user: true,
        // 좋아요 수를 카운트
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    // 조회한 트윗을 응답
    res.json({
      status: "success",
      tweets,
    });
  }

  // 메서드가 POST일 경우
  if (req.method === "POST") {
    const {
      body: { message },
      session: { user },
    } = req;

    // DB에 새로운 트윗을 생성
    const tweet = await db.tweet.create({
      data: {
        message,
        user: {
          connect: {
            // 유저 세션 정보에서 id를 가져오고, 유저와 트윗을 연결
            id: user?.id,
          },
        },
      },
    });

    // 생성한 트윗을 응답
    res.json({
      status: "success",
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
