"use client"

import { useState } from "react"
import type { TransitTab } from "@/types/transit"

export function useTab() {
  const [activeTab, setActiveTab] = useState<TransitTab>("bus")

  const switchTab = (tab: TransitTab) => {
    setActiveTab(tab)
  }

  return {
    activeTab,
    switchTab,
  }
}
