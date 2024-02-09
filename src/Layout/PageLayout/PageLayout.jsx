import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navbar from '../../components/Navbar/Navbar'

//instead of adding the sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebaron every page except the AuthPage.

const PageLayout = ({children}) => {

    const {pathname} = useLocation();

     //To retrieve and monitor authentication state from firebase
     const [user, loading, error] = useAuthState(auth );
   
     //if we are not in the authentication page and also if user is authenticated then show the sidebar
    const canRenderSidebar = pathname !=='/auth' && user

    //Render the navbar only if there is no user, it is not loading, and pathname is not the authention page
       const canRenderNavbar = !user && !loading && pathname !== "/auth";

       //Show loading spinner to check if user is authenticated or while loading a page
       const checkUserIsAuth = !user && loading 
       if(checkUserIsAuth) return <PageLayoutSpinner />
   
  return (

 <Flex flexDir={canRenderNavbar ? "column" : "row"}>
    {/* sidebar on the left */}
     
    {canRenderSidebar ? (
    <Box w={{base:"70px", md:"240px"}}>
       <Sidebar/>
   </Box> 
    ) : null}

    {/* Navbar */}

    {canRenderNavbar ? <Navbar/> : null}

    {/* the page content on the right. Note: you could remove the 'w' property because it has the flex:1 property which makes it take the remaining space of the page*/}
  
   
    <Box flex={1} w={{base:"calc(100% - 70px)", md:"calc(100% - 240px)"}} mx={"auto"}>
       {children}
    </Box>
 </Flex>
  )
}

export default PageLayout


const PageLayoutSpinner = () => {
   return (
      <Flex flexDir="column" h="100vh" alignItems="center" 
      justifyContent="center">
         <Spinner size="xl" />
      </Flex>
   )
}