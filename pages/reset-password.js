import React, { useState } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router'
import axios from 'axios';

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Box,
    InputGroup,
    InputRightElement,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useForm } from 'react-hook-form';

import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const ResetPassword = () => {
    const { user, loading } = useFetchUser();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // React-Hook-Form Validation
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const [isSubmitting, setSubmitStatus] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (data, router) => {
        console.log(data);

        console.log(router.query);
        let code = router.query.code;

        if(code){
            console.log("About to Reset Password");
            // Disable Submit Button / Unset Previous Submit Error Message
            setSubmitStatus(true);
            setSubmitError('');

            // Request API.
            await axios
            .post(`${process.env.STRAPI_CMS_DOMAIN}/api/auth/reset-password`, {
                code: code,
                password: data.newPassword,
                passwordConfirmation: data.confirmPassword
            })
            .then((response) => {
                console.log(response);
                setSubmitStatus(true);
                setSubmitSuccess('Password has been reset');
                router.push('/login');
            })
            .catch((error) => {
                console.log(error.response);
                setSubmitStatus(false);
                if(error.response.data) {
                    setSubmitError(error.response.data.error.message);
                } else {
                    setSubmitError('Unable to Reset Password');
                }
            });
        } else {
            // Show Alert Message "Invalid Link"
            setSubmitStatus(true);
            setSubmitError('Invalid link, Please check your mail again');
        }
    }

    const router = useRouter();

    return (
        <Layout user={user}>
            <Head>
                <title>
                    Reset Password - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    // bg={useColorModeValue('gray.50', 'gray.800')}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        // bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        my={12}>
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Enter new password
                        </Heading>

                        {/* Success Alert Message */}
                        {
                            submitSuccess ?
                            <Alert status='success' marginBottom={5} rounded={'lg'}>
                                <AlertIcon />
                                {/* <AlertTitle>{submitError}</AlertTitle> */}
                                {
                                    <AlertDescription>{submitSuccess}</AlertDescription>
                                }
                            </Alert>
                            : null
                        }

                        {/* Error Alert Message */}
                        {
                            submitError ? 
                                <Alert status='error' marginBottom={5} rounded={'lg'}>
                                    <AlertIcon />
                                    {/* <AlertTitle>{submitError}</AlertTitle> */}
                                    {
                                        <AlertDescription>{submitError}</AlertDescription>
                                    }
                                </Alert>
                            : null
                        }

                        <FormControl id="newPassword" isRequired>
                            <FormLabel>New Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    type={showNewPassword ? 'text' : 'password'} 
                                    name="newPassword"
                                    {
                                        ...register("newPassword", 
                                        {
                                            required: {value: "required"},
                                            minLength: {value: 6, message: "Should be more than 6 and less than 15"}, 
                                            maxLength: {value: 15, message: "Should be more than 6 and less than 15"}
                                        })
                                    }
                                    isInvalid={errors.newPassword}
                                    focusBorderColor={ errors.newPassword? 'red.500' : 'blue.500' }
                                    errorBorderColor='red.500'
                                    minLength={6}
                                    maxLength={15}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowNewPassword((showNewPassword) => !showNewPassword)
                                        }>
                                        {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text fontSize='md' color={'red.500'} marginTop={1}>
                                {errors.newPassword? errors.newPassword.message : ""}
                            </Text>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    name="confirmPassword"
                                    {
                                        ...register("confirmPassword", 
                                        {
                                            required: {value: "required"},
                                            minLength: {value: 6, message: "Should be more than 6 and less than 15"}, 
                                            maxLength: {value: 15, message: "Should be more than 6 and less than 15"},
                                            validate: (val) => {
                                                if(watch('newPassword') != val){
                                                    return "Your passwords do no match";
                                                }
                                            }
                                        })
                                    }
                                    isInvalid={errors.confirmPassword}
                                    focusBorderColor={ errors.confirmPassword? 'red.500' : 'blue.500' }
                                    errorBorderColor='red.500'
                                    minLength={6}
                                    maxLength={15}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                                        }>
                                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text fontSize='md' color={'red.500'} marginTop={1}>
                                {errors.confirmPassword? errors.confirmPassword.message : ""}
                            </Text>
                        </FormControl>
                        <Stack spacing={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={handleSubmit((data) => onSubmit(data, router))}
                                disabled={isSubmitting}
                                type={'submit'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
        </Layout>
    )
}

export default ResetPassword;

// Sample Response
/*
    {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY1NTIyMjkwNywiZXhwIjoxNjU3ODE0OTA3fQ.IMIZUp-TftcawOTwteiPV2AiM-VCULFDBuBEeGlTRH8","user":{"id":10,"username":"joshuajabakumar","email":"joshuajabakumar@gmail.com","provider":"local","confirmed":true,"blocked":false,"createdAt":"2022-06-13T16:32:36.659Z","updatedAt":"2022-06-14T16:07:55.604Z","firstName":"Joshua","lastName":"Jabakumar"}}
*/