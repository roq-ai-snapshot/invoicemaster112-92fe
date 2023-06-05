import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getOrganisationById } from 'apiSdk/organisations';
import { Error } from 'components/error';
import { OrganisationInterface } from 'interfaces/organisation';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteContractById } from 'apiSdk/contracts';
import { deleteFinancialReportById } from 'apiSdk/financial-reports';
import { deleteInvoiceById } from 'apiSdk/invoices';

function OrganisationViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrganisationInterface>(
    () => (id ? `/organisations/${id}` : null),
    () =>
      getOrganisationById(id, {
        relations: ['user', 'contract', 'financial_report', 'invoice'],
      }),
  );

  const contractHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteContractById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const financial_reportHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteFinancialReportById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const invoiceHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteInvoiceById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Organisation Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              name: {data?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              created_at: {data?.created_at as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              updated_at: {data?.updated_at as unknown as string}
            </Text>
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                user: <Link href={`/users/view/${data?.user?.id}`}>{data?.user?.email}</Link>
              </Text>
            )}
            {hasAccess('contract', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="md" fontWeight="bold">
                  Contract
                </Text>
                <Link href={`/contracts/create?organisation_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4">
                    Create
                  </Button>
                </Link>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>start_date</Th>
                        <Th>end_date</Th>
                        <Th>created_at</Th>
                        <Th>updated_at</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.contract?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.start_date as unknown as string}</Td>
                          <Td>{record.end_date as unknown as string}</Td>
                          <Td>{record.created_at as unknown as string}</Td>
                          <Td>{record.updated_at as unknown as string}</Td>
                          <Td>
                            <Button>
                              <Link href={`/contracts/edit/${record.id}`}>Edit</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button>
                              <Link href={`/contracts/view/${record.id}`}>View</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button onClick={() => contractHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            {hasAccess('financial_report', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="md" fontWeight="bold">
                  Financial Report
                </Text>
                <Link href={`/financial-reports/create?organisation_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4">
                    Create
                  </Button>
                </Link>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>report_date</Th>
                        <Th>total_invoiced</Th>
                        <Th>total_received</Th>
                        <Th>created_at</Th>
                        <Th>updated_at</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.financial_report?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.report_date as unknown as string}</Td>
                          <Td>{record.total_invoiced}</Td>
                          <Td>{record.total_received}</Td>
                          <Td>{record.created_at as unknown as string}</Td>
                          <Td>{record.updated_at as unknown as string}</Td>
                          <Td>
                            <Button>
                              <Link href={`/financial-reports/edit/${record.id}`}>Edit</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button>
                              <Link href={`/financial-reports/view/${record.id}`}>View</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button onClick={() => financial_reportHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            {hasAccess('invoice', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="md" fontWeight="bold">
                  Invoice
                </Text>
                <Link href={`/invoices/create?organisation_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4">
                    Create
                  </Button>
                </Link>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>status</Th>
                        <Th>amount</Th>
                        <Th>due_date</Th>
                        <Th>created_at</Th>
                        <Th>updated_at</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.invoice?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.status}</Td>
                          <Td>{record.amount}</Td>
                          <Td>{record.due_date as unknown as string}</Td>
                          <Td>{record.created_at as unknown as string}</Td>
                          <Td>{record.updated_at as unknown as string}</Td>
                          <Td>
                            <Button>
                              <Link href={`/invoices/edit/${record.id}`}>Edit</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button>
                              <Link href={`/invoices/view/${record.id}`}>View</Link>
                            </Button>
                          </Td>
                          <Td>
                            <Button onClick={() => invoiceHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'organisation',
  operation: AccessOperationEnum.READ,
})(OrganisationViewPage);
