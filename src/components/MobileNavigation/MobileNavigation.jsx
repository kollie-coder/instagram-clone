import React from 'react'
import HomeMobile from './HomeMobile'
import SearchMobile from './SearchMobile'
import NotificationMobile from './NotificationMobile'
import CreatePostMobile from './CreatePostMobile'
import ProfileLinkMobile from './ProfileLinkMobile'
import { Flex } from '@chakra-ui/react'

const MobileNavigation = () => {
  return (
    <>
    <Flex justifyContent={"space-between"} px={4} borderY={"1px solid"} borderColor={"whiteAlpha.300"}>
        <HomeMobile/>
        <SearchMobile/>
        <NotificationMobile/>
        <CreatePostMobile/>
        <ProfileLinkMobile/>
    </Flex>
   
    </>
  )
}

export default MobileNavigation