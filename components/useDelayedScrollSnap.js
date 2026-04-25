import { useEffect } from 'react'

const SNAP_DELAY_MS = 50
const SNAP_PAUSED_CLASS = 'snap-paused'
const SCROLLING_KEYS = [
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]

const toggleSnapPause = (shouldPause) => {
  document.documentElement.classList.toggle(SNAP_PAUSED_CLASS, shouldPause)
  document.body.classList.toggle(SNAP_PAUSED_CLASS, shouldPause)
}

export const useDelayedScrollSnap = () => {
  useEffect(() => {
    let snapTimer

    const pauseSnap = () => {
      toggleSnapPause(true)

      window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => {
        toggleSnapPause(false)
      }, SNAP_DELAY_MS)
    }

    const handleKeydown = (event) => {
      if (SCROLLING_KEYS.includes(event.key)) {
        pauseSnap()
      }
    }

    window.addEventListener('wheel', pauseSnap, { passive: true })
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.clearTimeout(snapTimer)
      toggleSnapPause(false)
      window.removeEventListener('wheel', pauseSnap)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])
}
