import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.50:3000/api';// <--- mi IP real 

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      await AsyncStorage.setItem('userToken', data.token);
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Error de credenciales' };
    }
  } catch (error) {
    return { success: false, message: 'Error de red' };
  }
};