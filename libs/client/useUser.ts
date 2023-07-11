import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// response를 받으면 response.json()을 리턴
const fetcher = (url: string) => fetch(url).then((response) => response.json);

export default function useUser() {
  const { data, error } = useSWR("api/users/me", fetcher);
  const router = useRouter();

  //

  return data;
}
