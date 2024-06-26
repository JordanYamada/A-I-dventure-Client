import axios, { AxiosResponse } from "axios";


// Define the shape of the response data
interface UserData {
    client: string;
    token: string;
}

// Define the shape of the user object
export interface User {
    client: string;
    // email: string;
}



// Create an instance of axios
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_SERVER}/api/v1/`,
})

// Define the type of the parameters and return value for userLogin function
export const userLogin = async(email: string, password: string): Promise<{ client: string } | void> => {
    try {
        const response: AxiosResponse<UserData> = await api.post("users/login/", { email, password});
        if (response.status === 200) {
            const { client, token } = response.data;
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            return { client }
        } else {
            console.error('login error', response)
        }
    } catch (error) {
        console.error('login error', error);
    }
}

// Define the return type for userLogout function
export const userLogout = async(): Promise<boolean> => { 
    try {
        const response: AxiosResponse<void> = await api.post("users/logout/")
        if (response.status === 204) {
            delete api.defaults.headers.common["Authorization"]
            localStorage.removeItem("token")
            console.log('user logged out');
            return true;
        } else {
            console.error('error logging user out ', response)
            return false;
        }
    } catch (error) {
        console.error('error logging user out ', error)
        return false;
    }
}

// Define the return type for userConfirmation function
export const userConfirmation = async(): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if(token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        try {
            const response: AxiosResponse<User> = await api.get("users/info/")
            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            } else {
                console.error('error userConfirmation', response)
                return null;
            }
        } catch (error) {
            console.error('error userConfirmation', error);
            return null;
        }
    } else {
        console.log('userConfirmation no token in localStorage');
        return null;
    }
}
