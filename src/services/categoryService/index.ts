import deleteCategory from "./deleteCategory";
import findCategories from "./findCategories";
import findCategoryById from "./findCategoryById";
import findCategoryByUnique from "./findCategoryByUnique";
import saveCategory from "./saveCategory";
import updateCategory from "./updateCategory";


const categoryService = {
  findCategoryByUnique,
  findCategories, 
  findCategoryById,
  saveCategory,
  updateCategory,
  deleteCategory
}

export default categoryService;