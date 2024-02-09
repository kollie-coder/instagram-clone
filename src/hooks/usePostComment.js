import React, { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const usePostComment = () => {
  const [isCommenting,setIsCommenting] = useState();
  const showToast = useShowToast();

  const authUser = useAuthStore((state) => state.user);

  // to update the user interface
  const addComment = usePostStore((state) => state.addComment)

  // we take the postId we are commenting to and the comment itself
  const handlePostComment = async (postId, comment) => {
    if(isCommenting) return;
    if(!authUser) return showToast("Error", "You must be logged in to comment", "error")
    setIsCommenting(true); 

    const newComment = {
        comment: comment,
        createdAt: Date.now(),
        createdBy: authUser.uid,
        postId: postId,

    }

    try {
        // To update the comment field of the firebase document
        await updateDoc(doc(firestore,"posts",postId), {
            comments: arrayUnion(newComment),
        }) 

        // To update our user interface so that when we comment it will be displayed in the comment section
        addComment(postId, newComment);

    } catch (error) {
        showToast("Error", error.message, "error");
        
    } finally {
        setIsCommenting(false);

    }
  }
  return {isCommenting,handlePostComment};
}

export default usePostComment