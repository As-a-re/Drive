"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, Plus, Eye, Edit, Trash, Download } from "lucide-react"

// Mock data for students
const studentsData = [
  {
    id: "STU-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 123 456 7890",
    enrolledCourses: 2,
    totalPayments: 4000,
    joinDate: "2023-01-15",
    status: "active",
  },
  {
    id: "STU-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 234 567 8901",
    enrolledCourses: 1,
    totalPayments: 3000,
    joinDate: "2023-02-20",
    status: "active",
  },
  {
    id: "STU-003",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+234 345 678 9012",
    enrolledCourses: 3,
    totalPayments: 5000,
    joinDate: "2023-03-10",
    status: "active",
  },
  {
    id: "STU-004",
    name: "Aisha Patel",
    email: "aisha.patel@example.com",
    phone: "+234 456 789 0123",
    enrolledCourses: 1,
    totalPayments: 2000,
    joinDate: "2023-04-05",
    status: "inactive",
  },
  {
    id: "STU-005",
    name: "David Nwosu",
    email: "david.nwosu@example.com",
    phone: "+234 567 890 1234",
    enrolledCourses: 2,
    totalPayments: 5000,
    joinDate: "2023-05-12",
    status: "active",
  },
  {
    id: "STU-006",
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@example.com",
    phone: "+234 678 901 2345",
    enrolledCourses: 1,
    totalPayments: 2000,
    joinDate: "2023-06-18",
    status: "active",
  },
  {
    id: "STU-007",
    name: "Emmanuel Okafor",
    email: "emmanuel.okafor@example.com",
    phone: "+234 789 012 3456",
    enrolledCourses: 0,
    totalPayments: 0,
    joinDate: "2023-06-20",
    status: "pending",
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(studentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "inactive":
        return "text-red-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the student details below to create a new student account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Enrolled Courses</TableHead>
              <TableHead>Total Payments</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{student.email}</div>
                  <div className="text-xs text-gray-500">{student.phone}</div>
                </TableCell>
                <TableCell>{student.enrolledCourses}</TableCell>
                <TableCell>GHS{student.totalPayments.toLocaleString()}</TableCell>
                <TableCell>{student.joinDate}</TableCell>
                <TableCell>
                  <div className={`font-medium ${getStatusColor(student.status)}`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </div>
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
                        Edit student
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export data
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

