import React from "react";
import Head from "next/head";
import { Box, Text, Heading, Flex, Spacer, Stack } from "@chakra-ui/react";

import DropDownSearch from "../components/DropDownSearch";

const Dupes = () => {
    return(
        <main>
            <Head>
                <title>
                    Dupes - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <Heading as="h2" size="xl" mt={40} mb={10} textAlign={"center"}>
                    Search By Product
                </Heading>
                <Text color={'gray.500'} mb={10} textAlign={"center"} fontSize={"xl"}>
                    Start typing the name of the product you're looking for dupes below, then select the product from the drop down menu
                </Text>

                <Flex mt={6} mb={6}>
                    <Spacer /> 
                        <Stack width={"50%"}>
                            <DropDownSearch searchType={"dupes"} />
                        </Stack>
                    <Spacer />
                </Flex>
            </Box>
        </main>
    )
}

export default Dupes;