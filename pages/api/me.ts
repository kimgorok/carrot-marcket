import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 세션에 저장된 사용자 id로 사용자를 조회
  const profile = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });

  // 조회 결과를 응답
  return res.json({ status: "ok", profile });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
