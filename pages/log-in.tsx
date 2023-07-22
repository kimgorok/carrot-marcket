import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import Button from "./components/button";
import Input from "./components/input";

interface EnterForm {
  phone: string;
}

interface MutationResult {
  status: string;
  ok: boolean;
}

export default function LogIn() {
  // API에서 데이터를 가져오고 로그인을 하는 mutation함수 작성
  const [logIn, { data }] = useMutation<MutationResult>("/api/logIn");

  // react-hook-form을 사용해서 폼을 관리
  const { register, handleSubmit } = useForm<EnterForm>();

  const onValid = (data: EnterForm) => {
    logIn(data);
  };

  const router = useRouter();
  // 로그인 API 호출 결과, 로그인 데이터가 존재하면 유저를 홈으로 이동시킴
  useEffect(() => {
    if (data?.ok === true) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold py-8 text-[2rem]">로그인하기</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="my-4 flex flex-col">
          <span className="text-lg mb-2">전화번호를 적어주세요 ( - 제외 )</span>
          <div className="flex">
            <Input
              register={register("phone", { required: true })}
              name="phone"
              type="number"
              placeholder="전화번호를 적어주세요"
              required
            />

            <Button text="로그인" />
          </div>
        </div>
        {data?.status === "fail" && (
          <div className="text-red-600">
            <div>번호를 잘못 입력했습니다.</div>
            <div>입력하신 내용을 다시 확인해주세요.</div>
          </div>
        )}
        <div className="my-8 pt-4 flex items-center">
          <div className="mr-4">계정이 없으신가요?</div>
          <Button
            text="가입하기"
            onClick={() => router.push("create-account")}
          />
        </div>
        <div className="pt-16 text-[0.66rem]">
          로그인에 실패했을 경우 같은 번호로 다시 시도 해 주십시오.
        </div>
      </form>
    </div>
  );
}
