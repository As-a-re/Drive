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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Search, Download, Eye, RotateCcw, Filter, CreditCard, Building, Phone } from "lucide-react"

// Define the Payment type
interface Payment {
  id: string
  studentName: string
  studentEmail: string
  lessonTitle: string
  date: string
  amount: number
  method: string
  status: string
  reference: string
}

// Mock data for payments
const paymentsData: Payment[] = [
  {
    id: "PAY-001",
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
    lessonTitle: "Beginner's Course",
    date: "2023-06-25",
    amount: 2000,
    method: "card",
    status: "completed",
    reference: "REF123456",
  },
  {
    id: "PAY-002",
    studentName: "Sarah Johnson",
    studentEmail: "sarah.johnson@example.com",
    lessonTitle: "Defensive Driving",
    date: "2023-06-26",
    amount: 3000,
    method: "bank",
    status: "pending",
    reference: "REF234567",
  },
  {
    id: "PAY-003",
    studentName: "Michael Chen",
    studentEmail: "michael.chen@example.com",
    lessonTitle: "Highway Confidence",
    date: "2023-06-27",
    amount: 2000,
    method: "mobile",
    status: "completed",
    reference: "REF345678",
  },
  {
    id: "PAY-004",
    studentName: "Aisha Patel",
    studentEmail: "aisha.patel@example.com",
    lessonTitle: "Manual Transmission",
    date: "2023-06-28",
    amount: 2000,
    method: "card",
    status: "failed",
    reference: "REF456789",
  },
  {
    id: "PAY-005",
    studentName: "David Nwosu",
    studentEmail: "david.nwosu@example.com",
    lessonTitle: "Beginner's Course",
    date: "2023-06-29",
    amount: 2500,
    method: "mobile",
    status: "completed",
    reference: "REF567890",
  },
  {
    id: "PAY-006",
    studentName: "Fatima Ibrahim",
    studentEmail: "fatima.ibrahim@example.com",
    lessonTitle: "Defensive Driving",
    date: "2023-06-30",
    amount: 3000,
    method: "bank",
    status: "completed",
    reference: "REF678901",
  },
  {
    id: "PAY-007",
    studentName: "Emmanuel Okafor",
    studentEmail: "emmanuel.okafor@example.com",
    lessonTitle: "Highway Confidence",
    date: "2023-07-01",
    amount: 2000,
    method: "card",
    status: "refunded",
    reference: "REF789012",
  },
  {
    id: "PAY-008",
    studentName: "Grace Adeyemi",
    studentEmail: "grace.adeyemi@example.com",
    lessonTitle: "Manual Transmission",
    date: "2023-07-02",
    amount: 2800,
    method: "mobile",
    status: "completed",
    reference: "REF890123",
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState(paymentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || payment.status === statusFilter) &&
      (methodFilter === "all" || payment.method === methodFilter),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
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

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4 mr-2" />
      case "bank":
        return <Building className="h-4 w-4 mr-2" />
      case "mobile":
        return <Phone className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const viewPaymentDetails = (payment: any) => {
    setSelectedPayment(payment)
    setShowPaymentDetails(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Payments
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="mobile">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>
                  <div>{payment.studentName}</div>
                  <div className="text-xs text-gray-500">{payment.studentEmail}</div>
                </TableCell>
                <TableCell>{payment.lessonTitle}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>GHS{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getMethodIcon(payment.method)}
                    {getMethodLabel(payment.method)}
                  </div>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => viewPaymentDetails(payment)}>
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

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Detailed information about this payment.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment ID</h3>
                  <p>{selectedPayment.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Reference</h3>
                  <p>{selectedPayment.reference}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student</h3>
                  <p>{selectedPayment.studentName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedPayment.studentEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lesson</h3>
                  <p>{selectedPayment.lessonTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p>GHS{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedPayment.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Method</h3>
                  <p>{getMethodLabel(selectedPayment.method)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className={getStatusColor(selectedPayment.status).replace("bg-", "text-").replace("-100", "-600")}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <Button className="w-full" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

