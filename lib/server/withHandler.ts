import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST";

// methods는 허용된 HTTP 메서드 배열, handler는 API요청을 처리
interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // 요청된 메서드가 허용되지 않을 경우
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    // 유저 정보를 찾지 못했을 경우
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false });
    }
    try {
      // API 요청
      await handler(req, res);
    } catch (error) {
      // 에러 발생 시, 500 상태 코드와 에러 정보를 반환
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
