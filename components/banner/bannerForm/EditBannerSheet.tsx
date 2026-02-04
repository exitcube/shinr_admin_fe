import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { BannerForm } from "./BannerForm";
import { SingleBannerResponse } from "@/types/banner";
import { useSingleBanner } from "@/hooks/useBannerQuery";
import { PageLoading } from "@/components/common/PageLoader/PageLoading";

export const EditBannerSheet: React.FC<IProps> = ({
  bannerId,
  open,
  setOpen,
}) => {
     const { data, isLoading } = useSingleBanner(bannerId.toString())
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
     {isLoading ?  <PageLoading />: <BannerForm close={() => setOpen(false)} bannerData={data?.data}  bannerId={bannerId}/>}
    </SheetWrapper>
  );
};
interface IProps {
  bannerId: number 
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
