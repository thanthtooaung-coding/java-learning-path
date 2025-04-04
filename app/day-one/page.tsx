import JavaQuiz, { QuizQuestion } from "../components/quiz/java-quiz"


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

export default function DayOnePage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Day One: Java Basics</h1>
          <p className="text-muted-foreground">
            Test your knowledge of Java fundamentals with this interactive quiz. Learn about the key features of Java
            and how it differs from other programming languages like C++.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">01</span>
                Platform Independent
              </h3>
              <p className="text-sm text-muted-foreground">
                Java&apos;s &quot;write once, run anywhere&quot; philosophy allows code to run on any device with a JVM installed,
                making it highly portable across different platforms.
              </p>
            </div>

            <div className="p-4 rounded-lg border text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">02</span>
                Object-Oriented
              </h3>
              <p className="text-sm text-muted-foreground">
                Java is built around objects and classes, supporting encapsulation, inheritance, and polymorphism while
                simplifying memory management.
              </p>
            </div>

            <div className="p-4 rounded-lg border text-card-foreground shadow-sm">
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

        <JavaQuiz
          title="Java Basics - Practice Quiz"
          description="Practice Assignment • 30 min"
          questions={javaBasicsQuestions}
        />
      </div>
    </div>
  )
}

