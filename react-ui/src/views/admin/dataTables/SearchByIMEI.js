import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SearchByIMEI = () => {
  const [searchDataIMEI, setSearchDataIMEI] = useState([]);
  const [imeiNumber, setIMEINumber] = useState('');
  const [error, setError] = useState('');

  const searchContactsByIMEI = () => {
    fetch(`http://127.0.0.1:5000/api/contact/search_by_imei/?imei=${imeiNumber}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setSearchDataIMEI(data);
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
        setError('Error fetching search data: ' + error.message);
      });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Phone Number', 'Start Date', 'End Date']],
      body: searchDataIMEI.map(row => [row.phone_number, row.start_date, row.end_date])
    });
    doc.save('IMEI_Report.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchDataIMEI);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IMEI Report");
    XLSX.writeFile(workbook, "IMEI_Report.xlsx");
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" bg="secondaryGray.400">
      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Search by IMEI"
          value={imeiNumber}
          onChange={(e) => setIMEINumber(e.target.value)}
          width="30%"
          bg="gray.700"
          color="white"
          fontSize="lg"
          borderColor="gray.600"
          _placeholder={{ color: "white" }}
        />
        <Button
          onClick={searchContactsByIMEI}
          colorScheme="blue"
          fontSize="lg"
          px="6"
          py="2"
        >
          Search
        </Button>
        <Button
          onClick={exportToPDF}
          colorScheme="blue"
          fontSize="lg"
          px="6"
          py="2"
          ml="10px"
        >
          Export to PDF
        </Button>
        <Button
          onClick={exportToExcel}
          colorScheme="blue"
          fontSize="lg"
          px="6"
          py="2"
          ml="10px"
        >
          Export to Excel
        </Button>
      </Flex>
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
          {searchDataIMEI.map((item, index) => (
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

export default SearchByIMEI;
