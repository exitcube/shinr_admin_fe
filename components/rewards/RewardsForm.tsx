'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LabelledRadioInput } from "../common/LabelledRadioInput";
import { Button } from "../ui/button";
import { PrimaryButton } from "../common/PrimaryButton";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("../common/RichTextEditor"), {
  ssr: false,
});

export const RewardsForm: React.FC<IProps> = ({ onCancel }) => {
  const form = useForm({
    defaultValues: {
      authenticity: "shinr",
    },
  });

  const onSubmit = (data: any) => {
    console.log("FORM DATA", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="authenticity"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Reward authenticity
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <LabelledRadioInput
                        label="Shinr"
                        value="shinr"
                        checked={field.value === "shinr"}
                        onChange={field.onChange}
                      />
                      <LabelledRadioInput
                        label="Vendor"
                        value="vendor"
                        checked={field.value === "vendor"}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Reward Title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="side-text"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Side Text
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Side Text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              type="button"
              className="px-4 py-3 border-[#D6D6D6] w-36! cursor-pointer "
              onClick={() => onCancel()}
            >
              Draft
            </Button>
            <PrimaryButton
              type="submit"
              className="bg-primary text-white py-2 rounded-md w-36!"
              title="Create"
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

interface IProps {
  onCancel: () => void;
}
