import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const COURSE_DAYS = [
  { id: 1, title: "Introduction to Java", description: "Learn the fundamentals of Java programming language", path: "/day-one" },
  { id: 2, title: "Variables, Data Types & Operators", description: "Learn about variables, data types, user input, type casting, and operators", path: "/day-two" },
  // { id: 2, title: "Object-Oriented Programming", description: "Understand classes, objects, inheritance, and polymorphism", path: "/day-two" },
  // { id: 3, title: "Exception Handling", description: "Learn how to handle errors and exceptions in Java", path: "/day-three" },
  // { id: 4, title: "Collections Framework", description: "Explore Java's built-in data structures", path: "/day-four" },
  // { id: 5, title: "Generics", description: "Learn about type safety and generic programming", path: "/day-five" },
  
]

export default function Home() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Java Learning Path</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Master Java programming with our comprehensive learning path and interactive quizzes.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSE_DAYS.map((day) => (
            <Card key={day.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>Day {day.id}: {day.title}</CardTitle>
                <CardDescription>{day.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Interactive Quiz</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={day.path} className="w-full">
                  <Button className="w-full">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}