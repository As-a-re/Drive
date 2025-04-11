"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, CreditCard, GraduationCap, Shield, Users, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import TestimonialCard from "../components/TestimonialCard"
import FeatureCard from "../components/FeatureCard"
import { useAnimation } from "../hooks/useAnimation"

export default function HomePage() {
  const { ref, AnimatedElement } = useAnimation()

  const features = [
    {
      icon: <GraduationCap />,
      title: "Expert Instructors",
      description: "Learn from certified professionals with years of teaching experience in Ghana.",
    },
    {
      icon: <Shield />,
      title: "Safety First",
      description: "Our curriculum emphasizes defensive driving techniques for Ghana's unique road conditions.",
    },
    {
      icon: <Calendar />,
      title: "Flexible Scheduling",
      description: "Book lessons at times that work for your busy schedule, including weekends.",
    },
    {
      icon: <Users />,
      title: "Personalized Learning",
      description: "Tailored instruction based on your skill level and learning pace.",
    },
    {
      icon: <CreditCard />,
      title: "Mobile Money Payments",
      description: "Easy and secure payment options through MTN Mobile Money, Vodafone Cash, and more.",
    },
    {
      icon: <CheckCircle />,
      title: "DVLA Test Preparation",
      description: "Comprehensive preparation for Ghana's DVLA driving test requirements.",
    },
  ]

  const lessons = [
    {
      title: "Beginner's Course",
      description: "Perfect for first-time drivers with no prior experience.",
      price: "GH₵1,500",
      duration: "10 hours",
      popular: true,
    },
    {
      title: "Defensive Driving",
      description: "Learn advanced techniques to stay safe on Ghana's roads.",
      price: "GH₵1,800",
      duration: "8 hours",
      popular: false,
    },
    {
      title: "Highway Confidence",
      description: "Master highway driving with expert guidance.",
      price: "GH₵1,200",
      duration: "6 hours",
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Kwame Mensah",
      role: "New Driver",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The instructors were patient and helped me overcome my driving anxiety. I passed my DVLA test on the first try!",
    },
    {
      name: "Ama Serwaa",
      role: "University Student",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Flexible scheduling made it easy to fit lessons around my university classes at Legon. Great experience overall.",
    },
    {
      name: "Kofi Adu",
      role: "Working Professional",
      image: "/placeholder.svg?height=100&width=100",
      quote: "The defensive driving course improved my confidence on busy Accra roads. Highly recommended!",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary-700 to-secondary text-white py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ghana-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Start Your Driving Journey With Confidence in Ghana
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Professional driving lessons tailored to Ghana's roads and traffic conditions. Learn from expert
                instructors and get on the road safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link to="/lessons">
                    View Lessons <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Driving lesson in Ghana"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedElement animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose Our Driving School?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive driving education with a focus on safety, confidence, and skill development for
              Ghana's unique driving conditions.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedElement
                key={feature.title}
                animation="fadeInUp"
                className="h-full"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Lessons Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-30"></div>
        <div className="container mx-auto max-w-6xl relative">
          <AnimatedElement animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Popular Driving Lessons
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of comprehensive driving courses designed for all skill levels and Ghana's driving
              conditions.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => (
              <AnimatedElement
                key={lesson.title}
                animation="fadeInUp"
                className="h-full"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 relative h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  {lesson.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      Popular
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{lesson.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-primary">{lesson.price}</span>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                    >
                      <Link to={`/lessons/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement animation="fadeInUp" className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary-50 transition-all duration-300"
            >
              <Link to="/lessons">
                View All Lessons <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedElement animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our graduates who have successfully completed our driving courses and passed their DVLA tests.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedElement
                key={testimonial.name}
                animation="fadeInUp"
                className="h-full"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  quote={testimonial.quote}
                />
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Ghana Map Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <AnimatedElement animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Serving All of Ghana
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer driving lessons across major cities in Ghana including Accra, Kumasi, Takoradi, and Tamale.
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedElement animation="fadeInLeft">
              <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">Our Locations</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Accra - East Legon, Osu, and Airport Residential</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Kumasi - Ahodwo and Nhyiaeso</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Takoradi - Anaji and Airport Ridge</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Tamale - Jisonayili</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 bg-gradient-to-r from-primary to-secondary">
                  <Link to="/contact">Find Nearest Location</Link>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fadeInRight">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Map of Ghana with our locations"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary via-primary-700 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ghana-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative">
          <AnimatedElement animation="fadeInUp" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Driving Journey?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Enroll in one of our driving courses today and take the first step towards becoming a confident driver on
              Ghana's roads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to="/lessons">Browse Lessons</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  )
}

