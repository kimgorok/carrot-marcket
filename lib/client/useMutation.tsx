import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  // API 호출 상태를 관리
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  // API 홀출을 수행하는 mutation함수
  function mutation(data: any) {
    // API 호출 전 loading을 true로
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // APi 호출 결과를 json형식으로 바꾸고. data에 저장
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .catch((error) => setSate((prev) => ({ ...prev, error })))
      // API 호출 완료 후 loading은 false가 됨
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
