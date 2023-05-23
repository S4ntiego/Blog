import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import SearchBar from "@/components/searchBar"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { post: string }
}) {
  const search = searchParams.post ?? ""
  const posts = allPosts
    .filter((post) => post.published && post.title.includes(search))
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-cal font-extrabold text-4xl tracking-tight lg:text-5xl">
            Coding Chronicles
          </h1>
          <p className="text-xl text-muted-foreground">
            Programming, <span className="line-through">explosions</span>,
            gaming, calisthenics, and so much more.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <SearchBar className="mb-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors aspect-[4/3] object-cover mb-4"
                  priority={index <= 1}
                />
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}

              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
