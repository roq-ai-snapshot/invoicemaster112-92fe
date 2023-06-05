import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createFinancialReport } from 'apiSdk/financial-reports';
import { Error } from 'components/error';
import { financialReportValidationSchema } from 'validationSchema/financial-reports';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganisationInterface } from 'interfaces/organisation';
import { getOrganisations } from 'apiSdk/organisations';
import { FinancialReportInterface } from 'interfaces/financial-report';

function FinancialReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialReport(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialReportInterface>({
    initialValues: {
      report_date: new Date(new Date().toDateString()),
      total_invoiced: 0,
      total_received: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      organisation_id: (router.query.organisation_id as string) ?? null,
    },
    validationSchema: financialReportValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Financial Report
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="report_date" mb="4">
            <FormLabel>report_date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.report_date}
              onChange={(value: Date) => formik.setFieldValue('report_date', value)}
            />
          </FormControl>
          <FormControl id="total_invoiced" mb="4" isInvalid={!!formik.errors?.total_invoiced}>
            <FormLabel>total_invoiced</FormLabel>
            <NumberInput
              name="total_invoiced"
              value={formik.values?.total_invoiced}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('total_invoiced', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.total_invoiced && <FormErrorMessage>{formik.errors?.total_invoiced}</FormErrorMessage>}
          </FormControl>
          <FormControl id="total_received" mb="4" isInvalid={!!formik.errors?.total_received}>
            <FormLabel>total_received</FormLabel>
            <NumberInput
              name="total_received"
              value={formik.values?.total_received}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('total_received', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.total_received && <FormErrorMessage>{formik.errors?.total_received}</FormErrorMessage>}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>created_at</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>updated_at</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<OrganisationInterface>
            formik={formik}
            name={'organisation_id'}
            label={'organisation_id'}
            placeholder={'Select Organisation'}
            fetcher={getOrganisations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'financial_report',
  operation: AccessOperationEnum.CREATE,
})(FinancialReportCreatePage);
