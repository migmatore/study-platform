import axios, {AxiosInstance} from "axios";
import {camelizeKeys, decamelizeKeys} from "humps";
import {IAuthResp} from "./types/auth.ts";

const baseURL = "http://localhost:8081/api/v1";

export const authApiClient: AxiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-type": "application/json",
	},
});

authApiClient.interceptors.request.use((config) => {
	const newConfig = {...config};

	if (config.params) {
		newConfig.params = decamelizeKeys(config.params);
	}

	if (config.data) {
		newConfig.data = decamelizeKeys(config.data);
	}

	return newConfig;
});

authApiClient.interceptors.response.use((response) => {
	if (response.data && response.headers["content-type"] === "application/json") {
		response.data = camelizeKeys(response.data);
	}

	return response;
});

const apiClient: AxiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const newConfig = {...config};

		const token = localStorage.getItem("token");
		if (token) {
			newConfig.headers.Authorization = `Bearer ${token}`;
		}

		if (config.params) {
			newConfig.params = decamelizeKeys(config.params);
		}

		if (config.data) {
			Object.keys(config.data).map(key => {
				if (config.data[key]) {
					newConfig.data[key] = config.data[key]
				}
			})

			newConfig.data = decamelizeKeys(newConfig.data);
		}

		return newConfig;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response) => {
		if (response.data && response.headers["content-type"] === "application/json") {
			response.data = camelizeKeys(response.data);
			console.log("response interceptor ", response.data)
		}

		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await apiClient.post<IAuthResp>(
					"/auth/refresh",
					{refreshToken},
				);
				const {token} = response.data;

				localStorage.setItem("token", token);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${token}`;
				const resp = axios(originalRequest);
				resp.then(resp => resp.data = camelizeKeys(resp.data));
				console.log("retry response ", resp)
				return resp
			} catch (error) {
				// Handle refresh token error or redirect to login
			}
		}

		return Promise.reject(error);
	},
);

export default apiClient;