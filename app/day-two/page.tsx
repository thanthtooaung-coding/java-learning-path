import type { Metadata } from "next"
import DayTwoClientPage from "./DayTwoClientPage"

export const metadata: Metadata = {
  title: "Day Two: Variables & Operators | Java Learning Path",
  description: "Learn about variables, data types, user input, type casting, and operators in Java",
}

export default function DayTwoPage() {
  return <DayTwoClientPage />
}
