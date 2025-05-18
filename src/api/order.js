const BASE_URL = 'http://localhost:8081/orders';

export const addToCart = async (userId, bookId, jwtToken) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken,
    },
    body: JSON.stringify({ userId, bookId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Add to cart failed: ${errorText}`);
  }

  const json = await res.json();
  return json;
};

export const updateQuantity = async (cartItemId, newQuantity) => {
  const res = await fetch(`${BASE_URL}/update-quantity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItemId, newQuantity }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Update quantity failed: ${errorText}`);
  }

  const json = await res.json();
  return json;
};

export const placeOrder = async (cartId) => {
  const res = await fetch(`${BASE_URL}/placeOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Place order failed: ${errorText}`);
  }

  const json = await res.json();
  return json;
};
