import { cls } from "../../lib/client/utils";

interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ onClick, text, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        " bg-blue-500 hover:bg-blue-600 px-6 text-lg border border-transparent rounded-lg"
      )}
    >
      {text}
    </button>
  );
}
