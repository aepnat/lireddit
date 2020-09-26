import React from 'react';
import {Wrapper} from "../components/Wrapper";
import {Form, Formik} from "formik";
import {InputField} from "../components/InputField";
import {Box, Button} from "@chakra-ui/core";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import {Heading} from "@chakra-ui/core/dist";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();

    return (
        <Wrapper
            variant="small"
        >
            <Heading mb={4}>Register</Heading>
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({username: values.username, password: values.password});
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        router.push('/').then();
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField label="Username" name="username" placeholder="username" />
                        <Box my={4}>
                            <InputField label="Password" name="password" placeholder="password" type="password" autoComplete="current-password" />
                        </Box>
                        <Button type="submit" isLoading={isSubmitting} variantColor="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;