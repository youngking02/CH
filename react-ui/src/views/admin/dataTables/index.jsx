import React, { useState } from 'react';
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import SearchByName from './SearchByName';
import SearchByPhoneNumber from './SearchByPhoneNumber';

const MainComponent = () => {
  const [activeComponent, setActiveComponent] = useState('name');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'name':
        return <SearchByName />;
      case 'number':
        return <SearchByPhoneNumber />;
     /* case 'imsi':
        return <SearchByIMSI />;
      case 'dateRange':
        return <SearchByDateRange />;
      case 'imei':
        return <SearchByIMEI />;*/
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
          <MenuButton as={Button}  colorScheme={activeComponent === 'name' ? "orange" : "brand"} fontSize="lg" rightIcon={<ChevronDownIcon />} transition="all 0.2s" _hover={{ transform: 'scale(1.05)' }}>
            Identité
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setActiveComponent('name')}>Recherche par Nom</MenuItem>
            <MenuItem onClick={() => setActiveComponent('number')}>Recherche par Numero</MenuItem>
          </MenuList>
        </Menu>
        {/*<Button
          onClick={() => setActiveComponent('imsi')}
          colorScheme={activeComponent === 'imsi' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.05)' }}
        >
          Traffic via IMSI
        </Button>
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
        </Button>*/}
      </Flex>
      {renderComponent()}
    </Box>
  );
};

export default MainComponent;
