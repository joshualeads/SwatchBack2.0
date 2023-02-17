import { extendTheme  } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        brand: {
          900: '#1a365d',
          800: '#153e75',
          700: '#2a69ac',
          600: '#167AFF'
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
        global: (props) => ({
            '.sb_container': {
                px: {
                    base: '2%',
                    md: '5%',
                    lg: '10%'
                }
            },
            '.sb_container_wide_screen': {
                px: {
                    base: '0%',
                    md: '2%',
                    lg: '2%'
                }
            },
            '.template': {
                mb: {
                    base: '30%',
                    md: '10%',
                    lg: '10%'
                },
                position: 'relative'
            },
            a: {
                textDecoration: 'none'
            },
            button: {
                textDecoration: 'none'
            }
        })
    }
})

export default customTheme;