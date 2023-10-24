import { z } from "zod";

const voidOrNull = (field: string) =>
  `${field}: vazio ou nulo: Dado obrigatório.`;
const type = (field: string) => `Tipo Inválido, ${field} é do tipo string.`;
const minCharacter = (field: string, min?: number) =>
  `${field} deve ter no mínimo ${min} caracteres.`;
const maxCharacter = (field: string, max?: number) =>
  `${field} deve ter no máximo ${max} caracteres.`;

const saveUserSchema = z.object({
  name: z
    .string({
      required_error: voidOrNull("Nome"),
      invalid_type_error: type("Nome"),
    })
    .min(3, { message: minCharacter("Nome", 3) })
    .max(100, { message: maxCharacter("Nome", 100) }),
  login: z
    .string({
      required_error: voidOrNull("Login"),
      invalid_type_error: type("Login"),
    })
    .min(3, { message: minCharacter("Login", 3) })
    .max(30, { message: maxCharacter("Login", 30) }),
  password: z
    .string({
      required_error: voidOrNull("Password"),
      invalid_type_error: type("Password"),
    })
    .min(3, { message: minCharacter("Password", 3) })
    .max(30, { message: maxCharacter("Password", 20) }),
});

export type saveUserSchemaType = z.infer<typeof saveUserSchema>
export default saveUserSchema;