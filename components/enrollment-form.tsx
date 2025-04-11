"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { CalendarIcon, CreditCard, Loader2, CheckCircle, Building, Phone, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnrollmentFormProps {
  lessonId: string
  lessonTitle: string
  lessonPrice: number
}

export default function EnrollmentForm({ lessonId, lessonTitle, lessonPrice }: EnrollmentFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [paymentTab, setPaymentTab] = useState<string>("card")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleType: "",
  })
  const [error, setError] = useState<string | null>(null)

  // Mock time slots
  const timeSlots = ["9:00 AM - 11:00 AM", "11:30 AM - 1:30 PM", "2:00 PM - 4:00 PM", "4:30 PM - 6:30 PM"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !date || !timeSlot || !formData.vehicleType) {
      setError("Please fill in all required fields")
      return
    }

    setError(null)
    setStep(2)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare payment data based on selected method
      const paymentData = {
        amount: lessonPrice,
        lessonId,
        lessonTitle,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        date: date ? format(date, "yyyy-MM-dd") : "",
        timeSlot,
        vehicleType: formData.vehicleType,
        paymentMethod,
        // Additional fields based on payment method
        ...(paymentMethod === "card" && {
          cardNumber: (document.getElementById("cardNumber") as HTMLInputElement)?.value,
          cardName: (document.getElementById("cardName") as HTMLInputElement)?.value,
          expiry: (document.getElementById("expiry") as HTMLInputElement)?.value,
          cvv: (document.getElementById("cvv") as HTMLInputElement)?.value,
        }),
        ...(paymentMethod === "bank" && {
          accountName: (document.getElementById("accountName") as HTMLInputElement)?.value,
          bankName: (document.getElementById("bankName") as HTMLInputElement)?.value,
          accountNumber: (document.getElementById("accountNumber") as HTMLInputElement)?.value,
        }),
        ...(paymentMethod === "mobile" && {
          mobileProvider: (document.getElementById("mobileProvider") as HTMLSelectElement)?.value,
          mobileNumber: (document.getElementById("mobileNumber") as HTMLInputElement)?.value,
        }),
      }

      // Send payment data to backend
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Payment failed")
      }

      // Payment successful
      setStep(3)
    } catch (err) {
      console.error("Payment error:", err)
      setError(err instanceof Error ? err.message : "Payment processing failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmitDetails} className="space-y-4">
          {error && (
            <div className="bg-red-50 p-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const day = date.getDay()
                    return date < today || day === 0
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot">Preferred Time</Label>
            <Select onValueChange={(value) => setTimeSlot(value)}>
              <SelectTrigger id="timeSlot">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select onValueChange={(value) => handleSelectChange("vehicleType", value)}>
              <SelectTrigger id="vehicleType">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Transmission</SelectItem>
                <SelectItem value="automatic">Automatic Transmission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div>
          <div className="mb-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Course:</span>
                <span>{lessonTitle}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Date:</span>
                <span>{date ? format(date, "PPP") : "Not selected"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Time:</span>
                <span>{timeSlot || "Not selected"}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>GHS{lessonPrice.toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <Label className="mb-2 block">Select Payment Method</Label>
            <RadioGroup
              defaultValue="card"
              onValueChange={(value) => {
                setPaymentMethod(value)
                setPaymentTab(value)
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              <div>
                <RadioGroupItem value="card" id="payment-card" className="sr-only" />
                <Label
                  htmlFor="payment-card"
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <CreditCard
                    className={`h-6 w-6 mb-1 ${paymentMethod === "card" ? "text-primary" : "text-gray-500"}`}
                  />
                  <span className={`text-sm ${paymentMethod === "card" ? "font-medium" : ""}`}>Card</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="bank" id="payment-bank" className="sr-only" />
                <Label
                  htmlFor="payment-bank"
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${
                    paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <Building className={`h-6 w-6 mb-1 ${paymentMethod === "bank" ? "text-primary" : "text-gray-500"}`} />
                  <span className={`text-sm ${paymentMethod === "bank" ? "font-medium" : ""}`}>Bank</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="mobile" id="payment-mobile" className="sr-only" />
                <Label
                  htmlFor="payment-mobile"
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${
                    paymentMethod === "mobile" ? "border-primary bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <Phone className={`h-6 w-6 mb-1 ${paymentMethod === "mobile" ? "text-primary" : "text-gray-500"}`} />
                  <span className={`text-sm ${paymentMethod === "mobile" ? "font-medium" : ""}`}>Mobile Money</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <Tabs value={paymentTab} onValueChange={setPaymentTab} className="w-full">
              {/* Credit/Debit Card Payment */}
              <TabsContent value="card" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Enter name on card" required={paymentMethod === "card"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required={paymentMethod === "card"} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required={paymentMethod === "card"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required={paymentMethod === "card"} />
                  </div>
                </div>
              </TabsContent>

              {/* Bank Transfer Payment */}
              <TabsContent value="bank" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input id="accountName" placeholder="Enter account holder name" required={paymentMethod === "bank"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Select>
                    <SelectTrigger id="bankName">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="gtb">Ghana Commercial Bank</SelectItem>
                      <SelectItem value="firstbank">First Bank</SelectItem>
                      <SelectItem value="uba">United Bank for Africa</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="Enter account number" required={paymentMethod === "bank"} />
                </div>
              </TabsContent>

              {/* Mobile Money Payment */}
              <TabsContent value="mobile" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
                  <Select>
                    <SelectTrigger id="mobileProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                      <SelectItem value="airtel">Airtel-Tigo Cash</SelectItem>
                      <SelectItem value="telecel">Telecel Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input id="mobileNumber" placeholder="Enter mobile number" required={paymentMethod === "mobile"} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === "card" && <CreditCard className="mr-2 h-4 w-4" />}
                    {paymentMethod === "bank" && <Building className="mr-2 h-4 w-4" />}
                    {paymentMethod === "mobile" && <Phone className="mr-2 h-4 w-4" />}
                    Pay GHS{lessonPrice.toLocaleString()}
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>Secure payment powered by Paystack</p>
              <p className="mt-1">Your payment information is encrypted and secure.</p>
            </div>

            <Button type="button" variant="ghost" className="w-full mt-2" onClick={() => setStep(1)} disabled={loading}>
              Back to Details
            </Button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Enrollment Successful!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for enrolling in {lessonTitle}. We've sent a confirmation email with all the details.
          </p>
          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            View My Lessons
          </Button>
        </div>
      )}
    </div>
  )
}

