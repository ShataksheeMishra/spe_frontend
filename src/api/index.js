const USE_MOCK = false;  // set this to false when backend is ready

const BASE_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  if (USE_MOCK) {
    return {
      token: "mock-token-123",
      user: {
        userId: "mock-user-id",
        email,
        first_name: "Mock",
        last_name: "User"
      }
    };
  }

  const res = await fetch(`${BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const signup = async (first_name, last_name, email, password) => {
  if (USE_MOCK) {
    return {
      token: "mock-token-123",
      user: {
        userId: "mock-user-id",
        email,
        first_name,
        last_name
      }
    };
  }

  const res = await fetch(`${BASE_URL}/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name, last_name, email, password })
  });

  if (!res.ok) {
    alert("Signup failed");
    throw new Error("Signup failed");
  }

  return res.json();
};
