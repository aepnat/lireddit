import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Alert, AlertIcon, Button, Heading, Link, Box } from "@chakra-ui/core";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";

const Forgotpassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [success, setSuccess] = useState(false);

  return (
    <Wrapper variant="small">
      <Heading mb={4}>Forgot Password</Heading>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async ({ email }, { resetForm }) => {
          const response = await forgotPassword({
            email,
          });
          setSuccess(response.data?.forgotPassword === true);
          resetForm({});
        }}
      >
        {({ isSubmitting }) =>
          success ? (
            <Box>
              <Alert status="info" mb={4}>
                <AlertIcon />
                If an account with that email exists, we sent you an email!
              </Alert>
              <NextLink href="/login">
                <Link color="teal.500">Back to Login</Link>
              </NextLink>
            </Box>
          ) : (
            <Form>
              <InputField
                label="Email"
                name="email"
                placeholder="Email"
                autoComplete="email"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Forgotpassword);
