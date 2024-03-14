import { z } from "zod";

export const ProjectSchema = z.object({
    client_name: z.string().min(1, { message: "Name is required", }).max(100),
    project_name: z.string().min(1, { message: "Project name is required", }).max(100),
    price: z.string().min(1, { message: "Price name is required", }).max(7, { message: "Enough, thank you", }),
    email: z.string().default(''),
    phone: z.coerce.number().default(0),
});
