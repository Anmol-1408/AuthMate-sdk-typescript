import axios from "axios";
import config from "../config";

export default {
    authenticate: () => {
        console.log("User authenticated");
    },
    loginUser: async (email: string, password: string) => {
        axios.post(`${config.AUTHMATE_BASE_API_URL}/login`), {
            email: email,
            password: password,
        }; 
        console.log("User logged in");
    },
    // logoutUser: async () => {
    //     console.log("User logged out");
    // },
    // registerUser: async (email: string, password: string) => {
    //     console.log("User registered");
    // },
    // resetPassword: async (email: string) => {
    //     console.log("Password reset link sent");
    // },
}
