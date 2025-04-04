import type { Metadata } from "next"
import {
  BookOpen,
  Video,
  Code,
  FileText,
  ExternalLink,
  Star,
  Clock,
  Filter,
  Search,
  ChevronDown,
  Bookmark,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Resources | Java Learning Path",
  description: "Curated resources to help you master Java programming",
}

// Resource types
type ResourceType = "documentation" | "tutorial" | "book" | "video" | "tool" | "article"

// Difficulty levels
type DifficultyLevel = "beginner" | "intermediate" | "advanced"

// Resource interface
interface Resource {
  id: string
  title: string
  description: string
  url: string
  type: ResourceType
  difficulty: DifficultyLevel
  author?: string
  duration?: string
  isFree: boolean
  isOfficial: boolean
  tags: string[]
  rating: number
  isSaved?: boolean
  isCompleted?: boolean
}

// Sample resources data
const resources: Resource[] = [
  {
    id: "1",
    title: "Java Documentation",
    description:
      "Official Java SE documentation from Oracle, covering language specifications, APIs, and best practices.",
    url: "https://docs.oracle.com/en/java/",
    type: "documentation",
    difficulty: "intermediate",
    author: "Oracle",
    isFree: true,
    isOfficial: true,
    tags: ["reference", "api", "official"],
    rating: 5,
    isSaved: true,
  },
  {
    id: "2",
    title: "Java Tutorial for Beginners",
    description: "A comprehensive tutorial covering Java basics, syntax, and object-oriented programming concepts.",
    url: "https://www.w3schools.com/java/",
    type: "tutorial",
    difficulty: "beginner",
    author: "W3Schools",
    duration: "10 hours",
    isFree: true,
    isOfficial: false,
    tags: ["beginners", "syntax", "oop"],
    rating: 4,
    isCompleted: true,
  },
  {
    id: "3",
    title: "Effective Java",
    description:
      "A must-read book for Java developers, offering best practices and design patterns for writing better code.",
    url: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/",
    type: "book",
    difficulty: "advanced",
    author: "Joshua Bloch",
    isFree: false,
    isOfficial: false,
    tags: ["best practices", "design patterns", "advanced"],
    rating: 5,
    isSaved: true,
  },
  {
    id: "4",
    title: "Java Programming Masterclass",
    description:
      "Comprehensive video course covering Java from basics to advanced topics including concurrency and design patterns.",
    url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
    type: "video",
    difficulty: "intermediate",
    author: "Tim Buchalka",
    duration: "80 hours",
    isFree: false,
    isOfficial: false,
    tags: ["comprehensive", "practical", "projects"],
    rating: 4.5,
  },
  {
    id: "5",
    title: "IntelliJ IDEA",
    description:
      "Powerful IDE for Java development with advanced code analysis, refactoring tools, and debugging capabilities.",
    url: "https://www.jetbrains.com/idea/",
    type: "tool",
    difficulty: "intermediate",
    author: "JetBrains",
    isFree: false,
    isOfficial: false,
    tags: ["ide", "productivity", "development"],
    rating: 5,
  },
  {
    id: "6",
    title: "Java Collections Framework Tutorial",
    description: "In-depth guide to Java's Collections Framework, covering Lists, Sets, Maps, and algorithms.",
    url: "https://www.baeldung.com/java-collections",
    type: "article",
    difficulty: "intermediate",
    author: "Baeldung",
    duration: "45 min",
    isFree: true,
    isOfficial: false,
    tags: ["collections", "data structures", "algorithms"],
    rating: 4,
    isCompleted: true,
  },
  {
    id: "7",
    title: "Java Concurrency in Practice",
    description: "Essential book for understanding multithreading and concurrency in Java applications.",
    url: "https://jcip.net/",
    type: "book",
    difficulty: "advanced",
    author: "Brian Goetz",
    isFree: false,
    isOfficial: false,
    tags: ["concurrency", "multithreading", "performance"],
    rating: 5,
  },
  {
    id: "8",
    title: "Spring Framework Documentation",
    description: "Official documentation for the Spring Framework, covering core, web, data access, and more.",
    url: "https://docs.spring.io/spring-framework/docs/current/reference/html/",
    type: "documentation",
    difficulty: "intermediate",
    author: "Spring",
    isFree: true,
    isOfficial: true,
    tags: ["spring", "framework", "enterprise"],
    rating: 4.5,
  },
  {
    id: "9",
    title: "Java Design Patterns",
    description: "Implementation and explanation of all the design patterns in Java with real-world examples.",
    url: "https://java-design-patterns.com/",
    type: "tutorial",
    difficulty: "advanced",
    author: "Ilkka Seppälä",
    isFree: true,
    isOfficial: false,
    tags: ["design patterns", "architecture", "best practices"],
    rating: 4.5,
    isSaved: true,
  },
  {
    id: "10",
    title: "Java Performance: The Definitive Guide",
    description: "Comprehensive guide to optimizing Java applications for performance and scalability.",
    url: "https://www.oreilly.com/library/view/java-performance-the/9781449363512/",
    type: "book",
    difficulty: "advanced",
    author: "Scott Oaks",
    isFree: false,
    isOfficial: false,
    tags: ["performance", "optimization", "tuning"],
    rating: 4.5,
  },
  {
    id: "11",
    title: "Java Streams API Tutorial",
    description: "Learn how to use Java Streams API for functional-style operations on collections.",
    url: "https://www.baeldung.com/java-streams",
    type: "article",
    difficulty: "intermediate",
    author: "Baeldung",
    duration: "30 min",
    isFree: true,
    isOfficial: false,
    tags: ["streams", "functional", "lambda"],
    rating: 4,
  },
  {
    id: "12",
    title: "Maven Tutorial",
    description: "Learn how to use Maven for building and managing Java projects.",
    url: "https://maven.apache.org/guides/getting-started/",
    type: "tutorial",
    difficulty: "beginner",
    author: "Apache",
    duration: "2 hours",
    isFree: true,
    isOfficial: true,
    tags: ["build tools", "dependency management", "project management"],
    rating: 4,
  },
]

// Helper function to get icon for resource type
function getResourceTypeIcon(type: ResourceType) {
  switch (type) {
    case "documentation":
      return <FileText className="h-4 w-4" />
    case "tutorial":
      return <BookOpen className="h-4 w-4" />
    case "book":
      return <BookOpen className="h-4 w-4" />
    case "video":
      return <Video className="h-4 w-4" />
    case "tool":
      return <Code className="h-4 w-4" />
    case "article":
      return <FileText className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function to get color for difficulty level
function getDifficultyColor(level: DifficultyLevel) {
  switch (level) {
    case "beginner":
      return "bg-green-500 hover:bg-green-600"
    case "intermediate":
      return "bg-blue-500 hover:bg-blue-600"
    case "advanced":
      return "bg-purple-500 hover:bg-purple-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-muted-foreground">
            Curated collection of the best Java learning resources to help you master programming.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-9" />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>All Resources</DropdownMenuItem>
                <DropdownMenuItem>Free Resources</DropdownMenuItem>
                <DropdownMenuItem>Official Resources</DropdownMenuItem>
                <DropdownMenuItem>Saved Resources</DropdownMenuItem>
                <DropdownMenuItem>Completed Resources</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span>Difficulty</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Levels</DropdownMenuItem>
                <DropdownMenuItem>Beginner</DropdownMenuItem>
                <DropdownMenuItem>Intermediate</DropdownMenuItem>
                <DropdownMenuItem>Advanced</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 lg:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="documentation">Docs</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
            <TabsTrigger value="book">Books</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="tool">Tools</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {["documentation", "tutorial", "book", "video", "tool", "article"].map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources
                  .filter((resource) => resource.type === type)
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Recommended Learning Paths</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Java Fundamentals</CardTitle>
                <CardDescription>Master the core concepts of Java programming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Java Syntax and Basics</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn variables, data types, control flow, and basic OOP concepts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Object-Oriented Programming</h3>
                      <p className="text-sm text-muted-foreground">
                        Master classes, inheritance, polymorphism, and encapsulation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Collections and Generics</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn to use Java&apos;s built-in data structures and type safety features
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {/* <Button className="w-full" onClick={redirectHomePage}>Start Learning Path</Button> */}
                <Button className="w-full">
                    <a href={"/"} rel="noopener noreferrer">Start Learning Path</a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Java Development</CardTitle>
                <CardDescription>Take your Java skills to the next level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Concurrency and Multithreading</h3>
                      <p className="text-sm text-muted-foreground">Learn to write efficient concurrent applications</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Design Patterns</h3>
                      <p className="text-sm text-muted-foreground">
                        Master common design patterns and when to apply them
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Performance Optimization</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn techniques to optimize Java applications for speed and efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                    <a href={"/"} rel="noopener noreferrer">Start Learning Path</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getResourceTypeIcon(resource.type)}
            <Badge variant="outline" className="capitalize">
              {resource.type}
            </Badge>
            {resource.isFree && <Badge className="bg-green-500 hover:bg-green-600">Free</Badge>}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {resource.isSaved ? <Bookmark className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </div>
        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {resource.author && (
            <div className="flex items-center gap-1">
              <span>By {resource.author}</span>
            </div>
          )}

          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{resource.duration}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(resource.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : i < resource.rating
                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                    : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm ml-1">{resource.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Badge className={`${getDifficultyColor(resource.difficulty)} capitalize`}>{resource.difficulty}</Badge>

        <div className="flex items-center gap-2">
          {resource.isCompleted && (
            <Badge variant="outline" className="gap-1 border-green-500 text-green-500">
              <CheckCircle2 className="h-3 w-3" />
              <span>Completed</span>
            </Badge>
          )}

          <Button asChild size="sm">
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <span>View</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
