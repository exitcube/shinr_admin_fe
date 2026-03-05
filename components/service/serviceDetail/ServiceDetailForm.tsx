"use client";
import { useParams } from "next/navigation";
import { ServiceForm } from "../ServiceForm";
import { useSingleService } from "@/hooks/useServiceQuery";
import { Spinner } from "@/components/ui/spinner";

export const ServiceDetailForm = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useSingleService(id);
  const service = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <ServiceForm
      serviceData={service}
      close={() => { }}
    />
  );
};