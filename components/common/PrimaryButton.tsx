import React from "react";
import { Spinner } from "../ui/spinner";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<IProps> = ({
  title,
  className = "",
  isLoading = false,
  disabled=false,
  ...pops
}) => {
  return (
    <button
      className={`w-full rounded-xl bg-primary text-white px-4 p-3 font-medium ${className} hover:cursor-pointer flex justify-center items-center gap-2 disabled:bg-[#90e9e3]`}
      disabled={disabled || isLoading}
      {...pops}
    >
      {title}
      {isLoading && <Spinner />}
    </button>
  );
};
