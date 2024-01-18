import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const PostHeader = ({username, avatar}) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>

        {/* Left side */}

        <Flex alignItems={"center"} gap={2}>
            <Avatar src={avatar} alt={username} size={"sm"}/>
           
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
             
              {username}  
              <Box color={"gray.500"}> • 1w ago </Box>

            </Flex>

        </Flex>

       {/* Right side */}
        <Box cursor={"pointer"}> 

          <Text fontSize={12}
           color={"blue.500"} 
           fontWeight={"bold"}
           _hover={{ color:"white"}}
           transition={"0.2s ease-in-out"}
           >
            
            Unfollow
            </Text> 
        </Box>

    </Flex>
  )
}
