import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

class AuthStore {
  user = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }
  setUser = (token: string) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  signup = async (userData: { [x: string]: string | Blob }) => {
    try {
      const formData = new FormData();
      for (const key in userData) formData.append(key, userData[key]);
      const response = await instance.post("/register", formData);
      this.setUser(response.data.token);
    } catch (error) {
      throw new Error(" Invalid request");
    }
  };

  signin = async (userData: any) => {
    try {
      const response = await instance.post("/login", userData);
      this.setUser(response.data.token);
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  signout = () => {
    this.user = null;
    this.loading = true;
    localStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
  };
  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user: any = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
