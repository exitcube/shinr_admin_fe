import { z } from "zod";

export const bannerSchema = z.object({
    title: z.string().min(1, "Title is required"),
    authenticity: z.enum(["shinr", "vendor"], {
        message: "Select banner authenticity",
    }),
    bannerImage: z
        .instanceof(File)
        .refine((file) => file.size > 0, "Image is required")
        .refine(
            (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
            "Only PNG, JPG, JPEG allowed"
        ),
    category: z.string().min(1, "Select a category"),
    audience: z.enum(["everyone", "manual", "special_rule"], {
        message: "Select target audience",
    }),
    target_value: z.string().min(1, "Target value is required"),
    priority: z.string().min(1, "Priority is required"),
    startTime: z.date({ message: "Start time is required" }),
    endTime: z.date({ message: "End time is required" }),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;
