import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const SearchByName = () => {
  const [searchData, setSearchData] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const searchContactsByNames = (names) => {
    const query = names.map(name => `name=${encodeURIComponent(name.trim())}`).join('&');
    fetch(`http://127.0.0.1:5000/api/contact/search_by_name/?${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setSearchData(data);
        if (data.length === 0) {
          setError('No contacts found matching the criteria.');
        } else {
          setError('');
        }
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
        setError('Error fetching search data: ' + error.message);
      });
  };

  const handleSearch = () => {
    const names = name.split(',').map(name => name.trim()).filter(name => name.length > 0);
    if (names.length > 0) {
      searchContactsByNames(names);
    } else {
      setError('Please enter at least one name.');
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    searchData.forEach((data, index) => {
      doc.text(`Result ${index + 1}`, 10, y);
      Object.keys(data).forEach((key) => {
        y += 10;
        doc.text(`${key}: ${data[key]}`, 10, y);
      });
      y += 10;
    });
    doc.save('search_results.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, 'search_results.xlsx');
  };

  const inputBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="white" rounded="xl" boxShadow="lg" p={8}>
      <Text fontSize="2xl" mb="6" color="black">Recherche en fonction du nom et prénom</Text>
      <Flex mb="50px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Entrez le Nom et Prénom (Ex. John Doe, Jane Smith)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          width="30%"
          bg={inputBg}
          color="black"
          fontSize="lg"
          borderColor="gray.300"
          _placeholder={{ color: "gray.500" }}
        />
        <Button
          onClick={handleSearch}
          colorScheme="blue"
          fontSize="lg"
          px="6"
          py="2"
          rounded="full"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
        >
          Search
        </Button>

        <Flex>
          <IconButton
            icon={<FaFilePdf />}
            onClick={handleExportPDF}
            colorScheme="red"
            fontSize="lg"
            rounded="full"
            ml="2"
            aria-label="Export PDF"
          />
          <IconButton
            icon={<FaFileExcel />}
            onClick={handleExportExcel}
            colorScheme="green"
            fontSize="lg"
            rounded="full"
            ml="2"
            aria-label="Export Excel"
          />
        </Flex>
      </Flex>

      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th fontSize="xl">First Name</Th>
            <Th fontSize="xl">Last Name</Th>
            <Th fontSize="xl">Birth Date</Th>
            <Th fontSize="xl">Phone Numbers</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchData.map((contact, index) => (
            <Tr key={index}>
              <Td fontSize="xl">{contact.first_name}</Td>
              <Td fontSize="xl">{contact.last_name}</Td>
              <Td fontSize="xl">{contact.birth_date}</Td>
              <Td fontSize="xl">{contact.phone_numbers ? contact.phone_numbers.join(', ') : 'N/A'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByName;
