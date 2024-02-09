import React from 'react'
import useShowToast from './useShowToast'
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/authStore';

const useLogin = () => {
  const showToast = useShowToast();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login); 

  const login = async(inputs) => {
    //check if the fields are empty
    if(!inputs.email || !inputs.password) {
        return showToast("Error","Please fill all the fields","error")
    }
    try {
        //check email and password are correct
        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
          //if correct fetch the document
        if(userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            // set the localstorage
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
            //log the user in by updating the user interface
            loginUser(docSnap.data())
        }
    } catch (error) {
        showToast("Error",error.message,"error")
    }
  }

  return { loading,error,login };
}

export default useLogin