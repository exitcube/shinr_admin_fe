import { z } from "zod";

export const organisationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number is required")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  profileImage: z.instanceof(File).optional(),
});
