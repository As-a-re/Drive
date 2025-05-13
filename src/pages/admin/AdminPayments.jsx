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
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog"
import { MoreHorizontal, Search, Download, Eye, RotateCcw, Filter, CreditCard, Building, Phone } from "lucide-react"
import api from "../../services/api"
import toast from "react-hot-toast"

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.getPayments()
        setPayments(response.data)
      } catch (error) {
        console.error("Error fetching payments:", error)
        toast.error("Failed to load payments")
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.lessonTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.reference?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || payment.status === statusFilter) &&
      (methodFilter === "all" || payment.paymentMethod === methodFilter)
  )

  const getStatusColor = (status) => {
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

  const getMethodLabel = (method) => {
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

  const getMethodIcon = (method) => {
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

  const viewPaymentDetails = (payment) => {
    setSelectedPayment(payment)
    setShowPaymentDetails(true)
  }

  const handleRetryPayment = async (payment) => {
    try {
      await api.retryPayment(payment._id)
      toast.success("Payment retry initiated")
      // Refresh payments list
      const response = await api.getPayments()
      setPayments(response.data)
    } catch (error) {
      console.error("Error retrying payment:", error)
      toast.error("Failed to retry payment")
    }
  }

  const handleDownloadReceipt = async (payment) => {
    try {
      const response = await api.downloadReceipt(payment._id)
      // Create blob from response and download
      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `receipt-${payment._id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading receipt:", error)
      toast.error("Failed to download receipt")
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
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
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
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
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
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
              <option value="all">All Methods</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="mobile">Mobile Money</option>
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
              <TableRow key={payment._id}>
                <TableCell className="font-medium">{payment._id}</TableCell>
                <TableCell>
                  <div>{payment.customerName}</div>
                  <div className="text-xs text-gray-500">{payment.customerEmail}</div>
                </TableCell>
                <TableCell>{payment.lessonTitle}</TableCell>
                <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>GH₵{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getMethodIcon(payment.paymentMethod)}
                    {getMethodLabel(payment.paymentMethod)}
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
                      <DropdownMenuItem onClick={() => handleDownloadReceipt(payment)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download receipt
                      </DropdownMenuItem>
                      {payment.status === "failed" && (
                        <DropdownMenuItem onClick={() => handleRetryPayment(payment)}>
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
                  <p>{selectedPayment._id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Reference</h3>
                  <p>{selectedPayment.reference}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student</h3>
                  <p>{selectedPayment.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedPayment.customerEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lesson</h3>
                  <p>{selectedPayment.lessonTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p>GH₵{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Method</h3>
                  <p>{getMethodLabel(selectedPayment.paymentMethod)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className={getStatusColor(selectedPayment.status).replace("bg-", "text-").replace("-100", "-600")}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <Button className="w-full" onClick={() => handleDownloadReceipt(selectedPayment)}>
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