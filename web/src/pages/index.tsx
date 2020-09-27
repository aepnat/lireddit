import React from "react";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Box } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <Navbar />
      <Box m={4}>
        <div>Hello world</div>
        <br />
        {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
