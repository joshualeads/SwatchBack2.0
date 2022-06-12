import React from 'react';
import Head from "next/head";
import { Box } from '@chakra-ui/react';

import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const Profile = () => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <Head>
                <title>
                    My Account - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <p>Profile Page</p>
            </Box>
        </Layout>
    );
}

export default Profile;