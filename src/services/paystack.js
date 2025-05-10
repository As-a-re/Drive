import axios from 'axios';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const initializePayment = async ({
  email,
  amount,
  metadata,
  callback_url,
  reference,
}) => {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Convert to kobo/pesewas
        metadata,
        callback_url,
        reference,
        currency: 'GHS',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_PUBLIC_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw error;
  }
};

export const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `/api/payments/verify/${reference}`
    );
    return response.data;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

export const getPaystackConfig = (data) => ({
  reference: `REF-${Date.now()}`,
  email: data.email,
  amount: data.amount * 100,
  publicKey: PAYSTACK_PUBLIC_KEY,
  metadata: {
    custom_fields: [
      {
        display_name: "Lesson",
        variable_name: "lesson",
        value: data.lessonTitle,
      },
      {
        display_name: "Student Name",
        variable_name: "student_name",
        value: data.fullName,
      },
    ],
  },
  text: 'Pay Now',
  onSuccess: (reference) => data.onSuccess(reference),
  onClose: () => data.onClose(),
});