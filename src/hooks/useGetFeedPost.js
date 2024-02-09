import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
 const {posts, setPosts} = usePostStore();
 const authUser = useAuthStore((state) => state.user);
 const showToast = useShowToast();
 const {setUserProfile} = useUserProfileStore();

 useEffect(() => {
    const getFeedPosts = async () => {
        setIsLoading(true);
        if(authUser.following.length === 0) {
           setIsLoading(false)
           setPosts([])
           return
        }
        //  this query gives us the post of the user that we follow
        const q = query(collection(firestore,"posts"),where("createdBy","in",authUser.following))
        try {
            const querySnapshot = await getDocs(q)
            const feedPosts = [];
           // return an object
            querySnapshot.forEach(doc => {
                // then push the object with the id of the document and spread all of the values 
                feedPosts.push({id:doc.id,...doc.data()})
            })

            feedPosts.sort((a,b) => b.createdAt - a.createdAt)
            setPosts(feedPosts)

        } catch (error) {
            showToast("Error",error.message,"error")
        } finally {
            setIsLoading(false); 
        }
    };

    if(authUser) getFeedPosts();
 }, [authUser,showToast,setPosts,setUserProfile])

 return {isLoading, posts}
}

export default useGetFeedPost