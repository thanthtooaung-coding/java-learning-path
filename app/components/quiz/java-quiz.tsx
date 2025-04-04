"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Award, RotateCcw, Save, Share2, HelpCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface QuizQuestion {
  id: number
  question: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
  explanation?: string
}

interface JavaQuizProps {
  title: string
  description: string
  questions: QuizQuestion[]
}

export default function JavaQuiz({ title, description, questions }: JavaQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({})

  // Timer
  useEffect(() => {
    if (submitted) return

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [submitted])

  const handleAnswerChange = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = () => {
    let newScore = 0

    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        newScore++
      }
    })

    setScore(newScore)
    setSubmitted(true)
  }

  const isAnswerCorrect = (questionId: number, optionId: string) => {
    if (!submitted) return false
    const question = questions.find((q) => q.id === questionId)
    return question?.correctAnswer === optionId
  }

  const isAnswerWrong = (questionId: number, optionId: string) => {
    if (!submitted) return false
    return selectedAnswers[questionId] === optionId && !isAnswerCorrect(questionId, optionId)
  }

  const resetQuiz = () => {
    setSubmitted(false)
    setScore(0)
    setSelectedAnswers({})
    setTimeSpent(0)
    setCurrentQuestionIndex(0)
    setShowExplanation({})
  }

  const toggleExplanation = (questionId: number) => {
    setShowExplanation((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const allQuestionsAnswered = questions.every((q) => selectedAnswers[q.id])
  const answeredCount = Object.keys(selectedAnswers).length
  const progressPercentage = (answeredCount / questions.length) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-3xl mx-auto shadow-md">
        <CardHeader className="border-b bg-muted/40">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(timeSpent)}
              </Badge>
              {submitted && (
                <Badge
                  variant={score >= questions.length / 2 ? "success" : "destructive"}
                  className="flex items-center gap-1"
                >
                  <Award className="h-3 w-3" />
                  {score}/{questions.length}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>
                {answeredCount}/{questions.length} questions answered
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={currentQuestionIndex === index ? "default" : "outline"}
                size="sm"
                className={cn(
                  "w-8 h-8 p-0",
                  submitted &&
                    selectedAnswers[q.id] === q.correctAnswer &&
                    "bg-green-500 hover:bg-green-600 border-green-500",
                  submitted &&
                    selectedAnswers[q.id] !== q.correctAnswer &&
                    selectedAnswers[q.id] &&
                    "bg-red-500 hover:bg-red-600 border-red-500",
                  !submitted && selectedAnswers[q.id] && "border-primary",
                )}
                onClick={() => navigateToQuestion(index)}
              >
                {q.id}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-8">
          <div className="space-y-6 relative">
            <div className="flex items-start">
              <span className="font-medium mr-2 flex-shrink-0">{currentQuestion.id}.</span>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <span className="pr-16">{currentQuestion.question}</span>
                  <span className="text-muted-foreground text-sm ml-2 flex-shrink-0">1 point</span>
                </div>
              </div>
            </div>

            <RadioGroup
              value={selectedAnswers[currentQuestion.id]}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3"
              disabled={submitted}
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-2 rounded-md border p-3 transition-colors ${
                    isAnswerCorrect(currentQuestion.id, option.id)
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                      : isAnswerWrong(currentQuestion.id, option.id)
                        ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900"
                        : ""
                  }`}
                >
                  <RadioGroupItem value={option.id} id={`q${currentQuestion.id}-${option.id}`} />
                  <Label htmlFor={`q${currentQuestion.id}-${option.id}`} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                  {submitted && isAnswerCorrect(currentQuestion.id, option.id) && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {submitted && isAnswerWrong(currentQuestion.id, option.id) && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>

            {submitted && currentQuestion.explanation && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleExplanation(currentQuestion.id)}
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  {showExplanation[currentQuestion.id] ? "Hide Explanation" : "Show Explanation"}
                </Button>

                {showExplanation[currentQuestion.id] && (
                  <div className="mt-2 p-4 rounded-md bg-muted">
                    <h4 className="font-medium mb-1">Explanation:</h4>
                    <p className="text-sm">{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t p-6 flex flex-wrap gap-4 items-center justify-between bg-muted/40">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {submitted ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share your results</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>

                <div className="text-xl font-medium text-green-600 dark:text-green-400">
                  Score: {score}/{questions.length}
                </div>
              </>
            ) : (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save progress</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button onClick={handleSubmit} disabled={!allQuestionsAnswered} className="min-w-[100px]">
                  Submit
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>

      {submitted && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Quiz Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Your Score</p>
                  <div className="text-2xl font-bold">
                    {score}/{questions.length}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Time Spent</p>
                  <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Performance</p>
                  <div className="text-2xl font-bold">
                    {score === questions.length
                      ? "Excellent!"
                      : score >= questions.length * 0.8
                        ? "Great!"
                        : score >= questions.length * 0.6
                          ? "Good"
                          : score >= questions.length * 0.4
                            ? "Fair"
                            : "Needs Improvement"}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Question Summary</h3>
                <div className="space-y-2">
                  {questions.map((question) => {
                    const isCorrect = selectedAnswers[question.id] === question.correctAnswer
                    return (
                      <div
                        key={question.id}
                        className={`p-3 rounded-md border ${
                          isCorrect
                            ? "border-green-200 bg-green-50 dark:bg-green-900/10"
                            : "border-red-200 bg-red-50 dark:bg-red-900/10"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`mt-0.5 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                            {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">
                              Question {question.id}: {question.question}
                            </p>
                            <p className="text-sm mt-1">
                              <span className="text-muted-foreground">Your answer: </span>
                              {question.options.find((o) => o.id === selectedAnswers[question.id])?.text ||
                                "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm mt-1">
                                <span className="text-muted-foreground">Correct answer: </span>
                                {question.options.find((o) => o.id === question.correctAnswer)?.text}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

