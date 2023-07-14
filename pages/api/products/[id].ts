import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  // db에서 product 가져오기
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
  // 비슷한 상품 검색을 위해 상품 이름을 띄어쓰기로 분리해서 배열에 넣음
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    // prisma에서 제공하는 검색
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  console.log(relatedProducts);
  res.json({
    ok: true,
    product,
    relatedProducts,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
