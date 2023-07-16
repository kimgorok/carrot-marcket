import React from "react";
import useSWR from "swr";
import { fetchData, getRandomId } from "./api/data";

const Home = () => {
  // useSWR로 /api/data에서 데이터를 가져옴. 그리고 fetchData로 data를 가져옴
  const { data, mutate } = useSWR("/api/data", fetchData);

  // 좋아요를 눌렀을때 작동하는 함수
  const handleLike = () => {
    // 먼저 data가 있는지 확인
    if (data) {
      // isLiked값을 반전, 기본값은 false였음
      const newData = { ...data, isLiked: !data.isLiked };
      // mutate 함수를 호출하여 데이터를 업데이트
      // 두 번째 인자로 false 주면 캐시를 재검증 하지 않음
      mutate(newData, false);
    }
  };

  // newDog를 클릭했을때 작동하는 함수
  const handleNewDog = () => {
    // 얻은 무작위 id를 newId에 저장
    const newId = getRandomId();
    // fetchData로 새로운 id를 가져오고 새로운 데이터를 업데이트
    mutate(fetchData(newId), false);
  };

  return (
    <div className="flex flex-col  bg-black w-screen h-screen">
      <div className="w-[80%] mx-auto">
        {/* 타이틀 */}
        <div className="font-bold text-4xl text-white">Woof.tv</div>

        {/* body */}
        <div className="bg-slate-800 flex flex-col justify-center w-[100%] px-32 py-12">
          {/* 비디오 */}
          <div className="flex w-[100%] justify-center ">
            {data && (
              <video
                src={data.url}
                controls
                autoPlay
                width="500"
                height="500"
              />
            )}
          </div>

          {/* 두 버튼 */}
          <div className="flex justify-center w-[100%] gap-2 mt-2 font-bold">
            <button
              className="bg-white rounded-md flex-grow-1 px-32 text-black p-4"
              onClick={handleNewDog}
            >
              New Dog!
            </button>
            <button
              className="bg-sky-500 rounded-md flex-grow-1 px-32 text-white p-4"
              onClick={handleLike}
            >
              {data?.isLiked ? "Unlike" : "Like"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
