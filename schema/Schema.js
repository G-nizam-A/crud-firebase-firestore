import { z } from "zod";

export const ProjectSchema = z.object({
    client_name: z.string().min(1, { message: "Name is required", }).max(100),
    project_name: z.string().min(1, { message: "Project name is required", }).max(100),
    price: z.string().min(1, { message: "Price name is required", }).max(7, { message: "Enough, thank you", }),
    email: z.string(),
    status: z.string(),
    // phone: z.number().gte(10, { message: "Invalid phone number", }).lte(10, { message: "Invalid phone number", }),
    phone: z.string().regex(/^\+?[0-9]{10}$/, { message: "Invalid phone number", }),
  
});
