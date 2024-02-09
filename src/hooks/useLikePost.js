import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  // Gives us the number of likes
  const [likes, setLikes] = useState(post.likes.length)
 // Checks if we liked it or not, checks if the post.likes includes the id of the authenticated user
 const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));

 const showToast = useShowToast();

const handleLikePost = async () => {
    if(isUpdating) return; 
    if(!authUser) return showToast("Error","You must be logged in to like a post","error");
    setIsUpdating(true);

    try {
        const postRef = doc(firestore, "posts", post.id);
        await updateDoc(postRef, {
            // if it is liked already remove the like from the post
            likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
        })
       // whatever the liked state is negate it
        setIsLiked(!isLiked);
        // i.e if it is liked the number of likes will be decremented and if it is not liked, the number of likes will be incremented by 1
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

    } catch (error) {
       showToast("Error",error.message,"error") 
    } finally {
        setIsUpdating(false);
    }
}

return {isLiked,likes,handleLikePost, isUpdating}

}

export default useLikePost