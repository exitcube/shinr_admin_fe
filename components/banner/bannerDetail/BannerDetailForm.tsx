"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { BannerForm } from "../bannerForm/BannerForm";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { useSingleBanner } from "@/hooks/useBannerQuery";

export const BannerDetailForm = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useSingleBanner(id);
  const banner = data?.data;

  if (isLoading) return <p>Loading...</p>;

  return (
    <BannerForm
      bannerData={banner}
      close={() => console.log("Closed")}
    />
  );
};