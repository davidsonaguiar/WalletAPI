import { Category } from '@prisma/client';
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

async function addCategory(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const category: Category = await request.body;
    category.user_id = userId;
    try {
      await categoryService.findCategoryByUnique(category.name, category.type, userId);
      return response.status(400).json("Categoria já cadastrada.");
    } catch(error) {
      try {
        await categoryService.saveCategory(category);
        return response.status(201).json("Categoria cadastrada com sucesso.");
      } catch(error) {
        return response.status(500).json("Erro ao cadatrada categoria.");
      }
    }
  }
}

async function editCategory(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const categoryId: string = request.params.id;
    const category: Category = request.body;
    category.user_id = userId;
    category.id = Number(categoryId);
    try {
      await categoryService.findCategoryByUnique(category.name, category.type, userId);
      return response.status(400).json("Categoria já cadastrada.");
    } catch(erro) {
      try {
        await categoryService.findCategoryById(Number(categoryId));
        await categoryService.updateCategory(category);
        return response.status(200).json("Categoria editada com sucesso.");
      } catch(erro) {
        return response.status(404).json("Categoria não localizada.")
      }
    }
  }
}

async function removeCategory(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const categoryId = request.params.id;

    try {
      await categoryService.findCategoryById(Number(categoryId));
    } catch(error) {
      return response.status(404).json("Categoria não localizada.");
    }

    try {
      await categoryService.deleteCategory(Number(categoryId));
      return response.status(200).json("Categoria deletada com sucesso.");
    } catch(error) {
      return response.status(400).json("Categoria vinculada a transações.");
    }

  }
}

const categoriesController = {
  getCategories,
  addCategory,
  editCategory,
  removeCategory
}

export default categoriesController;