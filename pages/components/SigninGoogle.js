import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const SignInGoogle = (props) => {
    return (
        <Center >
            <Button
                onClick={props.gSignIn}
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}>
                <Center>
                <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </Center>
    );
}

export default SignInGoogle;