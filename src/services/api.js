export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(query) {
  let response;
  if (query.includes('MLB')) {
    response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${query}`);
  } else {
    response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  }
  const data = await response.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

export async function getCategorieId(categoryId) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const data = await response.json();
  return data;
}
