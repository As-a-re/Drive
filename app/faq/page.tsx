import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  // FAQ categories and questions
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What makes Imperial Driving College different from other driving schools?",
          answer:
            "Imperial Driving College stands out with our experienced instructors, personalized learning approach, flexible scheduling, and comprehensive curriculum. We focus on creating confident, safe drivers through quality education and practical training.",
        },
        {
          question: "Do you offer both manual and automatic transmission lessons?",
          answer:
            "Yes, we offer lessons for both manual and automatic transmission vehicles. You can choose the type that best suits your needs or learn both for maximum flexibility.",
        },
        {
          question: "How long does it take to learn how to drive?",
          answer:
            "The time it takes to learn varies from person to person. On average, most students become comfortable with basic driving skills after 10-15 hours of instruction. However, becoming a truly confident and skilled driver may take additional practice.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "We currently offer driving lessons throughout Accra, including Achimota, Lapaz, Ofankor, and surrounding areas. Contact us to confirm if we serve your specific location.",
        },
      ],
    },
    {
      category: "Lessons & Scheduling",
      questions: [
        {
          question: "How do I schedule my driving lessons?",
          answer:
            "You can schedule your lessons through our online booking system after enrollment. Simply select your preferred dates and times from the available slots, and you'll receive a confirmation email.",
        },
        {
          question: "What happens if I need to reschedule a lesson?",
          answer:
            "We understand that plans can change. You can reschedule a lesson up to 24 hours in advance without any penalty through your student dashboard or by calling our office.",
        },
        {
          question: "How long is each driving lesson?",
          answer:
            "Our standard driving lessons are 2 hours long. We've found this to be the optimal duration for learning without fatigue. However, we also offer 1-hour refresher lessons for experienced drivers.",
        },
        {
          question: "Can I take lessons on weekends?",
          answer:
            "Yes, we offer lessons on Saturdays and Sundays to accommodate students with busy weekday schedules. Weekend slots tend to fill up quickly, so we recommend booking in advance.",
        },
      ],
    },
    {
      category: "Payments & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept payments through Paystack, which supports credit/debit cards, bank transfers, and mobile payments. All transactions are secure and encrypted.",
        },
        {
          question: "Do you offer any discounts or package deals?",
          answer:
            "Yes, we offer discounted rates when you book multiple lessons as a package. We also have special rates for students and occasional promotional offers. Check our pricing page for current deals.",
        },
        {
          question: "Is there a refund policy if I can't complete my lessons?",
          answer:
            "Yes, we offer partial refunds if you cancel your remaining lessons with at least 72 hours notice. A small administrative fee may apply. Please refer to our terms and conditions for full details.",
        },
        {
          question: "Are there any additional fees I should know about?",
          answer:
            "Our lesson prices are all-inclusive. There are no hidden fees or additional charges for fuel, insurance, or learning materials. The price you see is the price you pay.",
        },
      ],
    },
    {
      category: "Requirements & Documentation",
      questions: [
        {
          question: "Do I need a learner's permit before taking lessons?",
          answer:
            "While it's not required to have a learner's permit for our private lessons, we strongly recommend obtaining one before or during your training. We can provide guidance on how to apply for your learner's permit.",
        },
        {
          question: "What documents do I need to bring to my first lesson?",
          answer:
            "Please bring a valid ID (such as a national ID card, passport, or driver's license if you have one) and your booking confirmation. If you have a learner's permit, please bring that as well.",
        },
        {
          question: "Is there an age requirement for taking driving lessons?",
          answer:
            "Yes, you must be at least 18 years old to take driving lessons with us, in accordance with Ghanaian driving laws.",
        },
        {
          question: "Do you help with the driver's license application process?",
          answer:
            "Yes, we provide guidance on the driver's license application process and can help prepare you for the official driving test. However, the actual application must be done by you at the appropriate government office.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Find answers to common questions about our driving school, lessons, and enrollment process.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`item-${index}-${faqIndex}`}
                    className="border border-gray-200 rounded-lg"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Still Have Questions Section */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, feel free to contact our support team. We're here to
              help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="tel:+2341234567890">Call Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

