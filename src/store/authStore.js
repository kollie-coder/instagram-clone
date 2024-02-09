import {create} from "zustand";

const useAuthStore = create((set) => ({
    //from the localstorage get the user-info, if there is non it will be null
    user: JSON.parse(localStorage.getItem("user-info")),
    //take the user and set and update the user
    login:(user) => set({user}),
    //logout function which takes the user and sets it to null
    logout:() => set({user:null}),
    //calling the header function and updating the user function
    setUser: (user) => set({user}),

}))

export default useAuthStore;