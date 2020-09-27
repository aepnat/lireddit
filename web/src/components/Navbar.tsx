import React from "react";
import { Box, Link } from "@chakra-ui/core";
import { Button, Flex } from "@chakra-ui/core/dist";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout().then();
          }}
          isLoading={logoutFetching}
          color="black"
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="white" borderBottom="1px" borderColor="gray.200" p={4} ml="auto">
      <Box ml="auto" color="gray.500" fontWeight={700}>
        {body}
      </Box>
    </Flex>
  );
};
