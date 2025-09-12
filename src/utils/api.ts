import axios from "axios";

const Token = localStorage.getItem("token");

const api = "https://secure-backend-bx4z.onrender.com/";

const createAxiosInstance = (token: string | null) => {
    return axios.create({
        baseURL: api,
        headers: {
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}`, "x-token": token }),
        },
    });
};

export const instance = createAxiosInstance(Token);

export const updateToken = (newToken: string) => {
    instance.defaults.headers["Authorization"] = `Bearer ${newToken.trim()}`;
    instance.defaults.headers["x-token"] = newToken;
};

export default instance;
