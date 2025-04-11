import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CreditCard, GraduationCap, Shield, Users } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Start Your Driving Journey With Confidence
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Professional driving lessons tailored to your needs. Learn from expert instructors and get on the road
                safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/lessons">
                    View Lessons <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/a.jpg?height=400&width=500" alt="Driving lesson" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Driving School?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive driving education with a focus on safety, confidence, and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GraduationCap />}
              title="Expert Instructors"
              description="Learn from certified professionals with years of teaching experience."
            />
            <FeatureCard
              icon={<Shield />}
              title="Safety First"
              description="Our curriculum emphasizes defensive driving techniques and road safety."
            />
            <FeatureCard
              icon={<Calendar />}
              title="Flexible Scheduling"
              description="Book lessons at times that work for your busy schedule."
            />
            <FeatureCard
              icon={<Users />}
              title="Personalized Learning"
              description="Tailored instruction based on your skill level and learning pace."
            />
            <FeatureCard
              icon={<CreditCard />}
              title="Secure Online Payments"
              description="Easy and secure payment options through Paystack."
            />
            <FeatureCard
              icon={<ArrowRight />}
              title="Quick Progress"
              description="Structured lessons designed to help you learn efficiently."
            />
          </div>
        </div>
      </section>

      {/* Popular Lessons Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Popular Driving Lessons</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of comprehensive driving courses designed for all skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Beginner's Course",
                description: "Perfect for first-time drivers with no prior experience.",
                price: "GHS2,000",
                duration: "10 hours",
                popular: true,
              },
              {
                title: "Defensive Driving",
                description: "Learn advanced techniques to stay safe on the road.",
                price: "GHS3,000",
                duration: "8 hours",
                popular: false,
              },
              {
                title: "Highway Confidence",
                description: "Master highway driving with expert guidance.",
                price: "GHS2,000",
                duration: "6 hours",
                popular: false,
              },
            ].map((lesson, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 relative"
              >
                {lesson.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-primary">{lesson.price}</span>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/lessons/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/lessons">
                View All Lessons <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our graduates who have successfully completed our driving courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="New Driver"
              image="/placeholder.svg?height=100&width=100"
              quote="The instructors were patient and helped me overcome my driving anxiety. I passed my test on the first try!"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Student"
              image="/placeholder.svg?height=100&width=100"
              quote="Flexible scheduling made it easy to fit lessons around my university classes. Great experience overall."
            />
            <TestimonialCard
              name="Aisha Patel"
              role="Working Professional"
              image="/placeholder.svg?height=100&width=100"
              quote="The defensive driving course improved my confidence on busy city roads. Highly recommended!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Driving Journey?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Enroll in one of our driving courses today and take the first step towards becoming a confident driver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/lessons">Browse Lessons</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

