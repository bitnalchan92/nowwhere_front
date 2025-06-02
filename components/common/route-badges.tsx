import { Badge } from "@/components/ui/badge"
import { getTextSizeClass } from "@/utils/list-styles"

interface RouteBadgesProps {
  routes: Array<{ id: string; routeNumber: string }>
  isMobile: boolean
  maxVisible?: number
}

export function RouteBadges({ routes, isMobile, maxVisible = 3 }: RouteBadgesProps) {
  const visibleCount = isMobile ? maxVisible + 1 : maxVisible
  const visibleRoutes = routes.slice(0, visibleCount)
  const remainingCount = routes.length - visibleCount

  return (
    <div className="flex flex-wrap gap-1">
      {visibleRoutes.map((route) => (
        <Badge key={route.id} variant="outline" className={getTextSizeClass(isMobile, "xs")}>
          {route.routeNumber}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className={getTextSizeClass(isMobile, "xs")}>
          +{remainingCount}
        </Badge>
      )}
    </div>
  )
}
