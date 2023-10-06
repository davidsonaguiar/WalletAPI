import { Request, Response } from "express";
import categoryService from "../services/categoryService";

async function getCategories(request: Request, response: Response) {
  try {
    const categories = await categoryService.findCategories();
    return response.status(200).json(categories);
  } catch(error) {
    return response.status(500).json("Error ao buscar categorias");
  }
}

const categoriesController = {
  getCategories
}

export default categoriesController;