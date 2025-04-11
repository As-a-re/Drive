"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

// Mock data for enrollments
const enrollmentsData = [
  {
    id: "ENR-001",
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
    lessonTitle: "Beginner's Course",
    date: "2023-06-25",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    amount: 2500,
    vehicleType: "manual",
    instructorName: "Sarah Okafor",
    feedback: "",
  },
  {
    id: "ENR-002",
    studentName: "Sarah Johnson",
    studentEmail: "sarah.johnson@example.com",
    lessonTitle: "Defensive Driving",
    date: "2023-06-26",
    time: "2:00 PM - 4:00 PM",
    status: "pending",
    amount: 3000,
    vehicleType: "automatic",
    instructorName: "",
    feedback: "",
  },
  {
    id: "ENR-003",
    studentName: "Michael Chen",
    studentEmail: "michael.chen@example.com",
    lessonTitle: "Highway Confidence",
    date: "2023-06-27",
    time: "9:00 AM - 11:00 AM",
    status: "completed",
    amount: 2000,
    vehicleType: "manual",
    instructorName: "David Nwosu",
    feedback: "Good progress on highway merging. Needs more practice with lane changes.",
  },
  {
    id: "ENR-004",
    studentName: "Aisha Patel",
    studentEmail: "aisha.patel@example.com",
    lessonTitle: "Manual Transmission",
    date: "2023-06-28",
    time: "1:00 PM - 3:00 PM",
    status: "cancelled",
    amount: 2800,
    vehicleType: "manual",
    instructorName: "",
    feedback: "",
  },
  {
    id: "ENR-005",
    studentName: "David Nwosu",
    studentEmail: "david.nwosu@example.com",
    lessonTitle: "Beginner's Course",
    date: "2023-06-29",
    time: "4:00 PM - 6:00 PM",
    status: "confirmed",
    amount: 2500,
    vehicleType: "automatic",
    instructorName: "Sarah Okafor",
    feedback: "",
  },
  {
    id: "ENR-006",
    studentName: "Fatima Ibrahim",
    studentEmail: "fatima.ibrahim@example.com",
    lessonTitle: "Defensive Driving",
    date: "2023-06-30",
    time: "10:00 AM - 12:00 PM",
    status: "completed",
    amount: 3000,
    vehicleType: "automatic",
    instructorName: "Michael Adeyemi",
    feedback: "Excellent defensive driving skills. Very attentive to surroundings.",
  },
]

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(enrollmentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null)
  const [feedback, setFeedback] = useState("")

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      (enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || enrollment.status === statusFilter),
  )

  const getStatusColor = (status: string) => {
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

  const openFeedbackDialog = (enrollment: any) => {
    setSelectedEnrollment(enrollment)
    setFeedback(enrollment.feedback || "")
    setShowFeedbackDialog(true)
  }

  const saveFeedback = () => {
    if (selectedEnrollment) {
      const updatedEnrollments = enrollments.map((enrollment) =>
        enrollment.id === selectedEnrollment.id ? { ...enrollment, feedback } : enrollment,
      )
      setEnrollments(updatedEnrollments)
      setShowFeedbackDialog(false)
    }
  }

  const updateEnrollmentStatus = (id: string, newStatus: string) => {
    const updatedEnrollments = enrollments.map((enrollment) =>
      enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment,
    )
    setEnrollments(updatedEnrollments)
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
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
              <TableRow key={enrollment.id}>
                <TableCell className="font-medium">{enrollment.id}</TableCell>
                <TableCell>
                  <div>{enrollment.studentName}</div>
                  <div className="text-xs text-gray-500">{enrollment.studentEmail}</div>
                </TableCell>
                <TableCell>{enrollment.lessonTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                    {enrollment.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    {enrollment.time}
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
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment.id, "confirmed")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          <span className="text-green-600">Confirm enrollment</span>
                        </DropdownMenuItem>
                      )}
                      {(enrollment.status === "pending" || enrollment.status === "confirmed") && (
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment.id, "completed")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-blue-600">Mark as completed</span>
                        </DropdownMenuItem>
                      )}
                      {enrollment.status !== "cancelled" && enrollment.status !== "completed" && (
                        <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment.id, "cancelled")}>
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

      {/* Feedback Dialog */}
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
                  <p>{selectedEnrollment.studentName}</p>
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

