import axios from "axios";
import { BASE_URL_LOGIN, header } from "./consts";





// تابع برای ثبت‌نام کاربر
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL_LOGIN}/api/users/register`, userData, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.log(error);

    }
  };
  
  // تابع برای لاگین کاربر
  export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL_LOGIN}/api/users/login`, userData, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export async function isLogin(token) {
    const res = await axios.get(`${BASE_URL_LOGIN}/api/users/me`, {
      headers: {
        ...header,
        Authorization:
          `Bearer ${token}` ,
      },
    });
    return res.status;
  }

