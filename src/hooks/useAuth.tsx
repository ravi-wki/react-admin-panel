import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
}
