import { extendTheme  } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        brand: {
          900: '#1a365d',
          800: '#153e75',
          700: '#2a69ac',
        },
    },
    components: {
        Alert: {
          defaultProps: {
            colorScheme: 'blue',
          },
        },
    },
    styles: {
        global: {
            '.sb_container': {
                px: {
                    base: '2%',
                    md: '5%',
                    lg: '10%'
                }
            }
        }
    }
})

export default customTheme;