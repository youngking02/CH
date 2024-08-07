import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import pdf from "assets/img/avatars/pdf.svg";
import excel from "assets/img/avatars/excel.svg";

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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="secondaryGray.400" rounded="xl">
      <Box pl="4" pr="10">
        <Text fontSize="2xl" mb="6" color="black">Recherche en fonction du nom et prénom</Text>
        <Flex mb="50px" wrap="wrap" justifyContent="space-between" alignItems="center">
          <Input
            placeholder="Search by name (e.g. John Doe, Jane Smith)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            width="30%"
            bg="gray.700"
            color="white"
            fontSize="lg"
            borderColor="gray.600"
            _placeholder={{ color: "white" }}
          />
          <Button
            onClick={handleSearch}
            colorScheme="orange"
            fontSize="lg"
            px="6"
            py="2"
            rounded="full"
          >
            Search
          </Button>


          <Flex >
          <Button
            onClick={handleExportPDF}
            colorScheme="red"
            fontSize="lg"
            px="6"
            py="2"
            rounded="full"
            ml="2"
            bgImage={pdf}
            bgSize='cover'
            py={{ base: "30px", md: "20px" }}
            px={{ base: "30px", md: "24px" }}
          >

          </Button>
          <Button
            onClick={handleExportExcel}
            colorScheme="green"
            fontSize="lg"
            px="6"
            py="2"
            rounded="full"
            ml="2"
            bgImage={excel}
            bgSize='cover'
            py={{ base: "30px", md: "20px" }}
            px={{ base: "30px", md: "24px" }}

            
          >
           
          </Button>
        </Flex>
        </Flex>
       
      </Box>
      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px">
        <Thead>
          <Tr>
            <Th color="Black" fontSize="lg">First Name</Th>
            <Th color="Black" fontSize="lg">Last Name</Th>
            <Th color="Black" fontSize="lg">Number</Th>
            <Th color="Black" fontSize="lg">Birth Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(searchData) && searchData.map((contact, index) => (
            <Tr key={index}>
              <Td color="Black" fontSize="lg">{contact.first_name}</Td>
              <Td color="Black" fontSize="lg">{contact.last_name}</Td>
              <Td color="Black" fontSize="lg">{contact.phone_number}</Td>
              <Td color="Black" fontSize="lg">{contact.birth_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByName;
