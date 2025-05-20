// Copied from Chatgpt
const { z } = require("zod");

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.number().int().min(13, { message: "Minimum age is 13" }),
  address: z.string().min(5, { message: "Address is too short" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
});

module.exports = { signupSchema, loginSchema };
