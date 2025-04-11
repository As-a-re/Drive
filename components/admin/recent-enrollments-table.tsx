"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"

// Mock data for recent enrollments
const recentEnrollments = [
  {
    id: "ENR-001",
    studentName: "John Doe",
    lessonTitle: "Beginner's Course",
    date: "2023-06-25",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    amount: 2500,
  },
  {
    id: "ENR-002",
    studentName: "Sarah Johnson",
    lessonTitle: "Defensive Driving",
    date: "2023-06-26",
    time: "2:00 PM - 4:00 PM",
    status: "pending",
    amount: 3000,
  },
  {
    id: "ENR-003",
    studentName: "Michael Chen",
    lessonTitle: "Highway Confidence",
    date: "2023-06-27",
    time: "9:00 AM - 11:00 AM",
    status: "completed",
    amount: 2000,
  },
  {
    id: "ENR-004",
    studentName: "Aisha Patel",
    lessonTitle: "Manual Transmission",
    date: "2023-06-28",
    time: "1:00 PM - 3:00 PM",
    status: "cancelled",
    amount: 2800,
  },
  {
    id: "ENR-005",
    studentName: "David Nwosu",
    lessonTitle: "Beginner's Course",
    date: "2023-06-29",
    time: "4:00 PM - 6:00 PM",
    status: "confirmed",
    amount: 2500,
  },
]

export default function RecentEnrollmentsTable() {
  const [enrollments, setEnrollments] = useState(recentEnrollments)

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Lesson</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell className="font-medium">{enrollment.id}</TableCell>
              <TableCell>{enrollment.studentName}</TableCell>
              <TableCell>{enrollment.lessonTitle}</TableCell>
              <TableCell>
                {enrollment.date}
                <br />
                <span className="text-gray-500 text-sm">{enrollment.time}</span>
              </TableCell>
              <TableCell>GHS{enrollment.amount.toLocaleString()}</TableCell>
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
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Cancel enrollment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

