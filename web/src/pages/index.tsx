import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Box, Button, Stack, Heading, Text } from "@chakra-ui/core";
import Layout from "../components/Layout";
import Link from "next/link";
import { Flex } from "@chakra-ui/core/dist";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reasone</div>;
  }

  return (
    <Layout>
      <Flex justifyContent="flex-end">
        <Link href={"/create-post"}>
          <Button variantColor="teal">Create Post</Button>
        </Link>
      </Flex>
      <Box>
        <br />
        {!data && fetching ? (
          <div>Loading...</div>
        ) : (
          <Stack spacing={8} mb={8}>
            {data!.posts.posts.map((p) => (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        )}
        {data && data.posts.hasMore ? (
          <Flex justifyContent="center" mb={8}>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                });
              }}
              isLoading={fetching}
              variantColor="teal"
              color="white"
            >
              Load more
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
