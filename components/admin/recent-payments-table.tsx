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
import { MoreHorizontal, Eye, Download, RotateCcw } from "lucide-react"

// Mock data for recent payments
const recentPayments = [
  {
    id: "PAY-001",
    studentName: "John Doe",
    lessonTitle: "Beginner's Course",
    date: "2023-06-25",
    amount: 2500,
    method: "card",
    status: "completed",
  },
  {
    id: "PAY-002",
    studentName: "Sarah Johnson",
    lessonTitle: "Defensive Driving",
    date: "2023-06-26",
    amount: 3000,
    method: "bank",
    status: "pending",
  },
  {
    id: "PAY-003",
    studentName: "Michael Chen",
    lessonTitle: "Highway Confidence",
    date: "2023-06-27",
    amount: 2000,
    method: "mobile",
    status: "completed",
  },
  {
    id: "PAY-004",
    studentName: "Aisha Patel",
    lessonTitle: "Manual Transmission",
    date: "2023-06-28",
    amount: 2800,
    method: "card",
    status: "failed",
  },
  {
    id: "PAY-005",
    studentName: "David Nwosu",
    lessonTitle: "Beginner's Course",
    date: "2023-06-29",
    amount: 2500,
    method: "mobile",
    status: "completed",
  },
]

export default function RecentPaymentsTable() {
  const [payments, setPayments] = useState(recentPayments)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card"
      case "bank":
        return "Bank Transfer"
      case "mobile":
        return "Mobile Money"
      default:
        return method
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
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.studentName}</TableCell>
              <TableCell>{payment.lessonTitle}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>GHS{payment.amount.toLocaleString()}</TableCell>
              <TableCell>{getMethodLabel(payment.method)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(payment.status)}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
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
                      <Download className="mr-2 h-4 w-4" />
                      Download receipt
                    </DropdownMenuItem>
                    {payment.status === "failed" && (
                      <DropdownMenuItem>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Retry payment
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
  )
}

