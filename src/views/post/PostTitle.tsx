import * as React from 'react'
import { Center, Heading } from '@chakra-ui/react'

export default class PostTitle extends React.Component<{ title: string }> {
    render() {
        return (
            <>
                <Center>
                    <Heading
                        as='h1'
                        margin='3'
                        fontSize='2.4rem'
                        fontWeight='extrabold'>
                        {this.props.title}
                    </Heading>
                </Center>
            </>
        )
    }
}
