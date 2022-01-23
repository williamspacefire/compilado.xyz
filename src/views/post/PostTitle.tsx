import React from 'react'
import { Heading } from '@chakra-ui/react'

export default class PostTitle extends React.Component<{ title: string }> {
    render() {
        return (
            <center>
                <Heading
                    as='h1'
                    margin='3'
                    fontSize='2.4rem'
                    fontWeight='extrabold'>
                    {this.props.title}
                </Heading>
            </center>
        )
    }
}
