import z from "zod";

export const adminuserSchema = (isEdit: boolean) => z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  joiningDate:isEdit
  ? z.date().optional()
  : z.date().min(new Date(), "Joining date is required"),
  pageDashboard: z.boolean(),
  pageBanner: z.boolean(),
  pageRewards: z.boolean(),
  pageBookings: z.boolean(),
  pageUser: z.boolean(),
  pageCustomer: z.boolean(),
});
