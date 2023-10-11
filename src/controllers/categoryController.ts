import { Request, Response } from "express";
import categoryService from "../services/categoryService";
import userService from "../services/userService";

async function getCategories(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    try {
      const categories = await categoryService.findCategories(userId);
      return response.status(200).json(categories);
    } catch(error) {
      return response.status(500).json("Error ao buscar categorias");
    }
  } else {
    response.status(401).json("Usuário não autorizado.");
  }
}

const categoriesController = {
  getCategories
}

export default categoriesController;