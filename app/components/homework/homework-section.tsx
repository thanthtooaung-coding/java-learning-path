"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent, JSX } from "react"
import {
  Calendar,
  Clock,
  Code,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Paperclip,
  Send,
  File,
  X,
  Loader2
} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"

export type HomeworkType = "coding" | "written" | "project" | "quiz"
export type DifficultyLevel = "easy" | "medium" | "hard"
export type SubmissionStatus = "not-started" | "in-progress" | "submitted" | "completed" | "late"

export interface UploadedFile {
  name: string
  size: number
  type: string
  url?: string
  file?: File
  uploading?: boolean
  error?: string
}

export interface HomeworkTask {
  id: string
  title: string
  description: string
  type: HomeworkType
  difficulty: DifficultyLevel
  dueDate: Date
  points: number
  status: SubmissionStatus
  resources?: {
    title: string
    url: string
  }[]
  codeTemplate?: string
  expectedOutput?: string
  attachments?: {
    name: string
    url: string
  }[]
}

export interface HomeworkSectionProps {
  title: string
  description: string
  tasks: HomeworkTask[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (taskId: string, submission: any) => void
  onStatusChange?: (taskId: string, status: SubmissionStatus) => void
  onFileUpload?: (file: File) => Promise<{ url: string }>
}

export function HomeworkSection({ title, description, tasks, onSubmit, onStatusChange, onFileUpload }: HomeworkSectionProps) {
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [submissions, setSubmissions] = useState<Record<string, any>>({})
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const toggleTask = (taskId: string) => {
    setOpenTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const handleSubmission = (taskId: string) => {
    const files = uploadedFiles[taskId] || []
    const fileUrls = files
      .filter((file) => file.url) // Only include files that have been uploaded
      .map((file) => ({
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size,
      }))

    const submissionData = {
      ...submissions[taskId],
      files: fileUrls,
    }

    if (onSubmit) {
      onSubmit(taskId, submissionData)
    }

    // Update status to submitted
    if (onStatusChange) {
      onStatusChange(taskId, "submitted")
    }
  }

  const handleStatusChange = (taskId: string, status: SubmissionStatus) => {
    if (onStatusChange) {
      onStatusChange(taskId, status)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSubmission = (taskId: string, data: any) => {
    setSubmissions((prev) => ({
      ...prev,
      [taskId]: data,
    }))
  }

  const setTaskTab = (taskId: string, tab: string) => {
    setActiveTab((prev) => ({
      ...prev,
      [taskId]: tab,
    }))
  }

  const handleFileSelect = (taskId: string) => {
    setCurrentTaskId(taskId)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentTaskId) return

    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: UploadedFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`File ${file.name} exceeds the 10MB size limit`)
        continue
      }

      // Check file type
      const allowedTypes = [
        "text/x-java",
        "application/java-archive",
        "application/zip",
        "application/x-zip-compressed",
        "application/pdf",
        "text/plain",
      ]

      // For Java files, the MIME type might not be correctly detected
      const isJavaFile = file.name.endsWith(".java")

      if (!allowedTypes.includes(file.type) && !isJavaFile) {
        setUploadError(
          `File ${file.name} is not a supported file type. Please upload Java files, ZIP archives, or PDFs.`,
        )
        continue
      }

      newFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        uploading: true,
      })
    }

    if (newFiles.length === 0) return

    // Add the new files to the state
    setUploadedFiles((prev) => ({
      ...prev,
      [currentTaskId]: [...(prev[currentTaskId] || []), ...newFiles],
    }))

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // Upload the files if onFileUpload is provided
    if (onFileUpload) {
      for (let i = 0; i < newFiles.length; i++) {
        const fileData = newFiles[i]
        if (!fileData.file) continue

        try {
          console.log(onFileUpload(fileData.file))
          const result = await onFileUpload(fileData.file)

          // Update the file with the URL
          setUploadedFiles((prev) => {
            const taskFiles = [...(prev[currentTaskId] || [])]
            const fileIndex = taskFiles.findIndex((f) => f.name === fileData.name && f.size === fileData.size)

            if (fileIndex !== -1) {
              taskFiles[fileIndex] = {
                ...taskFiles[fileIndex],
                url: result.url,
                uploading: false,
              }
            }

            return {
              ...prev,
              [currentTaskId]: taskFiles,
            }
          })
        } catch (error) {
          // Handle upload error
          setUploadedFiles((prev) => {
            console.log("Upload error:", error)
            const taskFiles = [...(prev[currentTaskId] || [])]
            const fileIndex = taskFiles.findIndex((f) => f.name === fileData.name && f.size === fileData.size)

            if (fileIndex !== -1) {
              taskFiles[fileIndex] = {
                ...taskFiles[fileIndex],
                uploading: false,
                error: "Failed to upload file",
              }
            }

            return {
              ...prev,
              [currentTaskId]: taskFiles,
            }
          })

          setUploadError(`Failed to upload ${fileData.name}. Please try again.`)
        }
      }
    } else {
      // If no upload function is provided, simulate successful upload after a delay
      setTimeout(() => {
        setUploadedFiles((prev) => {
          const taskFiles = [...(prev[currentTaskId] || [])]

          return {
            ...prev,
            [currentTaskId]: taskFiles.map((file) => ({
              ...file,
              uploading: false,
              url: URL.createObjectURL(file.file as File), // Create a temporary URL
            })),
          }
        })
      }, 1500)
    }
  }

  const removeFile = (taskId: string, fileName: string, fileSize: number) => {
    setUploadedFiles((prev) => {
      const taskFiles = [...(prev[taskId] || [])]
      const filteredFiles = taskFiles.filter((file) => !(file.name === fileName && file.size === fileSize))

      return {
        ...prev,
        [taskId]: filteredFiles,
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent, taskId: string) => {
    e.preventDefault()
    e.stopPropagation()

    setCurrentTaskId(taskId)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = e.dataTransfer.files
      const event = {
        target: {
          files: fileList,
        },
      } as unknown as ChangeEvent<HTMLInputElement>

      handleFileChange(event)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (fileName: string): JSX.Element => {
    if (fileName.endsWith(".java")) return <Code className="h-4 w-4" />
    if (fileName.endsWith(".pdf")) return <FileText className="h-4 w-4" />
    if (fileName.endsWith(".zip") || fileName.endsWith(".jar")) return <File className="h-4 w-4" />
    return <Paperclip className="h-4 w-4" />
  }

  const getTypeIcon = (type: HomeworkType) => {
    switch (type) {
      case "coding":
        return <Code className="h-4 w-4" />
      case "written":
        return <FileText className="h-4 w-4" />
      case "project":
        return <Paperclip className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 hover:bg-green-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "hard":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case "not-started":
        return "bg-gray-500 hover:bg-gray-600"
      case "in-progress":
        return "bg-blue-500 hover:bg-blue-600"
      case "submitted":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "late":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getStatusText = (status: SubmissionStatus) => {
    switch (status) {
      case "not-started":
        return "Not Started"
      case "in-progress":
        return "In Progress"
      case "submitted":
        return "Submitted"
      case "completed":
        return "Completed"
      case "late":
        return "Late"
      default:
        return "Unknown"
    }
  }

  const completedTasks = tasks.filter((task) => task.status === "completed" || task.status === "submitted").length
  const progressPercentage = (completedTasks / tasks.length) * 100

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".java,.zip,.jar,.pdf,.txt"
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {format(new Date(tasks[0]?.dueDate || new Date()), "MMM d, yyyy")}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>
              {completedTasks}/{tasks.length} Completed
            </span>
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {completedTasks}/{tasks.length} tasks completed
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {uploadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription className="flex items-center justify-between">
            <span>{uploadError}</span>
            <Button variant="ghost" size="sm" onClick={() => setUploadError(null)} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <Collapsible
            key={task.id}
            open={openTasks[task.id]}
            onOpenChange={() => toggleTask(task.id)}
            className="border rounded-lg overflow-hidden"
          >
            <div className="bg-muted/40 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  {getTypeIcon(task.type)}
                </div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge className={`${getDifficultyColor(task.difficulty)} text-xs capitalize`}>
                      {task.difficulty}
                    </Badge>
                    <Badge className={`${getStatusColor(task.status)} text-xs`}>{getStatusText(task.status)}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(task.dueDate), "MMM d")}
                    </span>
                    <span>{task.points} pts</span>
                  </div>
                </div>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {openTasks[task.id] ? (
                    <>
                      <span className="sr-only md:not-sr-only md:inline-block">Hide Details</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="sr-only md:not-sr-only md:inline-block">Show Details</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="p-4 pt-0">
                <Tabs
                  defaultValue="instructions"
                  value={activeTab[task.id] || "instructions"}
                  onValueChange={(value) => setTaskTab(task.id, value)}
                  className="mt-4"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="submission">Submission</TabsTrigger>
                  </TabsList>

                  <TabsContent value="instructions" className="mt-4 space-y-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{task.description}</p>
                    </div>

                    {(task.type === "coding" || task.type === "project") && task.codeTemplate != null && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Code Template</h4>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>{task.codeTemplate}</pre>
                        </div>

                        {task.expectedOutput && (
                          <>
                            <h4 className="font-medium">Expected Output</h4>
                            <div className="bg-muted p-4 rounded-md font-mono text-sm">
                              <pre>{task.expectedOutput}</pre>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {task.attachments && task.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Attachments</h4>
                        <div className="space-y-2">
                          {task.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-2">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <span>{attachment.name}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1" asChild>
                                <a href={attachment.url} download>
                                  <Download className="h-4 w-4" />
                                  <span>Download</span>
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="resources" className="mt-4 space-y-4">
                    {task.resources && task.resources.length > 0 ? (
                      <div className="space-y-2">
                        {task.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                            <span>{resource.title}</span>
                            <Button variant="ghost" size="sm" className="gap-1" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                <span>Open</span>
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No additional resources for this task.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="submission" className="mt-4 space-y-4">
                    {task.status === "completed" ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Task Completed</h4>
                          <p className="text-sm text-muted-foreground">You have successfully completed this task.</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {task.type === "coding" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Your Code</h4>
                            <Textarea
                              placeholder="Write your code here..."
                              className="font-mono min-h-[200px]"
                              value={submissions[task.id]?.code || task.codeTemplate || ""}
                              onChange={(e) =>
                                updateSubmission(task.id, {
                                  ...submissions[task.id],
                                  code: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}

                        {task.type === "written" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Your Answer</h4>
                            <Textarea
                              placeholder="Write your answer here..."
                              className="min-h-[150px]"
                              value={submissions[task.id]?.answer || ""}
                              onChange={(e) =>
                                updateSubmission(task.id, {
                                  ...submissions[task.id],
                                  answer: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}

                        {task.type === "project" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Project Description</h4>
                              <Textarea
                                placeholder="Describe your project..."
                                className="min-h-[100px]"
                                value={submissions[task.id]?.description || ""}
                                onChange={(e) =>
                                  updateSubmission(task.id, {
                                    ...submissions[task.id],
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium">Upload Files</h4>
                              <div 
                                className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, task.id)}
                              >
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">
                                  Drag and drop files here, or click to select files
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Supports: Java files, ZIP archives, PDFs (Max 10MB)
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-4"
                                  onClick={() => {
                                    handleFileSelect(task.id)
                                  }}
                                >
                                  Select Files
                                </Button>
                              </div>

                              {/* Display uploaded files */}
                              {uploadedFiles[task.id] && uploadedFiles[task.id].length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Uploaded Files</h4>
                                  <div className="space-y-2">
                                    {uploadedFiles[task.id].map((file, index) => (
                                      <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 rounded-md border ${
                                          file.error ? "border-red-300 bg-red-50 dark:bg-red-900/10" : "border-border"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 overflow-hidden">
                                          {getFileIcon(file.name)}
                                          <div className="truncate">
                                            <p className="font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {file.uploading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : file.error ? (
                                            <span className="text-xs text-red-500">{file.error}</span>
                                          ) : (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                          )}
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => removeFile(task.id, file.name, file.size)}
                                            disabled={file.uploading}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(task.id, "in-progress")}
                            >
                              Save Draft
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      // Mark as not started
                                      updateSubmission(task.id, null)
                                      setUploadedFiles((prev) => ({
                                        ...prev,
                                        [task.id]: [],
                                      }))
                                      handleStatusChange(task.id, "not-started")
                                    }}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Reset submission</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Button
                            className="gap-2"
                            onClick={() => handleSubmission(task.id)}
                            disabled={
                              task.type === "project" &&
                              (!uploadedFiles[task.id] ||
                                uploadedFiles[task.id].length === 0 ||
                                uploadedFiles[task.id].some((file) => file.uploading))
                            }
                          >
                            <Send className="h-4 w-4" />
                            Submit
                          </Button>
                        </div>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
