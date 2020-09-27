import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Box } from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Button } from "@chakra-ui/core/dist";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout variant="small">
      <Link href={"/create-post"}>
        <Button variantColor="teal">Create Post</Button>
      </Link>
      <Box m={4}>
        <div>Hello world</div>
        <br />
        {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
