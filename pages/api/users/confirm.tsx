import twilio from "twilio";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import withHanlder from "@/libs/server/withHandler";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.save);
  // req.body에 토큰을 담아 보냄
  const { token } = req.body;
  // 그 토큰을 찾아 봄
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  // 토큰이 없으면 404를 리턴
  if (!foundToken) return res.status(404).end();
  // 토큰이 있으면 유저의 id를 req.session.user에 넣음
  req.session.user = {
    id: foundToken.userId,
  };
  // 그리고 세션을 저장
  await req.session.save();
  // 그리고 찾은 토큰의 usserId와 같은 userId를 가진 token을 전부 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(
  withHanlder({ method: "POST", handler, isPrivate: false })
);
