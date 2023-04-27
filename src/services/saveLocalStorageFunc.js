export const saveLocalstorage = (product) => {
  localStorage.setItem('cartProducts', JSON.stringify(product));
};

export const getProductLocalstorage = () => {
  const products = JSON.parse(localStorage.getItem('cartProducts'));
  return products;
};

export const localStorageFunc = (product) => {
  const products = getProductLocalstorage();
  if (products) {
    saveLocalstorage([...products, product]);
  } else {
    saveLocalstorage([product]);
  }
};
