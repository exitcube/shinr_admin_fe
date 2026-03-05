'use client'
import { useParams } from "next/navigation";
import React from "react";
import { CustomerForm } from "../CustomerForm";
import { useSingleCustomer } from "@/hooks/useCustomerQuery";
import { Spinner } from "@/components/ui/spinner";



export const CustomerDetailForm: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const { data: singleCustomerData,isLoading  } = useSingleCustomer(id);
  const result = singleCustomerData?.data;
  const handleClose = () => null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
        <CustomerForm data={result} onCancel={handleClose}/>
  )
};
