import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Badge } from "../../components/ui/Badge"
import { Select } from "../../components/ui/Select"
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
import { Label } from "../../components/ui/Label"
import { Textarea } from "../../components/ui/Textarea"
import {
  MoreHorizontal,
  Search,
  Download,
  Eye,
  Edit,
  Filter,
  Calendar,
  Clock,
  User,
  Car,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react"
import api from "../../services/api"
import toast from "react-hot-toast"

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.getEnrollments()
        setEnrollments(response.data)
      } catch (error) {
        console.error("Error fetching enrollments:", error)
        toast.error("Failed to load enrollments")
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      (enrollment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.lessonTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment._id?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || enrollment.status === statusFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openFeedbackDialog = (enrollment) => {
    setSelectedEnrollment(enrollment)
    setFeedback(enrollment.feedback || "")
    setShowFeedbackDialog(true)
  }

  const saveFeedback = async () => {
    if (selectedEnrollment) {
      try {
        await api.updateEnrollment(selectedEnrollment._id, { feedback })
        const updatedEnrollments = enrollments.map((enrollment) =>
          enrollment._id === selectedEnrollment._id ? { ...enrollment, feedback } : enrollment
        )
        setEnrollments(updatedEnrollments)
        toast.success("Feedback saved successfully")
        setShowFeedbackDialog(false)
      } catch (error) {
        console.error("Error saving feedback:", error)
        toast.error("Failed to save feedback")
      }
    }
  }

  const updateEnrollmentStatus = async (id, newStatus) => {
    try {
      await api.updateEnrollment(id, { status: newStatus })
      const updatedEnrollments = enrollments.map((enrollment) =>
        enrollment._id === id ? { ...enrollment, status: newStatus } : enrollment
      )
      setEnrollments(updatedEnrollments)
      toast.success("Status updated successfully")
    } catch (error) {
      console.error("Error updating enrollment status:", error)
      toast.error("Failed to update status")
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
                <TableHead>ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Lesson</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
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
        <h1 className="text-2xl font-bold tracking-tight">Enrollments</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Enrollments
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search enrollments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.map((enrollment) => (
              <TableRow key={enrollment._id}>
                <TableCell className="font-medium">{enrollment._id}</TableCell>
                <TableCell>
                  <div>{enrollment.customerName}</div>
                  <div className="text-xs text-gray-500">{enrollment.customerEmail}</div>
                </TableCell>
                <TableCell>{enrollment.lessonTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                    {enrollment.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    {enrollment.timeSlot}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Car className="mr-1 h-4 w-4 text-gray-500" />
                    {enrollment.vehicleType.charAt(0).toUpperCase() + enrollment.vehicleType.slice(1)}
                  </div>
                </TableCell>
                <TableCell>
                  {enrollment.instructorName ? (
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4 text-gray-500" />
                      {enrollment.instructorName}
                    </div>
                  ) : (
                    <span className="text-gray-500">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(enrollment.status)}>
                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                  </Badge>
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit enrollment
                      </DropdownMenuItem>
                      {enrollment.status === "completed" && (
                        <DropdownMenuItem onClick={() => openFeedbackDialog(enrollment)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {enrollment.feedback ? "Edit feedback" : "Add feedback"}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {enrollment.status === "pending" && (
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment._id, "confirmed")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          <span className="text-green-600">Confirm enrollment</span>
                        </DropdownMenuItem>
                      )}
                      {(enrollment.status === "pending" || enrollment.status === "confirmed") && (
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment._id, "completed")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-blue-600">Mark as completed</span>
                        </DropdownMenuItem>
                      )}
                      {enrollment.status !== "cancelled" && enrollment.status !== "completed" && (
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment._id, "cancelled")}>
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          <span className="text-red-600">Cancel enrollment</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEnrollment?.feedback ? "Edit Feedback" : "Add Feedback"}</DialogTitle>
            <DialogDescription>Provide feedback for the student's lesson performance.</DialogDescription>
          </DialogHeader>
          {selectedEnrollment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Student</Label>
                  <p>{selectedEnrollment.customerName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Lesson</Label>
                  <p>{selectedEnrollment.lessonTitle}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="feedback">Instructor Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Enter feedback about the student's performance..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveFeedback}>Save Feedback</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}