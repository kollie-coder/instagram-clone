import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { firestore, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useUserProfileStore from '../store/userProfileStore';

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  // Also lets update the authenticated user state
  const setAuthUser = useAuthStore((state) => state.setUser);

  // Get the authenticated user
  const authUser = useAuthStore((state) => state.user);

  //Also would like to update the user profile
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async(inputs,selectedFile) => {
      if(isUpdating || !authUser) return
      setIsUpdating(true);

      // put the image into the profilePic folder and name the picture by the user-id
      const storageRef = ref(storage,`profilePics/${authUser.uid}`)
      
      //To get user doc ref for each user from the database
      const userDocRef = doc(firestore, "users", authUser.uid)

      // let URL be an empty string initially
      let URL = ""
      try {
        if(selectedFile) {
          // check if user updates their profile picture, then upload it into the clould 
          await uploadString(storageRef,selectedFile,"data_url")
          // once the picture has been uploaded, you then get the URL of the image
          URL = await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
        }

        const updatedUser = {
          // so as not override the other data like followers, following and so on you do this.  
          ...authUser,
          fullName: inputs.fullName || authUser.fullName,
          username: inputs.username || authUser.username,
          bio: inputs.bio || authUser.bio,
          profilePicURL: URL || authUser.profilePicURL,
        }

        await updateDoc(userDocRef, updatedUser)
        
        // Update the localstorage with the new updated user detail
        localStorage.setItem("user-info",JSON.stringify(updatedUser));

        // Also lets update the authenticated user state
        setAuthUser(updatedUser)

        //Also would like to update the user profile
        setUserProfile(updatedUser)

        showToast("Success","Profile updated successfully","success")

        
      } catch (error) {
        showToast("Error",error.message,"error")
      }
  };

return {editProfile, isUpdating}


}

export default useEditProfile