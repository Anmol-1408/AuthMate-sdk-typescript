import authenticate from "./api/authenticate";
import { AuthmateInterface } from "./interface";

export class authmate {
  constructor() {
    console.log("Authmate SDK initialized");
  }

  authenticate() {
    console.log("User authenticated");
  }

  loginUser = async (email:string , password:string) =>{
    console.log("Logging in user with email:", email);
    try {
        authenticate.loginUser(email, password);
        console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in user:", error);
        
    }
  }
}