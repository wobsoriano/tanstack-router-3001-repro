import { createFileRoute, Link } from '@tanstack/react-router'

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
}

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: async () => {
    const resp = await fetch('https://dummyjson.com/posts')
    const data = await resp.json() as {
      posts: Post[];
      total: number;
      skip: number;
      limit: number;
    }

    return data.posts.map((post) => ({
      ...post,
      id: post.id.toString()
    }))
  }
})

function RouteComponent() {
  const posts = Route.useLoaderData()

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to="/posts/$postId" params={{ postId: post.id }}>{post.title}</Link>
        </div>
      ))}
    </div>
  )
}
