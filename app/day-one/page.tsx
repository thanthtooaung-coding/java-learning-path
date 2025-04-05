import type { Metadata } from "next"
import DayOneClientPage from "./DayOneClientPage"

export const metadata: Metadata = {
  title: "Day One: Java Basics | Java Learning Path",
  description: "Learn the fundamentals of Java programming language",
}

export default function DayOnePage() {
  return <DayOneClientPage />
}
