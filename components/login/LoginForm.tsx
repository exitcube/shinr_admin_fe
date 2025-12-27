"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PrimaryButton } from "../common/PrimaryButton";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/useAuthQuery";
import { loginSchema } from "@/validations/auth";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAccessToken } from "@/lib/utils";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { mutate: login, isPending: isLoggingIn } = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        userName: data.userName,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          setAccessToken(data.accessToken);
          router.push("/dashboard");
          toast.success("Login successful!");
        },
        onError: (error) => {
          console.error("Login failed:", error.message);
          toast.error(`Login failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-t-[40px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-14 pt-20 flex flex-col gap-24 h-full"
        noValidate
      >
        <div className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <input
              {...register("userName")}
              className="border border-[#878787] rounded-xl min-w-md p-3"
              placeholder="User name"
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              {...register("password")}
              className="border border-[#878787] rounded-xl min-w-md p-3"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="button"
            className="text-primary font-medium text-base text-end"
          >
            Forgot Password
          </button>
        </div>
        <PrimaryButton
          title="Login"
          type="submit"
          disabled={isSubmitting}
          isLoading={isLoggingIn}
        />
      </form>
    </div>
  );
};
