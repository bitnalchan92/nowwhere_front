"use client"

import { useState } from "react"

export function useDetail() {
  const [showDetail, setShowDetail] = useState(false)

  const showDetailView = () => {
    setShowDetail(true)
  }

  const hideDetailView = () => {
    setShowDetail(false)
  }

  return {
    showDetail,
    showDetailView,
    hideDetailView,
  }
}
