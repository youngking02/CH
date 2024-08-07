// src/views/admin/dataTables/components/CheckTable.js
import React from 'react';
import { useTable, usePagination } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Select,
  Flex,
  Text
} from "@chakra-ui/react";

const CheckTable = ({ columnsData, tableData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns: columnsData,
      data: tableData,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()} variant="simple">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex mt="4" justifyContent="space-between" alignItems="center">
        <Flex>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </Button>
        </Flex>
        <Flex alignItems="center">
          <Text mr="8">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Text>
          <Select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            width="auto"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckTable;
