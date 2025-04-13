import * as bookData from "../data/book-data";

export async function getBestSellerCategorys() {
  const bestSellerCategorys = await bookData.fetchBestSellerCategorys();
  if (!bestSellerCategorys.results) {
    throw new Error('results not exist');
  }
  return bestSellerCategorys.results;
}

export async function getBooksByCategory(category: string) {
  const categoryInfo = await bookData.fetchCategoryInfo(category);
  if (!categoryInfo.results || !categoryInfo.results.books) {
    throw new Error('results not exist');
  }
  return categoryInfo.results.books;
}
