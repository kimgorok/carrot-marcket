import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

// 클라이언트가 없으면 새로 만들고 있으면 기존꺼를 global.client에 저장
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
