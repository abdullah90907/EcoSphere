import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL.replace(/\/$/, '')}/api`;

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('eco_token', data.token);
    localStorage.setItem('eco_user', JSON.stringify(data.user));
    return data;
  },

  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }
    const data = await response.json();
    localStorage.setItem('eco_token', data.token);
    localStorage.setItem('eco_user', JSON.stringify(data.user));
    return data;
  },

  logout() {
    localStorage.removeItem('eco_token');
    localStorage.removeItem('eco_user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('eco_user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('eco_token');
  },

  async updateProfile(name: string, profile_image: string) {
    const token = this.getToken();
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, profile_image }),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    
    // Update local user data
    const user = this.getCurrentUser();
    if (user) {
      const updatedUser = { ...user, name, profile_image };
      localStorage.setItem('eco_user', JSON.stringify(updatedUser));
    }
    return response.json();
  },

  async changePassword(oldPassword: string, newPassword: string) {
    const token = this.getToken();
    const response = await fetch(`${API_URL}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to change password');
    }
    return response.json();
  },

  async getUserStats() {
    const token = this.getToken();
    const response = await fetch(`${API_URL}/user/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }
};
