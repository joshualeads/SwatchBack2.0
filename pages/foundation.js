import React from "react";
import Head from 'next/head'
import { Box, Text, Heading, Flex, Spacer, Stack } from "@chakra-ui/react";

import DropDownSearch from "../components/DropDownSearch";

const Foundation = () => {
    return (
        <main>
            <Head>
                <title>Foundation - SwatchBack</title>
            </Head>
            <Box className="sb_container">
                <Heading as="h2" size="xl" mt={40} mb={10} textAlign={"center"}>
                    Use Existing Shade
                </Heading>
                <Text color={'gray.500'} mb={10} textAlign={"center"} fontSize={"xl"}>
                    Tell us your current shade match, and we'll help you find a match in your next foundation or concealer!
                </Text>

                <Flex mt={6} mb={6}>
                    <Spacer /> 
                        <Stack width={"50%"}>
                            <DropDownSearch searchType={"foundation"} />
                        </Stack>
                    <Spacer />
                </Flex>
            </Box>
        </main>
    )
}

export default Foundation;