"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

export const TableOfContents = ({ nodes }) => {
  if (!nodes?.length) {
    return null
  }

  return <div>{renderNodes(nodes)}</div>
}

function renderNodes(nodes) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.data.headingProperties.id}>
          <TOCLink node={node} />
          {node.children?.length > 0 && renderNodes(node.children)}
        </li>
      ))}
    </ul>
  )
}

function useHighlighted(
  id: string
): [boolean, Dispatch<SetStateAction<string>>] {
  const observer = useRef<IntersectionObserver | undefined>()
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer.current = new IntersectionObserver(handleObserver, {
        rootMargin: "0% 0% -35% 0px",
      })

      const elements = document.querySelectorAll("h2, h3, h4")
      elements.forEach((elem) => observer.current?.observe(elem))
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return [activeId === id, setActiveId]
}

const TOCLink = ({ node }): JSX.Element => {
  const fontSizes = { 2: 2, 3: 3, 4: 4 }
  const id = node.data.headingProperties.id
  const [highlighted, setHighlighted] = useHighlighted(id)

  const handleClick = (event) => {
    event.preventDefault()
    setHighlighted(id)
    const targetElement = document.getElementById(id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <a
      href={`#${id}`}
      className={`block ${node.depth === 2 ? "font-medium" : ""} text-${
        fontSizes[node.depth]
      } pl-${fontSizes[node.depth]} hover:text-blue-700 py-1 ${
        highlighted && "text-blue-700"
      }`}
      onClick={handleClick}
    >
      {node.value}
    </a>
  )
}
