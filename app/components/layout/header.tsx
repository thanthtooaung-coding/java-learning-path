"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Code, Moon, Sun, BookOpen, GraduationCap, Search, Github, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const COURSE_DAYS = [
  {
    id: 1,
    title: "Introduction to Java",
    path: "/day-one",
    completed: true,
  },
  {
    id: 2,
    title: "Data Types and Variables",
    path: "/day-two",
    completed: false,
  },
//   {
//     id: 3,
//     title: "Operators and Expressions",
//     path: "/day-three",
//     completed: false,
//   },
//   {
//     id: 4,
//     title: "Control Flow Statements",
//     path: "/day-four",
//     completed: false,
//   },
//   {
//     id: 5,
//     title: "Arrays",
//     path: "/day-five",
//     completed: false,
//   },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const completedDays = COURSE_DAYS.filter((day) => day.completed).length
  const progressPercentage = (completedDays / COURSE_DAYS.length) * 100

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentDay = COURSE_DAYS.find((day) => pathname === day.path)

  const filteredDays = searchQuery
    ? COURSE_DAYS.filter(
        (day) =>
          day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `day ${day.id}`.includes(searchQuery.toLowerCase()),
      )
    : COURSE_DAYS

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="px-1">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Browse course days and learning materials</SheetDescription>
              </SheetHeader>
              <div className="mt-6 px-1">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsOpen(false)}>
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Java Learning Path</span>
                </Link>
              </div>

              <div className="my-4 px-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Your Progress</h3>
                  <Badge variant="outline">
                    {completedDays}/{COURSE_DAYS.length} Days
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="relative px-1 mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search days..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="px-1">
                <h3 className="text-sm font-medium mb-2">Course Days</h3>
                <div className="space-y-1">
                  {filteredDays.map((day) => (
                    <Link
                      key={day.id}
                      href={day.path}
                      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                        pathname === day.path ? "bg-accent text-accent-foreground" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {day.completed ? (
                          <Badge variant="success" className="h-2 w-2 rounded-full p-0" />
                        ) : (
                          <Badge variant="outline" className="h-2 w-2 rounded-full p-0" />
                        )}
                        <span>
                          Day {day.id}: {day.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Code className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline-block">Java Learning Path</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Course Days</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                {COURSE_DAYS.map((day) => (
                  <DropdownMenuItem key={day.id} asChild>
                    <Link
                      href={day.path}
                      className={`flex items-center gap-2 cursor-pointer ${pathname === day.path ? "font-medium" : ""}`}
                    >
                      {day.completed ? (
                        <Badge variant="success" className="h-2 w-2 rounded-full p-0" />
                      ) : (
                        <Badge variant="outline" className="h-2 w-2 rounded-full p-0" />
                      )}
                      Day {day.id}: {day.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/resources">Resources</Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/about">About</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted && <>{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</>}
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/thanthtooaung-coding/java-learning-path" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>

            <Avatar className="h-8 w-8 hidden sm:flex">
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {currentDay && (
        <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t">
          <div className="flex items-center gap-2">
            <Badge variant={currentDay.completed ? "success" : "outline"} className="uppercase">
              {currentDay.completed ? "Completed" : "In Progress"}
            </Badge>
            <h2 className="text-sm font-medium">
              Day {currentDay.id}: {currentDay.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {currentDay.id > 1 && (
              <Button variant="ghost" size="sm" asChild>
                <Link href={COURSE_DAYS[currentDay.id - 2].path}>Previous</Link>
              </Button>
            )}

            {currentDay.id < COURSE_DAYS.length && (
              <Button variant="ghost" size="sm" asChild>
                <Link href={COURSE_DAYS[currentDay.id].path}>Next</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

