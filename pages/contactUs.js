import React from 'react';
import Head from "next/head";
import { Box } from '@chakra-ui/react';

import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const ContactUs = () => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <Head>
                <title>
                    Contact Us - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <p>Contact Us Page</p>
            </Box>
        </Layout>
    );
}

export default ContactUs;