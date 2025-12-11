import axios from "axios";

const CATEGORY_API = "http://localhost:8080/api/v1/categories";

export const listCategories = () => axios.get(CATEGORY_API);
export const createCategory = (category) => axios.post(CATEGORY_API, category);
export const deleteCategory = (id) => axios.delete(`${CATEGORY_API}/${id}`);