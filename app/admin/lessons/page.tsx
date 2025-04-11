"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MoreHorizontal, Search, Plus, Eye, Edit, Trash, Clock, Car, Users } from "lucide-react"

// Mock data for lessons
const lessonsData = [
  {
    id: 1,
    title: "Beginner's Course",
    description: "Perfect for first-time drivers with no prior experience.",
    price: 2500,
    duration: 10,
    category: "beginner",
    vehicle: "both",
    image: "/a.jpg?height=200&width=300",
    popular: true,
    enrollments: 45,
  },
  {
    id: 2,
    title: "Defensive Driving",
    description: "Learn advanced techniques to anticipate hazards and stay safe on the road.",
    price: 3000,
    duration: 8,
    category: "advanced",
    vehicle: "both",
    image: "/a.jpg?height=200&width=300",
    popular: false,
    enrollments: 30,
  },
  {
    id: 3,
    title: "Highway Confidence",
    description: "Master highway driving with expert guidance.",
    price: 2000,
    duration: 6,
    category: "intermediate",
    vehicle: "both",
    image: "/a.jpg?height=200&width=300",
    popular: false,
    enrollments: 25,
  },
  {
    id: 4,
    title: "Manual Transmission Mastery",
    description: "Specialized course for learning to drive vehicles with manual transmission.",
    price: 2000,
    duration: 8,
    category: "specialized",
    vehicle: "manual",
    image: "/a.jpg?height=200&width=300",
    popular: false,
    enrollments: 20,
  },
  {
    id: 5,
    title: "Automatic Transmission Basics",
    description: "Learn to drive automatic transmission vehicles with confidence.",
    price: 2000,
    duration: 6,
    category: "beginner",
    vehicle: "automatic",
    image: "/a.jpg?height=200&width=300",
    popular: false,
    enrollments: 35,
  },
  {
    id: 6,
    title: "Refresher Course",
    description: "Perfect for licensed drivers who haven't driven in a while.",
    price: 1800,
    duration: 4,
    category: "intermediate",
    vehicle: "both",
    image: "/a.jpg?height=200&width=300",
    popular: false,
    enrollments: 15,
  },
]

export default function LessonsPage() {
  const [lessons, setLessons] = useState(lessonsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null)

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "beginner":
        return "Beginner"
      case "intermediate":
        return "Intermediate"
      case "advanced":
        return "Advanced"
      case "specialized":
        return "Specialized"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-purple-100 text-purple-800"
      case "specialized":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVehicleLabel = (vehicle: string) => {
    switch (vehicle) {
      case "manual":
        return "Manual"
      case "automatic":
        return "Automatic"
      case "both":
        return "Manual & Automatic"
      default:
        return vehicle
    }
  }

  const confirmDelete = (id: number) => {
    setLessonToDelete(id)
    setShowDeleteDialog(true)
  }

  const deleteLesson = () => {
    if (lessonToDelete) {
      setLessons(lessons.filter((lesson) => lesson.id !== lessonToDelete))
      setShowDeleteDialog(false)
      setLessonToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
        <Button asChild>
          <Link href="/admin/lessons/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search lessons..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={lesson.image || "/a.jpg"}
                      alt={lesson.title}
                      className="h-10 w-16 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{lesson.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCategoryColor(lesson.category)}>
                    {getCategoryLabel(lesson.category)}
                  </Badge>
                </TableCell>
                <TableCell>GHS{lesson.price.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-gray-500" />
                    {lesson.duration} hours
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Car className="mr-1 h-4 w-4 text-gray-500" />
                    {getVehicleLabel(lesson.vehicle)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-gray-500" />
                    {lesson.enrollments}
                  </div>
                </TableCell>
                <TableCell>
                  {lesson.popular ? (
                    <Badge className="bg-primary text-white">Popular</Badge>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/lessons/${lesson.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/lessons/${lesson.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit lesson
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(lesson.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete lesson
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lesson? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteLesson}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

