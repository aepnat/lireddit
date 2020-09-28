import React from "react";
import { Box, Link } from "@chakra-ui/core";
import { Button, Flex, Heading } from "@chakra-ui/core/dist";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
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
          <Link mr={4}>Login</Link>
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
        <Box mr={4}>{data.me.email}</Box>
        <Button
          onClick={() => {
            logout().then();
          }}
          isLoading={logoutFetching}
          variant="link"
          color="white"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={10}
      bg="teal.500"
      color="white"
      ml="auto"
    >
      <Flex maxWidth="800px" alignItems="center" p={4} mx="auto">
        <NextLink href="/">
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml="auto" fontWeight={700}>
          {body}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
