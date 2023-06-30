import { notFound } from "next/navigation"
import { Post, allAuthors, allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx"

import "@/styles/mdx.css"
import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

interface PostWithSlug extends Post {
  slugAsParams: string
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post: PostWithSlug) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post: PostWithSlug) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn("absolute left-[-200px] top-14 hidden xl:inline-flex")}
      >
        See all posts
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 font-cal font-extrabold inline-block text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://www.linkedin.com/in/${author.linkedIn}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @LinkedIn
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/">See all posts</Link>
      </div>
    </article>
  )
}
