import React, { useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { Box, Heading, Button, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { NextPage } from "next";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/core/dist";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Heading mb={4}>Reset Password</Heading>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            } else {
              setErrors(errorMap);
            }
          } else if (response.data?.changePassword.user) {
            router.push("/").then();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                label="New Password"
                name="newPassword"
                placeholder="New Password"
                type="password"
                autoComplete="current-password"
              />
            </Box>
            {tokenError ? (
              <Flex mt={2}>
                <Box mr={2} color="red.500">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link color="teal.500" textDecoration="underline">
                    click here to get a new one
                  </Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
