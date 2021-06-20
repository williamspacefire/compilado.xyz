import Header from '../views/header/header'
import config from '../../config'
import PostPage from '../views/home/post'
import Footer from '../views/footer/footer'
import { GetStaticProps } from 'next'
import { Post } from '../entities/post_type'
import postsDatabase from '../use_cases/posts_database'

export const getStaticProps: GetStaticProps = async context => {
    return { props: { posts: postsDatabase.getPosts() } }
}

export default function Index(props: { posts: Post[] }) {
    const { posts } = props

    return (
        <>
            <Header
                title={
                    config.site.name +
                    ' - Ensinando programação para todo o Brasil'
                }
                homePage={true}
            />
            <PostPage posts={posts} />
            <Footer />
        </>
    )
}
