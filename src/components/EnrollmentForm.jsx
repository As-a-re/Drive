import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { usePaystackPayment } from "react-paystack"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Select } from "./ui/Select"
import { Calendar } from "./ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover"
import { Tabs, TabsContent } from "./ui/Tabs"
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup"
import { format } from "date-fns"
import { CalendarIcon, CreditCard, Loader2, CheckCircle, Building, Phone, AlertCircle } from "lucide-react"
import { cn } from "../lib/utils"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import api from "../services/api"
import { getPaystackConfig } from "../services/paystack"

export default function EnrollmentForm({ lessonId, lessonTitle, lessonPrice }) {
  const navigate = useNavigate()
  const [date, setDate] = useState(undefined)
  const [timeSlot, setTimeSlot] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentTab, setPaymentTab] = useState("card")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleType: "",
  })
  const [error, setError] = useState(null)

  // Time slots from API
  const [timeSlots, setTimeSlots] = useState([])
  
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await api.getAvailableTimeSlots(lessonId, date)
        setTimeSlots(response.data)
      } catch (error) {
        console.error("Error fetching time slots:", error)
        toast.error("Failed to load available time slots")
      }
    }

    if (date) {
      fetchTimeSlots()
    }
  }, [date, lessonId])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitDetails = (e) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone || !date || !timeSlot || !formData.vehicleType) {
      setError("Please fill in all required fields")
      return
    }

    setError(null)
    setStep(2)
  }

  // Initialize Paystack payment
  const initializePayment = usePaystackPayment(
    getPaystackConfig({
      email: formData.email,
      amount: lessonPrice,
      lessonTitle,
      fullName: formData.fullName,
      onSuccess: (reference) => processEnrollment(reference),
      onClose: () => {
        toast.error("Payment cancelled")
        setLoading(false)
      },
    })
  )

  const processEnrollment = async (reference) => {
    setLoading(true)
    try {
      const enrollmentData = {
        lessonId,
        lessonTitle,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        date: date ? format(date, "yyyy-MM-dd") : "",
        timeSlot,
        vehicleType: formData.vehicleType,
        paymentMethod,
        paymentReference: reference.reference || reference,
        amount: lessonPrice,
      }

      const response = await api.createEnrollment(enrollmentData)

      if (response.data.success) {
        setStep(3)
        toast.success("Enrollment successful!")
      } else {
        throw new Error(response.data.message || "Enrollment failed")
      }
    } catch (err) {
      console.error("Enrollment error:", err)
      setError(err.message || "Enrollment processing failed. Please try again.")
      toast.error("Failed to complete enrollment")
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (paymentMethod === "card" || paymentMethod === "mobile") {
        initializePayment()
      } else if (paymentMethod === "bank") {
        const reference = `BANK-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        await processEnrollment(reference)
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError(err.message || "Payment processing failed. Please try again.")
      toast.error("Payment failed")
      setLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
    >
      {step === 1 && (
        <motion.form
          onSubmit={handleSubmitDetails}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
              className="border-gray-300 focus:border-primary focus:ring-primary"
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
              className="border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number (e.g., 024 123 4567)"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="border-gray-300 focus:border-primary focus:ring-primary"
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
            <Select
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="border-gray-300 focus:border-primary focus:ring-primary"
            >
              <option value="" disabled>
                Select a time slot
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select
              id="vehicleType"
              value={formData.vehicleType}
              onChange={(e) => handleSelectChange("vehicleType", e.target.value)}
              className="border-gray-300 focus:border-primary focus:ring-primary"
            >
              <option value="" disabled>
                Select vehicle type
              </option>
              <option value="manual">Manual Transmission</option>
              <option value="automatic">Automatic Transmission</option>
            </Select>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
            >
              Continue to Payment
            </Button>
          </div>
        </motion.form>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                <span>GH₵{lessonPrice.toLocaleString()}</span>
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
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem value="card" id="payment-card" className="sr-only" />
                <Label
                  htmlFor="payment-card"
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
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
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
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
                  className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
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
              <TabsContent value="card" className="space-y-4 mt-0">
                <p className="text-sm text-gray-600">
                  Pay securely with your credit or debit card. We accept Visa, Mastercard, and other major cards.
                </p>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 mt-0">
                <p className="text-sm text-gray-600">
                  Make a direct bank transfer to our account. We'll send you the account details after you submit.
                </p>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4 mt-0">
                <p className="text-sm text-gray-600">
                  Pay using mobile money services like MTN Mobile Money, Vodafone Cash, or AirtelTigo Money.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
                  <Select id="mobileProvider" className="border-gray-300 focus:border-primary focus:ring-primary">
                    <option value="" disabled>
                      Select provider
                    </option>
                    {[
                      { value: "mtn", label: "MTN Mobile Money" },
                      { value: "vodafone", label: "Vodafone Cash" },
                      { value: "airtel", label: "AirtelTigo Money" },
                    ].map((provider) => (
                      <option key={provider.value} value={provider.value}>
                        {provider.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                disabled={loading}
              >
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
                    Pay GH₵{lessonPrice.toLocaleString()}
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
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          className="text-center py-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Enrollment Successful!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for enrolling in {lessonTitle}. We've sent a confirmation email with all the details.
          </p>
          <Button
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
            onClick={() => navigate("/dashboard")}
          >
            View My Lessons
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}