import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";

const SearchByDateRange = () => {
  const [searchData, setSearchData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const maxStartDate = '2020-01-01'; // Date maximale fixée

  const searchCommunicationsByDateRange = () => {
    // Validate start date
    if (new Date(startDate) < new Date(maxStartDate)) {
      setError(`La date de début ne peut pas être antérieure à ${maxStartDate}.`);
      return;
    }

    fetch(`http://127.0.0.1:5000/api/contact/search_communications_by_date_range/?phone_number=${phoneNumber}&start_date=${startDate}&end_date=${endDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setSearchData(data);
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
        setError('Error fetching search data: ' + error.message);
      });
  };

  

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" bg="secondaryGray.400">
      <Text fontSize="xl" mb="4" color="black"> Entrez le numéro de téléphone et sélectionnez une période pour rechercher les communications. La date de début ne peut pas être antérieure au 1er janvier 2020.</Text>
      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          width="20%"
          bg="gray.700"
          color="white"
          fontSize="lg"
          borderColor="gray.600"
          _placeholder={{ color: "white" }}
        />
        <Input
          type="date"
          placeholder="Date de début"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          width="20%"
          bg="gray.700"
          color="white"
          fontSize="lg"
          borderColor="gray.600"
          max={maxStartDate}
          _placeholder={{ color: "white" }}
        />
        <Input
          type="date"
          placeholder="Date de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          width="20%"
          bg="gray.700"
          color="white"
          fontSize="lg"
          borderColor="gray.600"
          _placeholder={{ color: "white" }}
        />
        <Button
          onClick={searchCommunicationsByDateRange}
          colorScheme="teal"
          fontSize="lg"
          px="6"
          py="2"
        >
          Rechercher
        </Button>
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px">
        <Thead>
          <Tr>
            <Th color="Black" fontSize="lg">Correspondant</Th>
            <Th color="Black" fontSize="lg">Durée</Th>
            <Th color="Black" fontSize="lg">Horodatage</Th>
            <Th color="Black" fontSize="lg">IMEI</Th>
            <Th color="Black" fontSize="lg">Nom du site</Th>
            <Th color="Black" fontSize="lg">Localité</Th>
            <Th color="Black" fontSize="lg">IMSI</Th>
            <Th color="Black" fontSize="lg">Type de communication</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchData && searchData.map((comm, index) => (
            <Tr key={index}>
              <Td color="Black" fontSize="lg">{comm.correspondent}</Td>
              <Td color="Black" fontSize="lg">{comm.duration}</Td>
              <Td color="Black" fontSize="lg">{comm.timestamp}</Td>
              <Td color="Black" fontSize="lg">{comm.imei}</Td>
              <Td color="Black" fontSize="lg">{comm.site_name}</Td>
              <Td color="Black" fontSize="lg">{comm.locality}</Td>
              <Td color="Black" fontSize="lg">{comm.imsi}</Td>
              <Td color="Black" fontSize="lg">{comm.communication_type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByDateRange;
