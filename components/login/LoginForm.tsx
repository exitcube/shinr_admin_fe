import React from "react";
import { PrimaryButton } from "../common/PrimaryButton";

export const LoginForm: React.FC = () => {
  return (
    <div className="bg-white rounded-t-[40px] ">
      <div className="px-14 pt-20 flex flex-col gap-24 h-full">
        <div className=" flex flex-col gap-5">
          <input
            className=" border border-[#878787] rounded-xl min-w-md p-3"
            placeholder="User name"
          />
          <input
            className=" border border-[#878787] rounded-xl min-w-md p-3"
            placeholder="Password"
          />
          <button className="text-primary font-medium text-base text-end">
            Forgot Password
          </button>
        </div>
        <PrimaryButton title="Login" />
      </div>
    </div>
  );
};
