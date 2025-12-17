import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const PrimaryButton: React.FC<IProps> = ({
  title,
  className = "",
  ...pops
}) => {
  return (
    <button
      className={`w-full rounded-xl bg-primary text-white px-4 p-3 font-medium ${className}`}
      {...pops}
    >
      {title}
    </button>
  );
};
