import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useFollowUser = (userId) => {
 const [isUpdating, setIsUpdating] = useState(false);
 const [isFollowing,setIsFollowing] = useState(false);

 // Get the authenticated user
 const authUser = useAuthStore((state) => state.user);
 const setAuthUser = useAuthStore((state) => state.setUser);
 const {userProfile,setUserProfile} = useUserProfileStore();

 const showToast = useShowToast();


 const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
        const currentUserRef = doc(firestore, "users", authUser.uid);
        const userToFollowOrUnfollowRef = doc(firestore, "users", userId);
      
        // for the firestore database
        await updateDoc(currentUserRef,{
            // check if the current if following the user, if he following, remove the user, else add the user
            following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
        })

        await updateDoc(userToFollowOrUnfollowRef, {
            followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
        })

        if (isFollowing) {
            //unfollow
            setAuthUser({
                ...authUser,
                // check if for each id it is not equal to the user id from the following array of the authenticated user
                following: authUser.following.filter((uid) => uid !== userId),
            });
            if (userProfile)
            setUserProfile({
                ...userProfile,
                // when the unfollow process occurs go to the followers section of the user that has beeen unfollowed and extract the user Id of the authenticated user,i.e the authenticated user no more follows the user
                followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
            })

            //update the localstorage
            localStorage.setItem("user-info", JSON.stringify({
                ...authUser,
                following: authUser.following.filter((uid) => uid !== userId),
            }))
            setIsFollowing(false)
        } else { 
            //follow
            setAuthUser({
                ...authUser,
                following: [...authUser.following, userId],
            });

            if (userProfile)
            setUserProfile({
                ...userProfile,
               // In the followers array you add the Id of the authenticated user
               followers: [...userProfile.followers, authUser.uid],
            });
            // update the localstorage
            localStorage.setItem("user-info", JSON.stringify({
                ...authUser,
                following: [...authUser.following, userId],

            }))

            setIsFollowing(true)
        }

    } catch (error) {
       showToast("Error",error.message,"error") 
    } finally{
        setIsUpdating(false);
    }
 }
 useEffect(() => {
    if (authUser) {
        // To search if we are already following a user by using it user Id to check if the current user following array includes that user Id
        const isFollowing = authUser.following.includes(userId);
			setIsFollowing(isFollowing);
		}
	}, [authUser, userId]);

	return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser