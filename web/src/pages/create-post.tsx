import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, Heading } from "@chakra-ui/core/dist";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Heading mb={4}>Create Post</Heading>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/").then();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" name="title" />
            <Box my={4}>
              <InputField label="Text" name="text" textarea />
            </Box>
            <Button type="submit" isLoading={isSubmitting} variantColor="teal">
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
