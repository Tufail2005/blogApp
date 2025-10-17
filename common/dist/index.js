import z from "zod";
export const signupInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
export const signinInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional(),
});
