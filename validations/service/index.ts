import { z } from "zod";

export const serviceSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(1, "name is required"),
    displayName: z.string().min(1, "display name is required"),
    description: z.string().min(1, "description is required"),
    displaySequence: z.string().min(1, "display sequence is required"),
    serviceImg: isEdit
      ? z.any().optional()
      : z
          .instanceof(File)
          .refine((file) => file.size > 0, "Image is required")
          .refine(
            (file) =>
              ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
            "Only PNG, JPG, JPEG allowed",
          ),
  });

export type ServiceFormValues = z.infer<ReturnType<typeof serviceSchema>>;
