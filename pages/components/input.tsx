import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  // 이 key가 아무 prop이나 보낼 수 있게 함
  [key: string]: any;
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
}

export default function Input({
  name,
  register,
  type,
  required,
  // 그리고 그 prop은 여기서 받음
  ...rest
}: InputProps) {
  return (
    <div>
      <div className="rounded-md relative flex ">
        <input
          id={name}
          required={required}
          {...register}
          {...rest}
          type={type}
          className="text-black w-full appearance-none px-8 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
