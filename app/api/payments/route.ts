import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json()

    // Forward the request to our Express backend
    const response = await fetch(`${process.env.API_URL || "http://localhost:3000"}/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the payment" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Forward the request to our Express backend
    const response = await fetch(`${process.env.API_URL || "http://localhost:3000"}/api/payments`)

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json({ success: false, message: "An error occurred while fetching payments" }, { status: 500 })
  }
}

