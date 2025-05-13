import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Badge } from "../../components/ui/Badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog"
import { MoreHorizontal, Search, Plus, Eye, Edit, Trash, Clock, Car, Users } from "lucide-react"
import api from "../../services/api"
import toast from "react-hot-toast"

export default function LessonsPage() {
  const [lessons, setLessons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.getLessons()
        setLessons(response.data)
      } catch (error) {
        console.error("Error fetching lessons:", error)
        toast.error("Failed to load lessons")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryLabel = (category) => {
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

  const getCategoryColor = (category) => {
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

  const getVehicleLabel = (vehicle) => {
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

  const confirmDelete = (id) => {
    setLessonToDelete(id)
    setShowDeleteDialog(true)
  }

  const deleteLesson = async () => {
    if (lessonToDelete) {
      try {
        await api.deleteLesson(lessonToDelete)
        setLessons(lessons.filter((lesson) => lesson._id !== lessonToDelete))
        toast.success("Lesson deleted successfully")
      } catch (error) {
        console.error("Error deleting lesson:", error)
        toast.error("Failed to delete lesson")
      } finally {
        setShowDeleteDialog(false)
        setLessonToDelete(null)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
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
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
        <Button asChild>
          <Link to="/admin/lessons/new">
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
              <TableRow key={lesson._id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={lesson.image || "/placeholder.jpg"}
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
                <TableCell>GH₵{lesson.price.toLocaleString()}</TableCell>
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
                    {lesson.enrollments?.length || 0}
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
                        <Link to={`/admin/lessons/${lesson._id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/lessons/${lesson._id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit lesson
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(lesson._id)}>
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