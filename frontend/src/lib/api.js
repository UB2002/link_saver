const API = import.meta.env.VITE_API_URL | 'http://localhost:4000/api';

async function request(path, opts = {}) {
  
  try {
    const res = await fetch(`${API}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...opts
    });
    
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`${res.status}: ${errorText}`);
    }
    
    // Handle 204 No Content responses (like DELETE)
    if (res.status === 204) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const signup = (data) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify(data) });

export const login = (data) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(data) });

export const logout = () => 
  request('/auth/logout', { method: 'POST' });

export const getBookmarks = () => 
  request('/bookmarks');

export const addBookmark = (url) =>
  request('/bookmarks', { method: 'POST', body: JSON.stringify({ url }) });

export const deleteBookmark = (id) => {
  console.log(`Deleting bookmark with ID: ${id}`); // Debug log
  return request(`/bookmarks/${id}`, { method: 'DELETE' });
};