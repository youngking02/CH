import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton } from "@chakra-ui/react";
import {  FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const SearchByNumber = () => {
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const searchContactsByNumber = (query) => {
    fetch(`http://127.0.0.1:5000/api/contact/search_by_phone_number/?phone_number=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
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
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchContactsByNumber(query);
    } else {
      setError('Please enter a search query.');
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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="white" rounded="xl" boxShadow="lg" p={8}>

      <Box pl="4" pr="10"> 
        <Text fontSize="2xl" mb="6" color="black" >Recherche via le numéro de téléphone pour sortir l'identité</Text>
        <Flex mb="50px" wrap="wrap" justifyContent="space-between" alignItems="center">
          <Input
            placeholder="Search by number (e.g. 1234567890)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            width="30%"
            bg="gray.100"
            color="black"
            fontSize="lg"
            borderColor="gray.300"
            _placeholder={{ color: "gray.500" }}
            mr="2"
            rounded="md"
            transition="all 0.3s"
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 5px blue.500" }}
          />
          <Button
            onClick={handleSearch}
            colorScheme="blue"
            fontSize="lg"
            px="6"
            py="2"
            
            rounded="full"
            transition="all 0.3s"
            _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
          >
            Search
          </Button>
          <Flex>
            <IconButton
              onClick={handleExportPDF}
              colorScheme="red"
              icon={<FaFilePdf />}
              fontSize="lg"
              rounded="full"
              transition="all 0.3s"
              _hover={{ bg: "red.600", transform: "scale(1.05)" }}
              aria-label="Export as PDF"
              ml="2"
            />
            <IconButton
              onClick={handleExportExcel}
              colorScheme="green"
              icon={<FaFileExcel />}
              fontSize="lg"
              rounded="full"
              transition="all 0.3s"
              _hover={{ bg: "green.600", transform: "scale(1.05)" }}
              aria-label="Export as Excel"
              ml="2"
            />
          </Flex>
        </Flex>
      </Box>

      {error && <Text color="red.500" fontWeight="bold">{error}</Text>}
      <Table mt="20px" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th  fontSize="lg" fontWeight="bold">First Name</Th>
            <Th  fontSize="lg" fontWeight="bold">Last Name</Th>
            <Th fontSize="lg" fontWeight="bold">Phone Number</Th>
            <Th  fontSize="lg" fontWeight="bold">Birth Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(searchData) && searchData.map((contact, index) => (
            <Tr key={index}>
              <Td  fontSize="lg">{contact.first_name}</Td>
              <Td  fontSize="lg">{contact.last_name}</Td>
              <Td  fontSize="lg">{query}</Td>
              <Td  fontSize="lg">{contact.birth_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByNumber;
