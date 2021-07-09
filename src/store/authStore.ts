import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

const TOKEN = "myToken";
const REFRESH_TOKEN = "myRefreshToken";

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

interface IDecodedRefreshToken {
  id: number;
  exp: number;
}

interface IDecodedToken extends IDecodedRefreshToken {
  username: string;
  role: string;
}

class AuthStore {
  user: IDecodedToken | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = ({ token, refreshToken }: ITokenResponse) => {
    this.setTokens(token, refreshToken);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  // User tokens
  setTokens = (token: string, refreshToken: string) => {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  getToken = () => {
    return localStorage.getItem(TOKEN);
  };

  getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
  };

  removeTokens = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };

  refreshToken = async () => {
    try {
      const refreshToken = this.getRefreshToken();
      const response = await instance.post("/refresh", refreshToken);
      this.setTokens(response.data.token, response.data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  signup = async (userData: { [x: string]: string | Blob }) => {
    try {
      const formData = new FormData();
      for (const key in userData) formData.append(key, userData[key]);
      const response = await instance.post("/register", formData);
      this.setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  signin = async (userData: any) => {
    try {
      const response = await instance.post("/login", userData);
      this.setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  signout = () => {
    this.user = null;
    this.removeTokens();
    delete instance.defaults.headers.common.Authorization;
  };

  checkForToken = () => {
    const token = this.getToken();
    if (token) {
      const currentTime = Date.now();
      const decodedToken: IDecodedToken = decode(token);
      if (decodedToken.exp < currentTime) {
        this.checkForRefreshToken();
      }
    }
  };

  checkForRefreshToken = () => {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      const currentTime = Date.now();
      const decodedRefreshToken: IDecodedRefreshToken = decode(refreshToken);
      if (decodedRefreshToken.exp > currentTime) {
        this.refreshToken();
        return;
      }
    }
    this.signout();
  };
}

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
