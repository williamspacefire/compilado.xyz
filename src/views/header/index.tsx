import { Flex, Box, Heading, Divider, Stack } from '@chakra-ui/layout'
import {
    Button,
    IconButton,
    Spacer,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import config from '../../../config'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Header(props: { title: string; homePage?: boolean }) {
    const { title, homePage } = props
    const changeThemeIcon = useColorModeValue(<MoonIcon />, <SunIcon />)
    const { toggleColorMode } = useColorMode()
    const pageTitle = homePage ? title : title + config.site.title

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/@highlightjs/cdn-assets@11.0.1/styles/default.min.css'></link>
            </Head>
            <Flex
                p={4}
                marginLeft='auto'
                marginRight='auto'
                paddingLeft='4vw'
                paddingRight='4vw'
                width='100%'
                maxW='calc(1140px + 8vw)'>
                <Box p='2'>
                    <Stack alignItems='center' direction='row' height='100%' p={4}>
                        <Link href='/' passHref>
                            <Heading
                                as='a'
                                size='md'
                                fontSize='24px'
                                fontWeight='800'
                                marginRight='15px'
                                fontFamily='sans-serif'>
                                {config.site.name}
                            </Heading>
                        </Link>
                        <Divider orientation='vertical' />
                        <Box marginLeft='15px'>
                            <Button colorScheme='teal' variant='ghost'>
                                Sobre
                            </Button>
                            <Button colorScheme='teal' variant='ghost'>
                                Autor
                            </Button>
                            <Button colorScheme='teal' variant='ghost'>
                                Contato
                            </Button>
                        </Box>
                    </Stack>
                </Box>
                <Spacer />
                <Box>
                    <IconButton
                        aria-label='Mudar tema'
                        onClick={toggleColorMode}
                        icon={changeThemeIcon}
                    />
                </Box>
            </Flex>
        </>
    )
}
