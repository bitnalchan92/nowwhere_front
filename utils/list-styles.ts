export const getListContainerClass = (isMobile: boolean) => {
  return isMobile ? "divide-y divide-gray-100" : "space-y-2 p-2"
}

export const getListItemClass = (isMobile: boolean, isSelected: boolean, borderColor: string) => {
  const baseClasses = "cursor-pointer transition-all duration-200 ease-in-out"

  if (isMobile) {
    const selectedClass = isSelected ? `bg-${borderColor}-50 border-${borderColor}-500` : ""
    return `${baseClasses} p-4 border-b border-gray-100 hover:bg-${borderColor}-50 active:bg-${borderColor}-100 ${selectedClass}`
  }

  const selectedClass = isSelected
    ? `border-${borderColor}-500 bg-${borderColor}-50 shadow-sm`
    : "border-transparent hover:border-gray-200"

  return `${baseClasses} p-3 rounded-lg border-l-4 hover:bg-gray-50 hover:shadow-sm ${selectedClass}`
}

export const getTextSizeClass = (isMobile: boolean, size: "base" | "sm" | "xs") => {
  if (isMobile) {
    return size === "base" ? "text-base font-medium" : "text-sm"
  }
  return size === "base" ? "text-sm font-medium" : "text-xs"
}
