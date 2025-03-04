import { createFileRoute } from '@tanstack/react-router'
import { Post } from '.'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const resp = await fetch(`https://dummyjson.com/posts/${params.postId}`)
    const data = await resp.json() as Post
    return data
  }
})

function RouteComponent() {
  const post = Route.useLoaderData()

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}
