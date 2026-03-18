import { BannerDetailForm } from "@/components/banner/bannerDetail/BannerDetailForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BannerByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <Link href={'/banner'} className="flex gap-2 items-center mb-8">
        <ArrowLeft /> <p className="text-sm">Banner Details</p>
      </Link>
      <BannerDetailForm />
    </div>
  );
};
