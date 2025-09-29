'use client'

import { useEffect } from 'react'

export function PrelineInit() {
  useEffect(() => {
    import('preline/dist/preline')
  }, [])

  return null
}
