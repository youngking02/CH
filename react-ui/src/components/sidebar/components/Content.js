// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";
import illustration from "assets/img/auth/auth.png";


// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        ps='10px'
        pe={{ md: "20px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'>
           <img src={illustration} alt="Sidebar Bottom Image" style={{ width: '100%', borderRadius: '15px' }} />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
