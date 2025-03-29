export interface AuthmateInterface {
    authenticate: () => void;
    loginUser: (email: string, password: string) => Promise<void>;
}