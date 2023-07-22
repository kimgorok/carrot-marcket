import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 요청 바디에서 phone을 가져옴
  const { phone } = req.body;

  // DB에 해당하는 번호가 있는지 검사
  const foundUser = await db.user.findUnique({
    where: {
      phone,
    },
  });
  // DB에 없는 번호일 경우, 404코드와 fail상태를 리턴
  if (!foundUser) return res.status(404).json({ status: "fail" });

  // 존재하는 유저라면, 세션에 로그인 정보 저장
  req.session.user = {
    // id를 세션에 저장
    id: foundUser?.id,
  };
  await req.session.save();

  // 로그인 성공을 응답
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
