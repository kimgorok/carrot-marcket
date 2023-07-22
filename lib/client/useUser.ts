import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  // useSWR을 사용해서 데이터를 가져옴
  const { data, error } = useSWR("/api/me");
  const router = useRouter();

  // 캐시에 SWR로 가져온 데이터가 없을 경우 log-in으로 이동
  useEffect(() => {
    if (!data) {
      router.replace("/log-in");
    }
  }, [data, router]);

  // user객체와 로딩 상태를 반환
  return { user: data?.profile, isLoading: !data && !error };
}
