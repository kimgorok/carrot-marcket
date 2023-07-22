import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Tweet } from "@prisma/client";
import useMutation from "../../lib/client/useMutation";
import Layout from "../components/layout";
import Button from "../components/button";

interface UploadTweetForm {
  message?: number;
}

interface UploadTweetMutaion {
  status: string;
  tweet: Tweet;
}

const Upload: NextPage = () => {
  const router = useRouter();
  // react-hook-form을 사용하여 폼을 관리
  const { register, handleSubmit } = useForm<UploadTweetForm>();
  // API에서 데이터를 가져오고 트윗 업로드 mutation함수 작성
  const [uploadTweet, { loading, data }] =
    useMutation<UploadTweetMutaion>("/api/tweets");

  // 폼을 제출하면 유효성 검사를 실행 후, 트윗을 업로드
  const onValid = async (data: UploadTweetForm) => {
    if (loading) return;
    else {
      uploadTweet(data);
    }
  };

  // 트윗 업로드 상태가 success인 경우 해당 트윗으로 페이지 이동
  useEffect(() => {
    if (data?.status === "success") {
      router.push(`/tweet/${data.tweet.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="트윗">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="h-screen">
          <textarea
            className="text-black w-full h-1/3 appearance-none p-6 text-2xl rounded-xl  focus:outline-none ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("message", { required: true })}
            name="message"
            placeholder="무슨 일이 일어나고 있나요?"
            required
          />
          <div className="flex justify-end p-2">
            <Button text="트윗하기"></Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
