import { IPosts } from '../entities/IPosts'
import { PostMetadata } from '../entities/PostMetadata'
import { Post } from '../entities/Post'
import File from '../use_cases/file'
import matter from 'gray-matter'
import { postsImageDirectory } from '../main/dependencies'

export class PostsMarkdownFileImpl implements IPosts {
    private postId?: string
    private directoryFiles?: string[]
    private post?: Post

    getHomePagePaths(): string[] {
        return File.getDirectoryFiles(File.getPostsDirectory()).map(
            file => '/' + file.replace('.md', '')
        )
    }

    setPostId(postId: string): void {
        this.postId = postId
    }

    getPostId(): string {
        if (!this.postId)
            throw new Error(
                'PostId not defined, please set postId before get it'
            )

        return this.postId
    }

    public getPost(): Post {
        if (!this.postId)
            throw new Error('You need to set postId to use this function')

        this.setPostFromFile()

        return this.post!
    }

    private setPostFromFile() {
        if (!this.postId)
            throw new Error('You need to set postId to use this function')

        const absoluteFilePath = this.getFilePostFileAbsolutePath()
        const postFileContent = File.getFileContent(absoluteFilePath)
        const matter = this.getPostMetaData(postFileContent)
        const metadata = matter.data as PostMetadata

        this.post = {
            ...metadata,
            content: matter.content,
            canonical: this.postId,
            tags: this.getTagsFromString(metadata.tags),
            thumbnail: this.getThumbnailPath(metadata.thumbnail),
        }
    }

    private getThumbnailPath(thumbnail: string): string {
        return postsImageDirectory + thumbnail
    }

    private getFilePostFileAbsolutePath(): string {
        return File.getPostsDirectory() + '/' + this.getPostFileNameFromPostId()
    }

    private getTagsFromString(tagsString: string): string[] {
        return tagsString.split(',')
    }

    public getPosts(limit?: number): Post[] {
        this.directoryFiles = File.getDirectoryFiles(File.getPostsDirectory())

        if (limit) this.limitDirectoryFiles(limit)
        const posts = this.directoryFiles.map(filename =>
            this.directoryFilesMapCallback(filename)
        )

        return this.sortPost(posts)
    }

    private directoryFilesMapCallback(filename: string): Post {
        const postsInstance = new PostsMarkdownFileImpl()
        postsInstance.setPostId(this.getPostIdFromFileName(filename))

        return postsInstance.getPost()
    }

    private limitDirectoryFiles(limit: number): void {
        if (!this.directoryFiles) throw new Error('directory files not set')

        this.directoryFiles = this.directoryFiles.filter(
            (_, index) => index < limit
        )
    }

    private getPostFileNameFromPostId(postId?: string): string {
        return postId ? `${postId}.md` : `${this.postId}.md`
    }

    private getPostIdFromFileName(filename?: string): string {
        if (filename) {
            return filename.replace('.md', '')
        } else if (this.postId) {
            return this.postId.replace('.md', '')
        } else throw new Error('You need to pass filename or set the postId')
    }

    public sortPost(post: Post[]) {
        return post.sort((a, b) => b.creation_time - a.creation_time)
    }

    private getPostMetaData(postContent: string) {
        return matter(postContent)
    }
}
