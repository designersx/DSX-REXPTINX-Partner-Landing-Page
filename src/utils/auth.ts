// utils/auth.ts
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  exp: number; // Expiration time in seconds since epoch
  [key: string]: any;
}

export function isTokenValid(): boolean {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}

export function getUserId(): string | null {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    // Adjust 'userId' to match the actual claim name in your JWT (e.g., 'sub' or 'id')
    if (!decoded.user.id) {
      console.error('User ID not found in token');
      return null;
    }
    return decoded.user.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}