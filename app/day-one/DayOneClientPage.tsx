"use client"

import JavaQuiz, { type QuizQuestion } from "../components/quiz/java-quiz"
import { HomeworkSection, type HomeworkTask } from "../components/homework/homework-section"
import { Separator } from "@/components/ui/separator"
import { uploadFile } from "@/lib/file-upload"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

// Quiz data for Day One
const javaBasicsQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which of the following is a feature of Java?",
      options: [
        { id: "compiled", text: "Compiled language" },
        { id: "static", text: "Static typing" },
        { id: "dynamic", text: "Dynamic memory allocation" },
        { id: "garbage", text: "Garbage collection" },
      ],
      correctAnswer: "garbage",
      explanation:
        "While Java is a compiled language with static typing and does use dynamic memory allocation, garbage collection is one of its most distinctive features. Java automatically reclaims memory occupied by unreferenced objects, eliminating the need for manual memory management.",
    },
    {
      id: 2,
      question: "Which of the following is a difference between C++ and Java?",
      options: [
        { id: "memory", text: "Memory management" },
        { id: "syntax", text: "Syntax" },
        { id: "platform", text: "Platform independence" },
        { id: "oop", text: "Object-oriented programming (OOP) features" },
      ],
      correctAnswer: "platform",
      explanation:
        "While C++ and Java differ in several ways, platform independence is a key distinguishing feature of Java. Java's 'write once, run anywhere' philosophy is implemented through its bytecode and JVM architecture, allowing Java programs to run on any device with a JVM installed.",
    },
    {
      id: 3,
      question: "Which of the following is a feature of Java?",
      options: [
        { id: "multiple", text: "Multiple inheritance" },
        { id: "operator", text: "Operator overloading" },
        { id: "templates", text: "Templates" },
        { id: "exception", text: "Exception handling" },
      ],
      correctAnswer: "exception",
      explanation:
        "Java supports exception handling through try-catch blocks. Unlike C++, Java does not support multiple inheritance of classes (though it does allow multiple interface implementation), operator overloading, or templates (it uses generics instead).",
    },
    {
      id: 4,
      question: "Which of the following is a difference between C++ and Java?",
      options: [
        { id: "syntax", text: "Syntax" },
        { id: "portability", text: "Portability" },
        { id: "oop", text: "Object-oriented programming (OOP) features" },
        { id: "all", text: "All of the above" },
      ],
      correctAnswer: "all",
      explanation:
        "C++ and Java differ in syntax (Java is simpler and more consistent), portability (Java is more portable due to its bytecode architecture), and OOP features (Java has no multiple inheritance of classes, no operator overloading, and uses interfaces instead of multiple inheritance).",
    },
    {
      id: 5,
      question: "Which of the following is a feature of Java?",
      options: [
        { id: "pointers", text: "Pointers" },
        { id: "multiple", text: "Multiple inheritance" },
        { id: "operator", text: "Operator overloading" },
        { id: "bytecode", text: "Bytecode compilation and interpretation" },
      ],
      correctAnswer: "bytecode",
      explanation:
        "Java uses bytecode compilation and interpretation. Java source code is compiled into bytecode, which is then interpreted by the Java Virtual Machine (JVM). Java does not support direct pointer manipulation, multiple inheritance of classes, or operator overloading.",
    },
    {
      id: 6,
      question: "Which of the following statements about public static void main(String[] args) in Java is true?",
      options: [
        { id: "correct-answer-for-6", text: "It is the entry point of a Java program where execution starts." },
        { id: "wrong-answer-6.1", text: "The main method can only be defined as private." },
        { id: "wrong-answer-6.2", text: "main must always return an integer value." },
        { id: "wrong-answer-6.3", text: "The args parameter is mandatory and cannot be empty." },
      ],
      correctAnswer: "correct-answer-for-6",
      explanation:
        "The main method is the entry point of every Java program. public → It must be accessible to the JVM. static → It can be called without creating an object. void → It does not return any value. String[] args → It allows command-line arguments but can be empty.",
    },
    {
      id: 7,
      question: "Which of the following is the correct way to create an object for a class named Car?",
      options: [      
        { id: "wrong-answer-7.1", text: "Car myCar = Car();" },
        { id: "wrong-answer-7.2", text: "Car myCar = new Car;" },
        { id: "correct-answer-for-7", text: "Car myCar = new Car();" },
        { id: "wrong-answer-7.3", text: "Car myCar -> new Car();" },
      ],
      correctAnswer: "correct-answer-for-7",
      explanation:
        "In Java, objects are created using the new keyword followed by the constructor, so Car myCar = new Car(); is the correct syntax.",
    },
    {
      id: 8,
      question: "Which of the following is the correct way to call a method named startEngine() from a Car object named myCar?",
      options: [      
        { id: "wrong-answer-8.1", text: "myCar-startEngine();" },
        { id: "correct-answer-for-8", text: "myCar.startEngine();" },
        { id: "wrong-answer-8.2", text: "myCar.methodName{};" },
        { id: "wrong-answer-8.3", text: "myCar.methodName" },
      ],
      correctAnswer: "correct-answer-for-8",
      explanation:
        "In Java, methods are called using dot notation (objectName.methodName();). The () is required for method calls.",
    },
    {
      id: 9,
      question: "Which of the following follows Java's naming conventions for a method name?",
      options: [      
        { id: "wrong-answer-9.1", text: "myFunction" },
        { id: "wrong-answer-9.2", text: "my_function" },      
        { id: "wrong-answer-9.3", text: "MYFUNCTION" },
        { id: "correct-answer-for-9", text: "myfunction" },
      ],
      correctAnswer: "correct-answer-for-9",
      explanation:
        "Java uses camelCase for method names, meaning the first word is lowercase and subsequent words start with uppercase (myFunction).",
    },
    {
      id: 10,
      question: "How to declare a number in Java?",
      options: [      
        { id: "wrong-answer-10.1", text: "int myNumber = ''1'';" },
        { id: "wrong-answer-10.2", text: "long myNumber = a;" },      
        { id: "wrong-answer-10.3", text: "float myNumber = true;" },
        { id: "correct-answer-for-10", text: "int myNumber = 1;" },
      ],
      correctAnswer: "correct-answer-for-10",
      explanation:
        "In Java, numbers are declared without quotes. The correct syntax is int myNumber = 1; where 1 is an integer value.",
    },
]

// Homework data for Day One
const homeworkTasks: HomeworkTask[] = [
  {
    id: "hw-1-1",
    title: "Hello World Program",
    description:
      "Write a Java program that prints 'Hello, World!' to the console. This is the traditional first program for learning any programming language.",
    type: "project",
    difficulty: "easy",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), // Due in 3 days
    points: 10,
    status: "not-started",
    codeTemplate: `public class HelloWorld {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    expectedOutput: "Hello, World!",
    resources: [
      {
        title: "Java Hello World Tutorial",
        url: "https://www.w3schools.com/java/java_getstarted.asp",
      },
      {
        title: "Java Basic Syntax",
        url: "https://www.tutorialspoint.com/java/java_basic_syntax.htm",
      },
    ],
  },
  {
    id: "hw-1-2",
    title: "Variable Declaration and Data Types",
    description:
      "Create a Java program that declares variables of different data types (int, double, boolean, String) and prints their values. Demonstrate understanding of primitive and reference types in Java.",
    type: "project",
    difficulty: "easy",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), // Due in 3 days
    points: 15,
    status: "not-started",
    codeTemplate: `public class DataTypes {
    public static void main(String[] args) {
        // Declare variables of different data types
        // int variable
        
        // double variable
        
        // boolean variable
        
        // String variable
        
        // Print all variables
    }
}`,
    resources: [
      {
        title: "Java Data Types",
        url: "https://www.w3schools.com/java/java_data_types.asp",
      },
      {
        title: "Java Variables",
        url: "https://www.w3schools.com/java/java_variables.asp",
      },
    ],
  },
  {
    id: "hw-1-3",
    title: "Calling Methods from Another Class",
    description:
      "Create a Java class named `Person` with a method `displayName(String name)` that prints the name. Then create another class with a `main` method and call the `displayName` method from a `Person` object. This helps practice method calling and object creation.",
    type: "project",
    difficulty: "easy",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), // Due in 3 days
    points: 20,
    status: "not-started",
    codeTemplate: `class Person {
      void displayName(String name) {
          // Print the name in a readable sentence
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            // Create a Person object and call displayName
        }
    }`,
    expectedOutput: "My name is [YourName]",
    resources: [
      {
        title: "Java Methods",
        url: "https://www.w3schools.com/java/java_methods.asp",
      },
      {
        title: "Java Classes and Objects",
        url: "https://www.w3schools.com/java/java_classes.asp",
      },
    ],
  },
  {
    id: "hw-1-4",
    title: "Java Features Essay",
    description:
      "Write a short essay (250-300 words) explaining the key features of Java that make it different from other programming languages. Focus on platform independence, object-oriented nature, and automatic memory management.",
    type: "project",
    difficulty: "medium",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)), // Due in 5 days
    points: 20,
    status: "not-started",
    resources: [
      {
        title: "Features of Java",
        url: "https://www.javatpoint.com/features-of-java",
      },
      {
        title: "Java vs C++",
        url: "https://www.geeksforgeeks.org/similarities-and-difference-between-java-and-c/",
      },
    ],
  },
]


export default function DayOneClientPage() {
    const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({})
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (taskId: string, submission: any) => {
        console.log("Submission for task", taskId, submission)
    
        try {
        // In a real app, you would send this to your backend
        // For example:
        // await fetch('/api/homework/submit', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ taskId, submission })
        // });
    
        toast({
            title: "Homework submitted",
            description: "Your submission has been received successfully.",
        })
    
        // Update local state
        setTaskStatuses((prev) => ({
            ...prev,
            [taskId]: "submitted",
        }))
        } catch (error) {
        console.error("Error submitting homework:", error)
        toast({
            title: "Submission failed",
            description: "There was an error submitting your homework. Please try again.",
            variant: "destructive",
        })
        }
    }
    
    const handleStatusChange = (taskId: string, status: string) => {
        console.log("Status changed for task", taskId, "to", status)
    
        // Update local state
        setTaskStatuses((prev) => ({
        ...prev,
        [taskId]: status,
        }))
    
        // In a real app, you would update the status in your backend
    }
    
    // Update tasks with current status from state
    const updatedTasks = homeworkTasks.map((task) => ({
        ...task,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: (taskStatuses[task.id] as any) || task.status,
    }))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Day One: Java Basics</h1>
          <p className="text-muted-foreground">
            Learn the fundamentals of Java programming language, including its key features, syntax, and how it differs
            from other programming languages like C++.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">01</span>
                Platform Independent
              </h3>
              <p className="text-sm text-muted-foreground">
                Java&apos;s &quot;write once, run anywhere&quot; philosophy allows code to run on any device with a JVM installed,
                making it highly portable across different platforms.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">02</span>
                Object-Oriented
              </h3>
              <p className="text-sm text-muted-foreground">
                Java is built around objects and classes, supporting encapsulation, inheritance, and polymorphism while
                simplifying memory management.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">03</span>
                Automatic Memory Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Java&apos;s garbage collection automatically handles memory allocation and deallocation, reducing memory
                leaks and simplifying development.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice Quiz</h2>
          <JavaQuiz
            title="Java Basics - Practice Quiz"
            description="Test your knowledge of Java fundamentals • 30 min"
            questions={javaBasicsQuestions}
          />
        </div>

        <Separator />

        <HomeworkSection
          title="Homework Assignments"
          description="Complete these assignments to reinforce your understanding of Java basics"
          tasks={updatedTasks}
          onSubmit={handleSubmit}
          onStatusChange={handleStatusChange}
          onFileUpload={uploadFile}
        />
      </div>
    </div>
  )
}
