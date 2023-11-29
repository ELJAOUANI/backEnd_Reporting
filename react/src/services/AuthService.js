import axiosClient from "../api/axios";


    const login = async(email, password)=> {
    try {
      const response = await axiosClient.post('auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data; // Assuming the server sends error details in the response
    }
  }

export const AuthService = {
    login
}