import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import pdfIcon from 'assets/img/avatars/pdf.svg';
import excelIcon from 'assets/img/avatars/excel.svg';

const SearchByIMEI = () => {
  const [searchDataIMEI, setSearchDataIMEI] = useState([]);
  const [imeiNumber, setIMEINumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const searchContactsByIMEI = () => {
    fetch(`http://127.0.0.1:5000/api/contact/search_by_imei/?imei=${imeiNumber}&start_date=${startDate}&end_date=${endDate}`)
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    searchDataIMEI.forEach((data, index) => {
      doc.text(`Result ${index + 1}`, 10, y);
      Object.keys(data).forEach((key) => {
        y += 10;
        doc.text(`${key}: ${data[key]}`, 10, y);
      });
      y += 10;
    });
    doc.save('search_results.pdf');
    toast({
      title: 'PDF Exported.',
      description: 'Your search results have been saved as a PDF.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searchDataIMEI);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, 'search_results.xlsx');
    toast({
      title: 'Excel Exported.',
      description: 'Your search results have been saved as an Excel file.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "50px" }} w="100%" bg="white" rounded="xl" boxShadow="lg" p={8}>
            <Text fontSize="2xl" mb="6" color="black">Recherche du traffic via IMEI</Text>

      <Flex mb="20px" wrap="wrap" justifyContent="space-between" alignItems="center">
        <Input
          placeholder="Search by IMEI"
          value={imeiNumber}
          onChange={(e) => setIMEINumber(e.target.value)}
          width="20%"
          bg="gray.100"
          color="black"
          fontSize="lg"
          borderColor="gray.300"
          _placeholder={{ color: "gray.500" }}
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
          onClick={handleExportPDF}
          fontSize="lg"
          p="0"
          rounded="full"
          ml="2"
          bg="transparent"
          boxShadow="md"
          _hover={{ transform: 'scale(1.1)' }}
          transition="all 0.3s"
        >
          <Image src={pdfIcon} alt="Export PDF" boxSize="50px" />
        </Button>
        <Button
          onClick={handleExportExcel}
          fontSize="lg"
          p="0"
          rounded="full"
          ml="2"
          bg="transparent"
          boxShadow="md"
          _hover={{ transform: 'scale(1.1)' }}
          transition="all 0.3s"
        >
          <Image src={excelIcon} alt="Export Excel" boxSize="50px" />
        </Button>
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
      <Table mt="20px" variant="striped" colorScheme="gray">
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
          {searchDataIMEI.map((item, index) => (
            <Tr key={index}>
              <Td color="Black" fontSize="lg">{item.phone_number}</Td>
              <Td color="Black" fontSize="lg">{item.correspondent}</Td>
              <Td color="Black" fontSize="lg">{item.duration}</Td>
              <Td color="Black" fontSize="lg">{item.timestamp}</Td>
              <Td color="Black" fontSize="lg">{item.site_name}</Td>
              <Td color="Black" fontSize="lg">{item.locality}</Td>
              <Td color="Black" fontSize="lg">{item.imsi}</Td>
              <Td color="Black" fontSize="lg">{item.communication_type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByIMEI;
