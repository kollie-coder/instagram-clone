import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useSuggestedUser = () => {
   const [isLoading, setIsLoading] = useState(true)
   const [suggestedUsers, setSuggestedUsers] = useState([])
   const authUser = useAuthStore(state => state.user)
   const showToast = useShowToast()

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true)
         try {
            const usersRef = collection(firestore,"users")
            // we create our query, it takes a where clause, where the uid of the users to be fetched shouldn't include the authUser.uid, because the authenticated user is not meant to be suggested and also users that we already follow
           const q = query(
            usersRef,
            where("uid","not-in", [authUser.uid, ...authUser.following]),
            orderBy("uid"),
            limit(3)
           )

           const querySnapshot = await getDocs(q)
           const users = [];
           querySnapshot.forEach(doc => {
            // For each doc, if you're pushing into an array, you create an object with spreading the doc.id, get the doc as well as the id
            users.push({...doc.data(), id: doc.id})

           })

           setSuggestedUsers(users )
        } catch (error) {
            showToast("Error",error.message,"error")
         } finally {
            setIsLoading(false )
         }
        } 
        
        if(authUser) getSuggestedUsers()
    },[authUser,showToast])

    return { isLoading, suggestedUsers }

}

export default useSuggestedUser