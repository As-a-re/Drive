import { PaystackButton } from "react-paystack"

// Paystack configuration
const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key"

export const initializePayment = ({ amount, email, name, phone, metadata, onSuccess, onClose }) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack amount is in kobo (pesewas for Ghana)
    publicKey: paystackPublicKey,
    firstname: name.split(" ")[0],
    lastname: name.split(" ").slice(1).join(" "),
    phone,
    metadata,
    currency: "GHS", // Ghana Cedis
    channels: ["card", "bank", "mobile_money", "ussd"],
    label: "DriveRight Academy",
    onSuccess,
    onClose,
  }

  return <PaystackButton {...config} className="w-full" />
}

export const verifyPayment = async (reference) => {
  try {
    const response = await fetch(`/api/payments/verify/${reference}`)
    return await response.json()
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}

