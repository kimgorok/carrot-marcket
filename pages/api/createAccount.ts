import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let user;
  const { name, phone } = req.body;
  const NewUser = { name, phone };
  user = await db.user.findUnique({
    // DB에서 전화번호로 사용자를 조회
    where: {
      phone: NewUser.phone,
    },
  });

  // 이미 존재하는 번호일 경우
  if (user) {
    // 존재함을 리턴
    return res.json({
      status: "exist",
    });
    // 새로운 번호일 경우 user에 생성
  } else {
    user = await db.user.create({
      data: {
        name,
        phone,
      },
    });

    // 생성 되었음을 리턴
    return res.json({
      status: "create",
    });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
