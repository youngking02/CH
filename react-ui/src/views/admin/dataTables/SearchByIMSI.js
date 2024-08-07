import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";

const SearchByIMSI = () => {
  const [searchData, setSearchData] = useState([]);
  const [imsi, setImsi] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const searchByIMSI = () => {
    if (imsi.trim() && startDate.trim() && endDate.trim()) {
      fetch(`http://127.0.0.1:5000/api/contact/search_by_imsi/?imsi=${encodeURIComponent(imsi)}&start_date=${startDate}&end_date=${endDate}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setSearchData([]);
          } else {
            setSearchData(data);
            setError('');
          }
        })
        .catch(error => {
          console.error('Error fetching search data:', error);
          setError('Error fetching search data: ' + error.message);
        });
    } else {
      setError('Please enter IMSI, start date, and end date.');
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="secondaryGray.400" rounded="xl">
      <Box pl="4" pr="10">
        <Text fontSize="2xl" mb="6" color="black">Recherche via IMSI pour les numéros de téléphone et les dates d'utilisation</Text>

        <Flex mb="50px" wrap="wrap" justifyContent="space-between" alignItems="center">
          <Input
            placeholder="IMSI"
            value={imsi}
            onChange={(e) => setImsi(e.target.value)}
            width="20%"
            bg="gray.700"
            color="white"
            fontSize="lg"
            borderColor="gray.600"
            _placeholder={{ color: "white" }}
            mr="2"
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            width="20%"
            bg="gray.700"
            color="white"
            fontSize="lg"
            borderColor="gray.600"
            _placeholder={{ color: "white" }}
            mr="2"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            width="20%"
            bg="gray.700"
            color="white"
            fontSize="lg"
            borderColor="gray.600"
            _placeholder={{ color: "white" }}
            mr="2"
          />
          <Button onClick={searchByIMSI} colorScheme="orange" fontSize="lg" px="6" py="2">
            Search
          </Button>
        </Flex>
      </Box>

      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px">
        <Thead>
          <Tr>
            <Th color="Black" fontSize="lg">Phone Number</Th>
            <Th color="Black" fontSize="lg">Start Date</Th>
            <Th color="Black" fontSize="lg">End Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(searchData) && searchData.map((item, index) => (
            <Tr key={index}>
              <Td color="Black" fontSize="lg">{item.phone_number}</Td>
              <Td color="Black" fontSize="lg">{item.start_date}</Td>
              <Td color="Black" fontSize="lg">{item.end_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByIMSI;
