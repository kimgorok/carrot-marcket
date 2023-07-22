import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import Input from "./components/input";
import Button from "./components/button";

interface EnterForm {
  name: string;
  phone: string;
}

interface MutationResult {
  status: string;
}

export default function createAccount() {
  const router = useRouter();
  // API에서 데이터를 가져오고 회원가입을 하는 mutation함수 작성
  const [createAccount, { data }] =
    useMutation<MutationResult>("/api/createAccount");

  // react-hook-form으로 폼을 관리
  const { register, handleSubmit } = useForm<EnterForm>();

  // 회원가입 mutate 함수 실행
  const onValid = (data: EnterForm) => {
    createAccount(data);
  };

  // mutate결과 status가 존재하면 log-in페이지로 이동시킴
  useEffect(() => {
    if (data?.status) {
      router.push("/log-in");
    }
  }, [data, router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold py-8 text-[2rem]">회원가입하기</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mb-6">
          <div className="text-lg mb-2">닉네임을 적어주세요</div>
          <Input
            register={register("name", { required: true })}
            name="nickname"
            type="text"
            placeholder="name123"
            required
          />
        </div>
        <div className="mb-6">
          <div className="text-lg mb-2">전화번호를 적어주세요 ( - 제외 )</div>
          <Input
            register={register("phone", { required: true })}
            name="phoneNumber"
            type="number"
            placeholder="01012345678"
            required
          />
        </div>
        <div className="my-8 flex justify-center">
          <Button text="가입하기" />
        </div>
      </form>
      <div className="mt-8 flex items-center justify-center">
        <span className="m-4">계정이 이미 있으신가요?</span>
        <Button text="로그인" onClick={() => router.push("log-in")} />
      </div>
    </div>
  );
}
