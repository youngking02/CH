import React, { useState } from 'react';
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import SearchCommunicationsByImsi from './SearchCommunicationsByImsi';
import SearchByIMSI from './SearchByIMSI';
import SearchByDateRange from './SearchByDateRange';
import SearchByIMEI from './SearchByIMEI';

const Trafic = () => {
  const [activeComponent, setActiveComponent] = useState('imsi');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'imsi':
        return <SearchByIMSI />;
      case 'communication':
        return <SearchCommunicationsByImsi />;
      
      case 'dateRange':
        return <SearchByDateRange />;
      case 'imei':
        return <SearchByIMEI />;
      default:
        return null;
    }
  };

  const bgGradient = useColorModeValue(
    'linear(to-r, gray.100, blue.100)'
  );

  return (
    <Box
      pt={{ base: "200px", md: "80px" }}
      w="100%"
      mt="16"
      bgGradient={bgGradient}
      p={8}
      rounded="xl"
      boxShadow="2xl"
    >
      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
      <Menu>
          <MenuButton as={Button}  colorScheme={activeComponent === 'imsi' ? "orange" : "brand"} fontSize="lg" rightIcon={<ChevronDownIcon />} transition="all 0.2s" _hover={{ transform: 'scale(1.05)' }}>
            Traffic via IMSI
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setActiveComponent('imsi')}>Recherche Numéro</MenuItem>
            <MenuItem onClick={() => setActiveComponent('communication')}>Recherche traffic</MenuItem>
          </MenuList>
        </Menu>
        
        <Button
          onClick={() => setActiveComponent('dateRange')}
          colorScheme={activeComponent === 'dateRange' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.05)' }}
        >
          Traffic via Numéro
        </Button>
        <Button
          onClick={() => setActiveComponent('imei')}
          colorScheme={activeComponent === 'imei' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.05)' }}
        >
          Traffic via IMEI
        </Button>
      </Flex>
      {renderComponent()}
    </Box>
  );
};

export default Trafic;
