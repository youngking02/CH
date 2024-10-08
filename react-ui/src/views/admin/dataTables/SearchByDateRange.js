import React, { useState } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    searchData.forEach((data, index) => {
      doc.text(`Résultat ${index + 1}`, 10, y);
      Object.keys(data).forEach((key) => {
        y += 10;
        doc.text(`${key}: ${data[key]}`, 10, y);
      });
      y += 10;
    });
    doc.save('resultats_recherche.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Résultats");
    XLSX.writeFile(workbook, 'resultats_recherche.xlsx');
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="white" rounded="xl" boxShadow="lg" p={8}>
      <Text fontSize="2xl" mb="6" color="black">Entrez le numéro de téléphone et sélectionnez une période. La date de début ne peut pas être antérieure au 1er janvier 2020.</Text>
      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          width="20%"
          bg="gray.100"
          color="black"
          fontSize="lg"
          borderColor="gray.300"
          _placeholder={{ color: "gray.500" }}
        />
        <Input
          type="date"
          placeholder="Date de début"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          width="20%"
          bg="gray.100"
          color="black"
          fontSize="lg"
          borderColor="gray.300"
          max={maxStartDate}
          _placeholder={{ color: "gray.500" }}
        />
        <Input
          type="date"
          placeholder="Date de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          width="20%"
          bg="gray.100"
          color="black"
          fontSize="lg"
          borderColor="gray.300"
          _placeholder={{ color: "gray.500" }}
        />
        <Button
          onClick={searchCommunicationsByDateRange}
          colorScheme="orange"
          fontSize="lg"
          px="6"
          py="2"
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
      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px">
        <Thead>
          <Tr>
          <Th fontSize="lg">MSISDN</Th>
            <Th fontSize="lg">IMEI</Th>
            <Th fontSize="lg">Partner ID</Th>
            <Th fontSize="lg">Date & Heure</Th>
            <Th fontSize="lg">Durée</Th>
            <Th fontSize="lg">SITENAME</Th>
            <Th fontSize="lg">Localité</Th>
            <Th fontSize="lg">CDIR</Th>
            <Th fontSize="lg">Mode</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchData && searchData.map((comm, index) => (
            <Tr key={index}>
              <Td color="Black" fontSize="lg">{comm.msisdn}</Td>
              <Td color="Black" fontSize="lg">{comm.imei}</Td>
              <Td color="Black" fontSize="lg">{comm.partner_id}</Td>
              <Td color="Black" fontSize="lg">{comm.date_time}</Td>
              <Td color="Black" fontSize="lg">{comm.duration}</Td>
              <Td color="Black" fontSize="lg">{comm.site_name}</Td>
              <Td color="Black" fontSize="lg">{comm.locality}</Td>
              <Td color="Black" fontSize="lg">{comm.cdir}</Td>
              <Td color="Black" fontSize="lg">{comm.mode}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByDateRange;
