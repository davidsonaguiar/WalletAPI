export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }

  static userNotFound() {
    return new AuthenticationError("Email não cadastrado");
  }

  static passwordIncorrect() {
    return new AuthenticationError("Senha incorreta");
  }

  static emailExists() {
    return new AuthenticationError("Email já cadastrado");
  } 

}