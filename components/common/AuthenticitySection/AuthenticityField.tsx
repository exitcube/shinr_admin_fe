"use client";

import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldValues, Path } from "react-hook-form";
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";

interface AuthenticityFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
}

export function AuthenticityField<T extends FieldValues>({
    control,
    name,
    label = "Authenticity",
}: AuthenticityFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                        {label}
                    </FormLabel>

                    <FormControl>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-4">
                                <LabelledRadioInput
                                    label="Shinr"
                                    value="SHINR"
                                    checked={field.value === "SHINR"}
                                    onChange={field.onChange}
                                />
                                <LabelledRadioInput
                                    label="Vendor"
                                    value="VENDOR"
                                    checked={field.value === "VENDOR"}
                                    onChange={field.onChange}
                                />
                            </div>
                            {field.value === "VENDOR" && (
                                <Input
                                    placeholder="Search Vendor"
                                    className="
                                                px-3 py-1
                                                min-h-[29px]
                                                rounded-[12px]
                                                border border-gray-300
                                                text-sm
                                                focus-visible:ring-0
                                                focus-visible:ring-offset-0
                                                "
                                />
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}