import React from 'react'
import { Post } from '../../../entities/Post'
import Link from 'next/link'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react'
import HomePostThumbnail from './HomePostThumbnail'
import { DateUtils } from '../../../utils/DateUtils'

export default function PostCard(props: Post) {
    const date = new Date(props.creation_time)
    const dateUtils = new DateUtils()

    return (
        <Center py={6}>
            <Box
                maxW='calc(960px + 8vw)'
                w={'full'}
                fontFamily='sans-serif'
                p={6}
                overflow={'hidden'}>
                <Link href={`/${props.canonical}`} passHref>
                    <a>
                        <HomePostThumbnail thumbnailUrl={props.thumbnail} />
                    </a>
                </Link>
                <Box
                    maxW='calc(750px + 8vw)'
                    marginLeft='4vw'
                    marginRight='4vw'>
                    <Stack>
                        <HStack>
                            {props.tags.map((tag, index) => {
                                if (index > 2) return
                                return (
                                    <Text
                                        key={index}
                                        color={'green.500'}
                                        textTransform={'uppercase'}
                                        fontWeight={800}
                                        fontSize={'sm'}
                                        letterSpacing={1.1}>
                                        {tag}
                                    </Text>
                                )
                            })}
                        </HStack>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            <Link href={`/${props.canonical}`} passHref>
                                <a>{props.title}</a>
                            </Link>
                        </Heading>
                        <Text color={'gray.500'}>{props.description}</Text>
                    </Stack>
                    <Stack
                        mt={6}
                        direction={'row'}
                        spacing={4}
                        align={'center'}>
                        <Avatar
                            src={
                                'https://avatars.githubusercontent.com/u/4999076?v=4'
                            }
                            alt={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>William Spacefire</Text>
                            <Text color={'gray.500'}>
                                {dateUtils.formatDateToVerbose(date)}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Center>
    )
}
