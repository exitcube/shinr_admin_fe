import z from "zod";
import { startOfDay } from "date-fns";

export const adminuserSchema = (isEdit: boolean) => z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  joiningDate: isEdit
    ? z.date().optional()
    : z
        .date()
        .min(startOfDay(new Date()), "Joining date is required"),
  pageAccess: z.array(z.string()),
});
