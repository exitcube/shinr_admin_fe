import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const PageTitle: React.FC<IProps> = ({ redirectPath, title }) => {
  return (
    <Link href={redirectPath} className="flex gap-2 items-center mb-8">
      <ArrowLeft /> <p className="text-sm">{title}</p>
    </Link>
  );
};

interface IProps {
  redirectPath: string;
  title: string;
}
