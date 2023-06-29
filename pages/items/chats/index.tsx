import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="py-10 divide-y-[1px]">
      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <div
          key={i}
          className="flex px-4  items-center space-x-3 py-3  cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-slate-500" />
          <div>
            <p className=" text-gray-700 ">Steve Jebs</p>
            <p className="text-sm  text-gray-500">
              내일 오후 2시에 모퉁이에서 만나요.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
