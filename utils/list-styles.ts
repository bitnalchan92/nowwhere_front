export const getListContainerClass = (isMobile: boolean) => {
  return isMobile ? "divide-y divide-gray-100" : "space-y-1"
}

export const getListItemClass = (isMobile: boolean, isSelected: boolean, borderColor: string) => {
  if (isMobile) {
    return "p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
  }

  const selectedClass = isSelected ? `border-${borderColor}-500 bg-${borderColor}-50` : "border-transparent"
  return `p-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${selectedClass}`
}

export const getTextSizeClass = (isMobile: boolean, size: "base" | "sm" | "xs") => {
  if (isMobile) {
    return size === "base" ? "text-base" : "text-sm"
  }
  return size === "base" ? "text-sm" : "text-xs"
}
