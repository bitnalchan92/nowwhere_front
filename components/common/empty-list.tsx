interface EmptyListProps {
  type: "bus" | "subway"
}

export function EmptyList({ type }: EmptyListProps) {
  const message =
    type === "bus" ? "검색 버튼을 눌러 근처 버스정류장을 찾아보세요" : "검색 버튼을 눌러 근처 지하철역을 찾아보세요"

  return <div className="p-4 text-center text-gray-500 text-sm">{message}</div>
}
