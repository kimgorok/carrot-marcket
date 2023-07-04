import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

// React Hook Form의 목표
// Less Code
// Better Validation
// Better Errors (set, clear, display)
// Have Control Over Inputs
// Don't Deal With Event
// Easier Inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // watch("name") 등으로 입력한 값을 얻어냄
    setError,
    setValue,
    reset,
    resetField, //특정필드만 초기화
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("난 유효해");
    setError("username", { message: "존재하는 유저네임입니다" }); // 오류를 수동으로 설정
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "이름이 필요해",
          minLength: {
            message: "5글자 이상",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.errors?.message}
      <input
        {...register("email", {
          required: "이메일 필요",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "쥐메일 안돼용",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "비밀번호 필요",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
