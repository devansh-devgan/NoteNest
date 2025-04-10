import React, { useEffect, useRef } from 'react'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

let resizeTimeout = null
let insertTimeout = null

export const MasonryWrapper = ({ children, className = '' }) => {
  const containerRef = useRef(null)
  const masonryInstance = useRef(null)
  const isResizing = useRef(false)
  const isInserting = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Init Masonry only once
    if (!masonryInstance.current) {
      masonryInstance.current = new Masonry(container, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        gutter: 1,
        percentPosition: true,
        transitionDuration: '0.6s',
      })
    }

    // Detect if this is insertion event
    isInserting.current = true
    clearTimeout(insertTimeout)
    insertTimeout = setTimeout(() => {
      isInserting.current = false
    }, 300)

    const imgLoad = imagesLoaded(container)
    imgLoad.on('always', () => {
      if (!isResizing.current) {
        masonryInstance.current.reloadItems()
        masonryInstance.current.layout()
      }
    })

    // Trigger layout for insert
    if (!isResizing.current) {
      masonryInstance.current.reloadItems()
      masonryInstance.current.layout()
    }

    return () => {
      clearTimeout(insertTimeout)
    }
  }, [children])

  useEffect(() => {
    const handleResize = () => {
      isResizing.current = true
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        masonryInstance.current?.layout()
        isResizing.current = false
      }, 250)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <div ref={containerRef} className={`masonry-grid ${className}`}>
      <div className="masonry-sizer w-[280px]" />
      {children}
    </div>
  )
}