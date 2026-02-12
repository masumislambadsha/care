import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerClientSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const registerCaregiverSchema = registerClientSchema.extend({
  nid_number: z.string().min(10, "NID number is required"),
  services_offered: z.array(z.string()).min(1, "Select at least one service"),
  experience: z.number().min(0, "Experience must be 0 or greater"),
  hourly_rate: z.number().min(1, "Hourly rate must be at least $1"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterClientInput = z.infer<typeof registerClientSchema>;
export type RegisterCaregiverInput = z.infer<typeof registerCaregiverSchema>;
