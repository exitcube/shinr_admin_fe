import { LoginBanner } from "@/components/login/LoginBanner";
import { LoginForm } from "@/components/login/LoginForm";
import React from "react";

export const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-between pt-44 px-36 font-poppins min-h-screen">
      <LoginBanner />
      <LoginForm />
    </div>
  );
};
