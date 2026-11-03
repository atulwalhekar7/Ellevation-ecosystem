import { useEffect, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  // true karoge to window se focus hatne par page blur hoga (Win+Shift+S jaise tools par kabhi kabhi kaam karta hai)
  blurOnLeave?: boolean
}

const isEditable = (target: EventTarget | null) =>
  target instanceof Element &&
  !!target.closest('input, textarea, [contenteditable="true"]')

export default function ProtectedApp({ children, blurOnLeave = false }: Props) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const block = (e: Event) => {
      if (isEditable(e.target)) return
      e.preventDefault()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const mod = e.ctrlKey || e.metaKey
      const inField = isEditable(e.target)

      if (mod && ['c', 'x', 'a'].includes(k) && !inField) e.preventDefault()
      if (mod && ['s', 'u', 'p'].includes(k)) e.preventDefault()
      if (e.key === 'F12' || (mod && e.shiftKey && ['i', 'j', 'c'].includes(k))) {
        e.preventDefault()
      }
    }

    const events = ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart']
    events.forEach((ev) => document.addEventListener(ev, block))
    document.addEventListener('keydown', onKeyDown)

    const hide = () => setHidden(true)
    const show = () => setHidden(false)
    const onVisibility = () => setHidden(document.hidden)

    if (blurOnLeave) {
      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('blur', hide)
      window.addEventListener('focus', show)
    }

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, block))
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', hide)
      window.removeEventListener('focus', show)
    }
  }, [blurOnLeave])

  return (
    <div className={hidden ? 'protected-hidden' : undefined}>{children}</div>
  )
}