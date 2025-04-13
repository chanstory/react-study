import { API_URL } from "../constants";

export async function fetchBestSellerCategorys() {
  return (await fetch(`${API_URL}/lists`)).json();
}

export async function fetchCategoryInfo(category: string) {
  return (await fetch(`${API_URL}/list?name=${category}`)).json();
}
