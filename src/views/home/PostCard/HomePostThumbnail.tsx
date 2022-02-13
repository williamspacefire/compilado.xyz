import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Img } from '@chakra-ui/react'

type PostThumbnailProps = {
    thumbnailUrl: string
}

export default class HomePostThumbnail extends React.Component<PostThumbnailProps> {
    render() {
        return (
            <Box maxW='calc(960px + 8vw)'>
                <figure className='post_thumbnail'>
                    <Img
                        src={this.props.thumbnailUrl}
                        className='thumbnail_rule'
                        fallbackSrc='/image/2000x1215.webp'
                        loading='lazy'
                    />
                </figure>
            </Box>
        )
    }
}
