"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BannerForm } from "../bannerForm/BannerForm";
import { useSingleBanner } from "@/hooks/useBannerQuery";

export const BannerDetailForm = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useSingleBanner(id);
  const banner = data?.data;

  if (isLoading) return <p>Loading...</p>;

  return (
    <BannerForm
      bannerData={banner}
      close={() => router.push("/banner")}
      isDetailView
    />
  );
};
