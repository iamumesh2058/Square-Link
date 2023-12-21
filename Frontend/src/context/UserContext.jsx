import { createContext } from "react";

export const UserContext = createContext({
    user: {},
    logoutUser: () => {}
});


export const UserProvider = ({ children }) => {
    const user = {
        name: "Umesh"
    }
    const logoutUser = async () => {
        console.log("Logout User");
    }
    const value = {user, logoutUser};
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}