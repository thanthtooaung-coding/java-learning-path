"use client"

import JavaQuiz, { type QuizQuestion } from "../components/quiz/java-quiz"
import { HomeworkSection, type HomeworkTask } from "../components/homework/homework-section"
import { Separator } from "@/components/ui/separator"
import { uploadFile } from "@/lib/file-upload"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Code } from "lucide-react"

// Quiz data for Day Two
const javaVariablesQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is a primitive data type in Java?",
    options: [
      { id: "string", text: "String" },
      { id: "array", text: "Array" },
      { id: "class", text: "Class" },
      { id: "double", text: "double" },
    ],
    correctAnswer: "double",
    explanation:
      "In Java, primitive data types are the most basic data types. There are eight primitive data types: byte, short, int, long, float, double, char, and boolean. String, Array, and Class are reference types, not primitive types.",
  },
  {
    id: 2,
    question: "Which statement correctly declares and initializes an integer variable in Java?",
    options: [
      { id: "int x;", text: "int x;" },
      { id: "integer x = 10;", text: "integer x = 10;" },
      { id: "int x = 10;", text: "int x = 10;" },
      { id: "x = 10;", text: "x = 10;" },
    ],
    correctAnswer: "int x = 10;",
    explanation:
      "The correct way to declare and initialize an integer variable in Java is 'int x = 10;'. This statement declares a variable of type int named 'x' and assigns it the value 10.",
  },
  {
    id: 3,
    question: "Which class is used to read input from the user in Java?",
    options: [
      { id: "System", text: "System" },
      { id: "Scanner", text: "Scanner" },
      { id: "Input", text: "Input" },
      { id: "Reader", text: "Reader" },
    ],
    correctAnswer: "Scanner",
    explanation:
      "The Scanner class in Java is used to read input from various sources, including user input from the console. It's part of the java.util package and provides methods like nextInt(), nextDouble(), and nextLine() to read different types of input.",
  },
  {
    id: 4,
    question: "What is the result of the expression 5 / 2 in Java?",
    options: [
      { id: "2.5", text: "2.5" },
      { id: "2", text: "2" },
      { id: "2.0", text: "2.0" },
      { id: "error", text: "Compilation error" },
    ],
    correctAnswer: "2",
    explanation:
      "In Java, when both operands of the division operator (/) are integers, the result is an integer with the fractional part truncated. So 5 / 2 equals 2, not 2.5. To get a floating-point result, at least one operand must be a floating-point number, like 5.0 / 2 or 5 / 2.0.",
  },
  {
    id: 5,
    question: "Which operator is used for type casting in Java?",
    options: [
      { id: "->", text: "->" },
      { id: "=>", text: "=>" },
      { id: "()", text: "()" },
      { id: "::", text: "::" },
    ],
    correctAnswer: "()",
    explanation:
      "In Java, type casting is done using parentheses (). For example, to cast a double to an int, you would write: int x = (int) doubleValue;. This is known as explicit casting and is required when converting from a larger data type to a smaller one (which might result in data loss).",
  },
  {
    id: 6,
    question: "What is the value of x after the following code? int x = 10; x += 5;",
    options: [
      { id: "10", text: "10" },
      { id: "5", text: "5" },
      { id: "15", text: "15" },
      { id: "50", text: "50" },
    ],
    correctAnswer: "15",
    explanation:
      "The += operator adds the right operand to the left operand and assigns the result to the left operand. So x += 5 is equivalent to x = x + 5. Since x was initially 10, after x += 5, the value of x becomes 15.",
  },
  {
    id: 7,
    question: "Which of the following is NOT a valid variable name in Java?",
    options: [
      { id: "myVariable", text: "myVariable" },
      { id: "_value", text: "_value" },
      { id: "1stPlace", text: "1stPlace" },
      { id: "$amount", text: "$amount" },
    ],
    correctAnswer: "1stPlace",
    explanation:
      "In Java, variable names cannot start with a digit. Valid variable names must begin with a letter, dollar sign ($), or underscore (_). The variable name '1stPlace' is invalid because it starts with a digit.",
  },
  {
    id: 8,
    question: "What is the output of the following code? System.out.println(10 % 3);",
    options: [
      { id: "3", text: "3" },
      { id: "1", text: "1" },
      { id: "0", text: "0" },
      { id: "3.33", text: "3.33" },
    ],
    correctAnswer: "1",
    explanation:
      "The % operator in Java returns the remainder of a division operation. When 10 is divided by 3, the quotient is 3 and the remainder is 1. Therefore, 10 % 3 equals 1.",
  },
]

// Homework data for Day Two
const homeworkTasks: HomeworkTask[] = [
  {
    id: "hw-2-1",
    title: "Variable Declaration and Initialization",
    description:
      "Create a Java program that declares and initializes variables of different data types (int, double, boolean, char, String). Print each variable's value to the console.",
    type: "project",
    difficulty: "easy",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    points: 10,
    status: "not-started",
    codeTemplate: `public class VariableDeclaration {
    public static void main(String[] args) {
        // Declare and initialize an int variable
        
        // Declare and initialize a double variable
        
        // Declare and initialize a boolean variable
        
        // Declare and initialize a char variable
        
        // Declare and initialize a String variable
        
        // Print all variables
        
    }
}`,
    expectedOutput: `Integer value: 42
Double value: 3.14159
Boolean value: true
Character value: A
String value: Hello, Java!`,
    resources: [
      {
        title: "Java Variables",
        url: "https://www.w3schools.com/java/java_variables.asp",
      },
      {
        title: "Java Data Types",
        url: "https://www.w3schools.com/java/java_data_types.asp",
      },
    ],
  },
  {
    id: "hw-2-2",
    title: "User Input Calculator",
    description:
      "Create a simple calculator program that reads two numbers from the user and performs addition, subtraction, multiplication, and division operations on them. Display the results of all operations.",
    type: "project",
    difficulty: "medium",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    points: 15,
    status: "not-started",
    codeTemplate: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Prompt user for first number
        System.out.print("Enter first number: ");
        
        // Read first number
        
        // Prompt user for second number
        System.out.print("Enter second number: ");
        
        // Read second number
        
        // Calculate and display addition
        
        // Calculate and display subtraction
        
        // Calculate and display multiplication
        
        // Calculate and display division
        
        // Close the scanner
        scanner.close();
    }
}`,
    expectedOutput: `Enter first number: 10
Enter second number: 5
Addition: 10 + 5 = 15
Subtraction: 10 - 5 = 5
Multiplication: 10 * 5 = 50
Division: 10 / 5 = 2.0`,
    resources: [
      {
        title: "Java Scanner Class",
        url: "https://www.w3schools.com/java/java_user_input.asp",
      },
      {
        title: "Java Operators",
        url: "https://www.w3schools.com/java/java_operators.asp",
      },
    ],
  },
  {
    id: "hw-2-3",
    title: "Type Casting Exercise",
    description:
      "Create a Java program that demonstrates both implicit and explicit type casting. Show examples of widening (automatic) conversion and narrowing (manual) conversion between different data types.",
    type: "project",
    difficulty: "medium",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    points: 15,
    status: "not-started",
    codeTemplate: `public class TypeCasting {
    public static void main(String[] args) {
        // Implicit casting (widening conversion)
        // Example: int to double
        
        
        // Explicit casting (narrowing conversion)
        // Example: double to int
        
        
        // Demonstrate casting with calculations
        // Example: division with different data types
        
        
        // Demonstrate character casting
        // Example: char to int and int to char
        
        
    }
}`,
    resources: [
      {
        title: "Java Type Casting",
        url: "https://www.w3schools.com/java/java_type_casting.asp",
      },
      {
        title: "Java Data Types",
        url: "https://www.tpointtech.com/java-data-types",
      },
    ],
  },
  {
    id: "hw-2-4",
    title: "Operator Precedence",
    description:
      "Create a Java program that demonstrates operator precedence in Java. Show how different operators have different priorities and how parentheses can be used to change the order of operations.",
    type: "project",
    difficulty: "hard",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    points: 20,
    status: "not-started",
    codeTemplate: `public class OperatorPrecedence {
    public static void main(String[] args) {
        // Arithmetic operator precedence
        // Calculate: 10 + 5 * 2
        
        
        // Using parentheses to change precedence
        // Calculate: (10 + 5) * 2
        
        
        // Mixed operators
        // Calculate: 10 + 20 / 5 - 3 * 2
        
        
        // Logical operator precedence
        // Evaluate: true && false || true
        
        
        // Using parentheses with logical operators
        // Evaluate: true && (false || true)
        
        
    }
}`,
    resources: [
      {
        title: "Java Operator Precedence",
        url: "https://www.tutorialspoint.com/java/java_basic_operators.htm",
      },
      {
        title: "Java Operators",
        url: "https://www.tpointtech.com/java-operators",
      },
    ],
  },
]

export default function DayTwoClientPage() {
  const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (taskId: string, submission: any) => {
    console.log("Submission for task", taskId, submission);
    
    try {
      toast({
        title: "Homework submitted",
        description: "Your submission has been received successfully.",
      });
      
      // Update local state
      setTaskStatuses(prev => ({
        ...prev,
        [taskId]: "submitted"
      }));
    } catch (error) {
      console.error("Error submitting homework:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your homework. Please try again.",
        variant: "destructive"
      });
    }
  }

  const handleStatusChange = (taskId: string, status: string) => {
    console.log("Status changed for task", taskId, "to", status);
    
    // Update local state
    setTaskStatuses(prev => ({
      ...prev,
      [taskId]: status
    }));
  }

  // Update tasks with current status from state
  const updatedTasks = homeworkTasks.map(task => ({
    ...task,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: (taskStatuses[task.id] as any) || task.status
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Day Two: Variables, Data Types & Operators</h1>
          <p className="text-muted-foreground">
            Learn about variables, data types, reading user input, type casting, and operators in Java.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">01</span>
                Variables & Data Types
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn how to declare variables, understand primitive and reference data types, and store different kinds of data.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">02</span>
                User Input & Type Casting
              </h3>
              <p className="text-sm text-muted-foreground">
                Read input from users using the Scanner class and convert between different data types with type casting.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">03</span>
                Operators
              </h3>
              <p className="text-sm text-muted-foreground">
                Master arithmetic, assignment, comparison, logical, and bitwise operators to perform operations on variables.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Learning Materials</h2>
          
          <Tabs defaultValue="variables" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="variables">Variables & Data Types</TabsTrigger>
              <TabsTrigger value="input">User Input & Type Casting</TabsTrigger>
              <TabsTrigger value="operators">Operators</TabsTrigger>
            </TabsList>
            
            <TabsContent value="variables" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Variables in Java</h3>
                  <p className="mb-4">
                    Variables are containers for storing data values. In Java, there are different types of variables:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Primitive variables</strong> - store simple values</li>
                    <li><strong>Reference variables</strong> - store addresses of objects</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2">Variable Declaration Syntax:</h4>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                    <pre>dataType variableName = value;</pre>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">Example:</h4>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <pre>{`int age = 25;
double salary = 50000.50;
boolean isEmployed = true;
char grade = 'A';
String name = "John Doe";`}</pre>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Data Types in Java</h3>
                  
                  <h4 className="font-medium mt-4 mb-2">Primitive Data Types:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Data Type</th>
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Description</th>
                          <th className="py-2 px-4 text-left">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">byte</td>
                          <td className="py-2 px-4">1 byte</td>
                          <td className="py-2 px-4">Stores whole numbers from -128 to 127</td>
                          <td className="py-2 px-4 font-mono">byte b = 100;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">short</td>
                          <td className="py-2 px-4">2 bytes</td>
                          <td className="py-2 px-4">Stores whole numbers from -32,768 to 32,767</td>
                          <td className="py-2 px-4 font-mono">short s = 5000;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">int</td>
                          <td className="py-2 px-4">4 bytes</td>
                          <td className="py-2 px-4">Stores whole numbers from -2^31 to 2^31-1</td>
                          <td className="py-2 px-4 font-mono">int i = 100000;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">long</td>
                          <td className="py-2 px-4">8 bytes</td>
                          <td className="py-2 px-4">Stores whole numbers from -2^63 to 2^63-1</td>
                          <td className="py-2 px-4 font-mono">long l = 15000000000L;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">float</td>
                          <td className="py-2 px-4">4 bytes</td>
                          <td className="py-2 px-4">Stores fractional numbers with 6-7 decimal digits</td>
                          <td className="py-2 px-4 font-mono">float f = 5.75f;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">double</td>
                          <td className="py-2 px-4">8 bytes</td>
                          <td className="py-2 px-4">Stores fractional numbers with 15 decimal digits</td>
                          <td className="py-2 px-4 font-mono">double d = 19.99;</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">boolean</td>
                          <td className="py-2 px-4">1 bit</td>
                          <td className="py-2 px-4">Stores true or false values</td>
                          <td className="py-2 px-4 font-mono">boolean b = true;</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">char</td>
                          <td className="py-2 px-4">2 bytes</td>
                          <td className="py-2 px-4">Stores a single character/letter</td>
                          <td className="py-2 px-4 font-mono">{`char c = 'A';`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-medium mt-6 mb-2">Reference Data Types:</h4>
                  <p className="mb-4">
                    Reference types store references to objects. The most common reference type is:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>String</strong> - stores text, e.g., <code className="font-mono">{`String name = "John";`}</code></li>
                    <li><strong>Arrays</strong> - stores collections of values, e.g., <code className="font-mono">{`int[] numbers = {1, 2, 3};`}</code></li>
                    <li><strong>Classes</strong> - user-defined types, e.g., <code className="font-mono">Person person = new Person();</code></li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="input" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Reading User Input</h3>
                  <p className="mb-4">
                    Java provides the <code className="font-mono">Scanner</code> class to read input from various sources, including the keyboard.
                  </p>
                  
                  <h4 className="font-medium mt-4 mb-2">Using Scanner:</h4>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                    <pre>{`import java.util.Scanner;

public class UserInputExample {
    public static void main(String[] args) {
        // Create a Scanner object
        Scanner scanner = new Scanner(System.in);
        
        // Prompt for input
        System.out.print("Enter your name: ");
        
        // Read a string
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        
        // Read an integer
        int age = scanner.nextInt();
        
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
        
        // Close the scanner
        scanner.close();
    }
}`}</pre>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">Common Scanner Methods:</h4>
                  <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li><code className="font-mono">nextLine()</code> - reads a line of text</li>
                    <li><code className="font-mono">next()</code> - reads a word</li>
                    <li><code className="font-mono">nextInt()</code> - reads an integer</li>
                    <li><code className="font-mono">nextDouble()</code> - reads a double</li>
                    <li><code className="font-mono">nextBoolean()</code> - reads a boolean</li>
                  </ul>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-md mb-6">
                    <h4 className="font-medium mb-2">⚠️ Scanner Pitfall:</h4>
                    <p>
                      When using <code className="font-mono">nextInt()</code> or other numeric methods followed by <code className="font-mono">nextLine()</code>, 
                      you might need an extra <code className="font-mono">nextLine()</code> to consume the newline character.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Type Casting in Java</h3>
                  <p className="mb-4">
                    Type casting is the process of converting a variable from one data type to another.
                  </p>
                  
                  <h4 className="font-medium mt-4 mb-2">Widening Casting (Automatic/Implicit):</h4>
                  <p className="mb-2">
                    Converting a smaller type to a larger type size:
                  </p>
                  <p className="mb-4">
                    <code className="font-mono">byte</code> → <code className="font-mono">short</code> → <code className="font-mono">int</code> → <code className="font-mono">long</code> → <code className="font-mono">float</code> → <code className="font-mono">double</code>
                  </p>
                  
                  <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                    <pre>{`int myInt = 9;
double myDouble = myInt;  // Automatic casting: int to double

System.out.println(myInt);      // Outputs 9
System.out.println(myDouble);   // Outputs 9.0`}</pre>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">Narrowing Casting (Manual/Explicit):</h4>
                  <p className="mb-2">
                    Converting a larger type to a smaller size type:
                  </p>
                  <p className="mb-4">
                    <code className="font-mono">double</code> → <code className="font-mono">float</code> → <code className="font-mono">long</code> → <code className="font-mono">int</code> → <code className="font-mono">short</code> → <code className="font-mono">byte</code>
                  </p>
                  
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <pre>{`double myDouble = 9.78;
int myInt = (int) myDouble;  // Manual casting: double to int

System.out.println(myDouble);   // Outputs 9.78
System.out.println(myInt);      // Outputs 9 (decimal part is lost)`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="operators" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Operators in Java</h3>
                  <p className="mb-4">
                    Operators are used to perform operations on variables and values.
                  </p>
                  
                  <h4 className="font-medium mt-4 mb-2">1. Arithmetic Operators:</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Operator</th>
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">Example</th>
                          <th className="py-2 px-4 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">+</td>
                          <td className="py-2 px-4">Addition</td>
                          <td className="py-2 px-4 font-mono">5 + 3</td>
                          <td className="py-2 px-4">8</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">-</td>
                          <td className="py-2 px-4">Subtraction</td>
                          <td className="py-2 px-4 font-mono">5 - 3</td>
                          <td className="py-2 px-4">2</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">*</td>
                          <td className="py-2 px-4">Multiplication</td>
                          <td className="py-2 px-4 font-mono">5 * 3</td>
                          <td className="py-2 px-4">15</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">/</td>
                          <td className="py-2 px-4">Division</td>
                          <td className="py-2 px-4 font-mono">5 / 3</td>
                          <td className="py-2 px-4">1 (integer division)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">%</td>
                          <td className="py-2 px-4">Modulus (Remainder)</td>
                          <td className="py-2 px-4 font-mono">5 % 3</td>
                          <td className="py-2 px-4">2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">2. Assignment Operators:</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Operator</th>
                          <th className="py-2 px-4 text-left">Example</th>
                          <th className="py-2 px-4 text-left">Equivalent to</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">=</td>
                          <td className="py-2 px-4 font-mono">x = 5</td>
                          <td className="py-2 px-4">x = 5</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">+=</td>
                          <td className="py-2 px-4 font-mono">x += 3</td>
                          <td className="py-2 px-4">x = x + 3</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">-=</td>
                          <td className="py-2 px-4 font-mono">x -= 3</td>
                          <td className="py-2 px-4">x = x - 3</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">*=</td>
                          <td className="py-2 px-4 font-mono">x *= 3</td>
                          <td className="py-2 px-4">x = x * 3</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">/=</td>
                          <td className="py-2 px-4 font-mono">x /= 3</td>
                          <td className="py-2 px-4">x = x / 3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">3. Comparison Operators:</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Operator</th>
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">==</td>
                          <td className="py-2 px-4">Equal to</td>
                          <td className="py-2 px-4 font-mono">x == y</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">!=</td>
                          <td className="py-2 px-4">Not equal</td>
                          <td className="py-2 px-4 font-mono">x != y</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">{`>`}</td>
                          <td className="py-2 px-4">Greater than</td>
                          <td className="py-2 px-4 font-mono">{`x > y`}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">{`<`}</td>
                          <td className="py-2 px-4">Less than</td>
                          <td className="py-2 px-4 font-mono">{`x < y`}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">{`>=`}</td>
                          <td className="py-2 px-4">Greater than or equal to</td>
                          <td className="py-2 px-4 font-mono">{`x >= y`}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">{`<=`}</td>
                          <td className="py-2 px-4">Less than or equal to</td>
                          <td className="py-2 px-4 font-mono">{`x <= y`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">4. Logical Operators:</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Operator</th>
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">Description</th>
                          <th className="py-2 px-4 text-left">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">&&</td>
                          <td className="py-2 px-4">Logical and</td>
                          <td className="py-2 px-4">Returns true if both statements are true</td>
                          <td className="py-2 px-4 font-mono">{`x < 5 && x < 10`}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">||</td>
                          <td className="py-2 px-4">Logical or</td>
                          <td className="py-2 px-4">Returns true if one of the statements is true</td>
                          <td className="py-2 px-4 font-mono">{`x < 5 || x < 4`}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">!</td>
                          <td className="py-2 px-4">Logical not</td>
                          <td className="py-2 px-4">Reverse the result, returns false if the result is true</td>
                          <td className="py-2 px-4 font-mono">{`!(x < 5 && x < 10)`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">5. Increment and Decrement Operators:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Operator</th>
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">Description</th>
                          <th className="py-2 px-4 text-left">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-mono">++</td>
                          <td className="py-2 px-4">Increment</td>
                          <td className="py-2 px-4">Increases the value by 1</td>
                          <td className="py-2 px-4 font-mono">++x or x++</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono">--</td>
                          <td className="py-2 px-4">Decrement</td>
                          <td className="py-2 px-4">Decreases the value by 1</td>
                          <td className="py-2 px-4 font-mono">--x or x--</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-md mt-6">
                    <h4 className="font-medium mb-2">⚠️ Operator Precedence:</h4>
                    <p>
                      Java follows operator precedence rules to determine the order of operations. 
                      For example, multiplication has higher precedence than addition.
                      Use parentheses to control the order of evaluation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice Quiz</h2>
          <JavaQuiz
            title="Variables, Data Types & Operators - Practice Quiz"
            description="Test your knowledge of Java variables, data types, and operators • 30 min"
            questions={javaVariablesQuestions}
          />
        </div>

        {/* <Separator /> */}

        {/* <div className="space-y-6">
          <h2 className="text-2xl font-bold">Code Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                  <Code className="h-5 w-5" />
                  Variables and Data Types
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <pre>{`public class VariablesExample {
    public static void main(String[] args) {
        // Integer types
        byte byteVar = 100;
        short shortVar = 5000;
        int intVar = 100000;
        long longVar = 15000000000L;
        
        // Floating point types
        float floatVar = 5.75f;
        double doubleVar = 19.99;
        
        // Boolean type
        boolean boolVar = true;
        
        // Character type
        char charVar = 'A';
        
        // String (reference type)
        String stringVar = "Hello Java";
        
        // Printing all variables
        System.out.println("byte: " + byteVar);
        System.out.println("short: " + shortVar);
        System.out.println("int: " + intVar);
        System.out.println("long: " + longVar);
        System.out.println("float: " + floatVar);
        System.out.println("double: " + doubleVar);
        System.out.println("boolean: " + boolVar);
        System.out.println("char: " + charVar);
        System.out.println("String: " + stringVar);
    }
}`}</pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                  <Code className="h-5 w-5" />
                  User Input with Scanner
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <pre>{`import java.util.Scanner;

public class UserInputExample {
    public static void main(String[] args) {
        // Create Scanner object
        Scanner scanner = new Scanner(System.in);
        
        // Get user name
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        // Get user age
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        // Consume newline
        scanner.nextLine();
        
        // Get user's favorite programming language
        System.out.print("Enter your favorite programming language: ");
        String language = scanner.nextLine();
        
        // Display information
        System.out.println("\\nUser Information:");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Favorite Language: " + language);
        
        // Close scanner
        scanner.close();
    }
}`}</pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                  <Code className="h-5 w-5" />
                  Type Casting
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <pre>{`public class TypeCastingExample {
    public static void main(String[] args) {
        // Widening Casting (automatic)
        int myInt = 9;
        double myDouble = myInt;  // Automatic casting: int to double
        
        System.out.println("Widening Casting Example:");
        System.out.println("int value: " + myInt);
        System.out.println("double value: " + myDouble);
        
        // Narrowing Casting (manual)
        double anotherDouble = 9.78;
        int anotherInt = (int) anotherDouble;  // Manual casting: double to int
        
        System.out.println("\\nNarrowing Casting Example:");
        System.out.println("double value: " + anotherDouble);
        System.out.println("int value: " + anotherInt);
        
        // Character casting
        char ch = 'A';
        int ascii = ch;  // char to int (gets ASCII value)
        
        System.out.println("\\nCharacter Casting Example:");
        System.out.println("char: " + ch);
        System.out.println("ASCII value: " + ascii);
        
        // int to char
        int num = 66;
        char letter = (char) num;
        
        System.out.println("int value: " + num);
        System.out.println("char value: " + letter);
    }
}`}</pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                  <Code className="h-5 w-5" />
                  Operators
                </h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  <pre>{`public class OperatorsExample {
    public static void main(String[] args) {
        // Variables
        int a = 10;
        int b = 5;
        boolean x = true;
        boolean y = false;
        
        // Arithmetic operators
        System.out.println("Arithmetic Operators:");
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));
        
        // Assignment operators
        System.out.println("\\nAssignment Operators:");
        int c = a;
        System.out.println("c = a: " + c);
        c += b;  // c = c + b
        System.out.println("c += b: " + c);
        c -= b;  // c = c - b
        System.out.println("c -= b: " + c);
        
        // Comparison operators
        System.out.println("\\nComparison Operators:");
        System.out.println("a == b: " + (a == b));
        System.out.println("a != b: " + (a != b));
        System.out.println("a > b: " + (a > b));
        System.out.println("a < b: " + (a < b));
        
        // Logical operators
        System.out.println("\\nLogical Operators:");
        System.out.println("x && y: " + (x && y));
        System.out.println("x || y: " + (x || y));
        System.out.println("!x: " + (!x));
        
        // Increment/decrement operators
        System.out.println("\\nIncrement/Decrement Operators:");
        int d = 5;
        System.out.println("d: " + d);
        System.out.println("++d: " + (++d));  // Pre-increment
        System.out.println("d: " + d);
        System.out.println("d++: " + (d++));  // Post-increment
        System.out.println("d: " + d);
    }
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}

        <Separator />

        <HomeworkSection
          title="Homework Assignments"
          description="Complete these assignments to reinforce your understanding of variables, data types, and operators"
          tasks={updatedTasks}
          onSubmit={handleSubmit}
          onStatusChange={handleStatusChange}
          onFileUpload={uploadFile}
        />
      </div>
    </div>
  )
}
