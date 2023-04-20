import { string, z } from "zod";

export const signUpSchema = z.object({
    firstName: string().min(1, { message: "First name is required" }),
    lastName: string().min(1, { message: "Last name is required" }),
    username: string().min(1, { message: "Username is required" }),
    email: string().email(),
    password: string().min(5, { message: "Password must contain at least 5 characters" }),
});

export const loginSchema = z.object({
    username: string().min(1, { message: "Username is required" }),
    password: string().min(5, { message: "Invalid password" })
});

export const searchSchema = z.object({
    search: string().min(1, { message: "Write something so we can search for it" }),
});

const picTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const profileSchema = z.object({
    firstName: string().min(1, { message: "First name is required" }),
    lastName: string().min(1, { message: "Last name is required" }),
    username: string().min(1, { message: "Username is required" }),
    email: string().email(),
    likes: string().optional(),
    dislikes: string().optional(),
    picture: z.any().refine((files) => picTypes.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp files are accepted.")
        .refine((files) => files?.[0]?.size <= 500000, "Max file size is 5MB"),
});