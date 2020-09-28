import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { Box, Button, Stack, Heading, Text, Link, Flex } from "@chakra-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { UpdootSection } from "../components/UpdootSection";
import { IconButton } from "@chakra-ui/core/dist";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>you got query failed for some reasone</div>;
  }

  return (
    <Layout>
      <Flex justifyContent="flex-end">
        <NextLink href={"/create-post"}>
          <Button variantColor="teal">Create Post</Button>
        </NextLink>
      </Flex>
      <Box>
        <br />
        {!data && fetching ? (
          <div>Loading...</div>
        ) : (
          <Stack spacing={8} mb={8}>
            {data!.posts.posts.map((p, index) =>
              !p ? null : (
                <Flex key={index} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={p} />
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text fontSize={11}>posted by {p.creator.username}</Text>
                    <Flex justifyContent="space-between" align="center">
                      <Text mt={4}>{p.textSnippet}</Text>
                      <IconButton
                        aria-label="Delete post"
                        icon="delete"
                        variantColor="red"
                        onClick={async () => {
                          await deletePost({ id: p.id });
                        }}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
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
