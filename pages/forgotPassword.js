import React from 'react';
import Head from "next/head";
import { Box } from '@chakra-ui/react';

import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const ForgotPassword = () => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <Head>
                <title>
                    Forgot Password - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <p>Forgot Password</p>
            </Box>
        </Layout>
    );
}

export default ForgotPassword;