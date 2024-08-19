import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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
    doc.save('search_results_by_imsi.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, 'search_results_by_imsi.xlsx');
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="white" rounded="xl">
      <Box pl="4" pr="10">
        <Text fontSize="2xl" mb="6" color="black">Recherche via IMSI pour les numéros de téléphone et les dates d'utilisation</Text>

        <Flex mb="50px" wrap="wrap" justifyContent="space-between" alignItems="center">
          <Input
            placeholder="IMSI"
            value={imsi}
            onChange={(e) => setImsi(e.target.value)}
            width="20%"
            bg="gray.100"
            color="black"
            fontSize="lg"
            borderColor="gray.300"
            _placeholder={{ color: "gray.500" }}
            mr="2"
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            width="20%"
            bg="gray.100"
            color="black"
            fontSize="lg"
            borderColor="gray.300"
            _placeholder={{ color: "gray.500" }}
            mr="2"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            width="20%"
            bg="gray.100"
            color="black"
            fontSize="lg"
            borderColor="gray.300"
            _placeholder={{ color: "gray.500" }}
            mr="2"
          />
          <Button onClick={searchByIMSI} colorScheme="orange" fontSize="lg" px="6" py="2">
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

      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px">
        <Thead>
          <Tr>
            <Th fontSize="lg">Numero</Th>
            <Th fontSize="lg">Start Date</Th>
            <Th fontSize="lg">End Date</Th>
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
