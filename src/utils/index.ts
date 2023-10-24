import jwt  from 'jsonwebtoken';

export function getUserIdByToken(auth: string) {
  const token = auth && auth.split(" ")[1];
  if (process.env.SECRET) {
    const user = jwt.verify(token, process.env.SECRET);
    console.log(user);
    if (typeof user === "object" && "id" in user) {
      return user;
    }
    return null;
  }
  return null;
}

export function tokenGenerator(user: { name: string; login: string }) {
  try {
    const token = jwt.sign(user, process.env.SECRET!);
    return token;
  } catch (errot) {
    throw new Error("Error ao gerar Token");
  }
}