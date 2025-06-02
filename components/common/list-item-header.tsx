import { getTextSizeClass } from "@/utils/list-styles"
import { formatDistance } from "@/utils/format"

interface ListItemHeaderProps {
  name: string
  distance: number
  isMobile: boolean
}

export function ListItemHeader({ name, distance, isMobile }: ListItemHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-1">
      <h3 className={`font-medium ${getTextSizeClass(isMobile, "base")}`}>{name}</h3>
      <span className={`${getTextSizeClass(isMobile, "sm")} text-gray-500`}>{formatDistance(distance)}</span>
    </div>
  )
}
