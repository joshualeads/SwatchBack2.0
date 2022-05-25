import { Stack, CircularProgress } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
    return (
        <Stack display={"flex"} position={"absolute"} top={0} height={"100vh"}>
            <CircularProgress display={"inline-block"} margin={"auto"} width={"200px"} />
        </Stack>
    )
}

export default Loader;