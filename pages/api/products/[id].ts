import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    // 이렇게 유저를 가져옴
    // user에서 id랑 name랑 avatar 가져오도록 선택적으로 요청
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
  console.log(product);
  res.json({
    ok: true,
    product,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);