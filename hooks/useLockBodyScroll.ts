import * as React from "react"

//https://usehooks.com/useLockBodyScroll
export function useLockBodyScroll() {
  React.useLayoutEffect((): (() => void) => {
    //get original body style
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow
    //set body style to overflow-hidden to prevent from scrolling
    document.body.style.overflow = "hidden"
    //return to original style on close
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
