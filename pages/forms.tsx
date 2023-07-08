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
  login: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });
  const onValid = (data: LoginForm) => {
    setError("login", { message: "Thank you" });
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-center">
        Name:
        <input
          {...register("username", {
            required: "Please Write down your name.",
          })}
          type="text"
          className="hover:ring-2 ring-offset-slate-900"
        />
        {errors.username?.message}
      </div>
      <div className="flex items-center">
        Email:
        <input
          {...register("email", {
            required: "Please Write down your email.",
            validate: {
              onlyNaver: (value) =>
                value.includes("@naver.com") || "Only @naver emails allowed",
            },
          })}
          type="email"
          placeholder="Only @naver.com"
        />
        {errors.email?.message}
      </div>
      <div className="flex items-center">
        Password:
        <input
          {...register("password", {
            required: "Please Write down your password.",
            minLength: {
              message: "Password has to be more than 10 char",
              value: 10,
            },
          })}
          type="password"
          placeholder="Min 10 Characters"
        />
        {errors.password?.message}
      </div>
      <input type="submit" value="login" />
      {errors.login?.message}
    </form>
  );
}
