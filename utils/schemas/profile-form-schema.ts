import { z } from "zod";

const cleanValue = (value: string) => value.replace(/\D/g, '');
export const formSchema = z.object({
    name: z.string().min(6, {
      message: "Min 6 caracteres",
    }).max(30),
    email: z.string().email(
        { message: "email inválido"}
    ),
    cpf: z.string().refine((value) => cleanValue(value).length === 11, { message: "Um CPF válido precisa ter 11 dígitos"}),
    street: z.string().min(6, {
      message: "Min 6 caracteres",
    }).max(50),
    neighborhood: z.string().min(6, {
      message: "Min 5 caracteres",
    }).max(50),
    cityState: z.string().min(6, {
      message: "Min 10 caracteres",
    }).max(50),
    cellphone: z.string().refine((value) => cleanValue(value).length === 11, { message: "Um número válido precisa ter 11 dígitos", }),
});