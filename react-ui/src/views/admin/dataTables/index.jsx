import React, { useState } from 'react';
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import SearchByName from './SearchByName';
import SearchByPhoneNumber from './SearchByPhoneNumber';
import SearchByIMSI from './SearchByIMSI';
import SearchByDateRange from './SearchByDateRange';
import SearchByIMEI from './SearchByIMEI';

const MainComponent = () => {
  const [activeComponent, setActiveComponent] = useState('name');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'name':
        return <SearchByName />;
      case 'number':
        return <SearchByPhoneNumber />;
      case 'imsi':
        return <SearchByIMSI />;
      case 'dateRange':
        return <SearchByDateRange />;
      case 'imei':
        return <SearchByIMEI />;
      default:
        return null;
    }
  };

  return (
    <Box pt={{ base: "200px", md: "80px" }} w="100%" mt="16">
      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Menu>
          <MenuButton as={Button} colorScheme="blue" fontSize="lg" rightIcon={<ChevronDownIcon />} ml="2">
            Identité
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setActiveComponent('name')}>Search by Name</MenuItem>
            <MenuItem onClick={() => setActiveComponent('number')}>Search by Number</MenuItem>
          </MenuList>
        </Menu>
        <Button
          onClick={() => setActiveComponent('imsi')}
          colorScheme={activeComponent === 'imsi' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
        >
          Search by IMSI
        </Button>
        <Button
          onClick={() => setActiveComponent('dateRange')}
          colorScheme={activeComponent === 'dateRange' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
        >
          Search by Date Range
        </Button>
        <Button
          onClick={() => setActiveComponent('imei')}
          colorScheme={activeComponent === 'imei' ? "orange" : "brand"}
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
        >
          Search by IMEI
        </Button>
      </Flex>
      {renderComponent()}
    </Box>
  );
};

export default MainComponent;
