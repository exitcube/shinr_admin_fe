import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { ServiceForm } from "./ServiceForm";
import { useSingleService } from "@/hooks/useServiceQuery";
import { PageLoading } from "../common/PageLoader/PageLoading";

export const EditServiceSheet: React.FC<IProps> = ({ open, setOpen, serviceId }) => {
     const { data, isLoading } = useSingleService(serviceId.toString())
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
      {isLoading ?  <PageLoading />:<ServiceForm
        close={() => setOpen(false)}
        serviceId={serviceId}
        serviceData={data?.data}
      />}
    </SheetWrapper>
  );
};
interface IProps {
  serviceId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
