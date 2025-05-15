// const BASE_URL = 'http://localhost:8000/api';

// export const login = async (email, password) => {
//   const res = await fetch(`${BASE_URL}/v1/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) {
//     throw new Error('Login failed');
//   }
//   return res.json();
// };

// export const signup = async (first_name, last_name, email, password) => {
//   const res = await fetch(`${BASE_URL}/v1/auth/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ first_name, last_name, email, password }),
//   });
//   if (!res.ok) {
//     throw new Error('Signup failed');
//   }
//   return res.json();
// };
// Toggle this to true to use mock data instead of real API calls
const USE_MOCK = false;

const BASE_URL = 'http://localhost:8081';

export const login = async (email, password) => {
  if (USE_MOCK) {
    console.log("🧪 Using mock login");
    return Promise.resolve({
      token: 'mock-token-123',
      user: {
        email,
        first_name: 'Mock',
        last_name: 'User'
      }
    });
  }


const res = await fetch(`${BASE_URL}/user/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const token = await res.text();  // backend sends plain token string
  console.log('Received token:', token);

localStorage.setItem('token', token);
console.log('Token saved in localStorage:', localStorage.getItem('token'));// ✅ save to localStorage

  return token;
};

export const signup = async (first_name, last_name, email, password) => {
  if (USE_MOCK) {
    console.log("🧪 Using mock signup");
    return Promise.resolve({
      token: 'mock-token-123',
      user: {
        first_name,
        last_name,
        email
      }
    });
  }

  const res = await fetch(`${BASE_URL}/user/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name, last_name, email, password }),
  });

  if (!res.ok) {
    throw new Error('Signup failed');
  }

  return res.json();
};
