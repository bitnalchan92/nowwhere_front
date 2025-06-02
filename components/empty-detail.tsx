import { Bus, Train } from "lucide-react"

interface EmptyDetailProps {
  activeTab: "bus" | "subway"
}

export function EmptyDetail({ activeTab }: EmptyDetailProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-500">
        <div className="mb-4">
          {activeTab === "bus" ? (
            <Bus className="h-16 w-16 mx-auto text-gray-300" />
          ) : (
            <Train className="h-16 w-16 mx-auto text-gray-300" />
          )}
        </div>
        <p className="text-lg mb-2">{activeTab === "bus" ? "버스정류장을" : "지하철역을"} 선택해주세요</p>
        <p className="text-sm">{activeTab === "bus" ? "정류장" : "역"}을 검색하고 선택하면 상세 정보가 표시됩니다</p>
      </div>
    </div>
  )
}
