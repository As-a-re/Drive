import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Car, CheckCircle, Users, Award, ArrowRight } from "lucide-react"
import EnrollmentForm from "@/components/enrollment-form"

// Mock lesson data - in a real app, this would come from a database
const getLessonById = (id: string) => {
  const lessons = [
    {
      id: "1",
      title: "Beginner's Course",
      description:
        "Perfect for first-time drivers with no prior experience. Learn the basics of vehicle control, road rules, and safe driving practices.",
      fullDescription:
        "Our Beginner's Course is designed specifically for individuals with little to no driving experience. This comprehensive program covers all the fundamentals of driving, from basic vehicle controls to essential road rules and safety practices. Our patient instructors will guide you through each step of the learning process, ensuring you build confidence behind the wheel in a supportive environment.",
      price: 2500,
      duration: 10,
      category: "beginner",
      vehicle: "both",
      image: "/c.jpg?height=400&width=800",
      popular: true,
      features: [
        "10 hours of practical driving lessons",
        "Comprehensive road rules education",
        "Vehicle control fundamentals",
        "Parking techniques",
        "Basic maneuvers practice",
        "Traffic navigation skills",
        "Certificate upon completion",
      ],
      curriculum: [
        {
          title: "Introduction to Driving",
          description: "Learn about vehicle controls, safety checks, and basic operations.",
        },
        {
          title: "Basic Vehicle Control",
          description: "Practice starting, stopping, steering, and basic maneuvers in a controlled environment.",
        },
        {
          title: "Road Rules and Signs",
          description: "Comprehensive overview of traffic rules, road signs, and regulations.",
        },
        {
          title: "Residential Driving",
          description: "Practice driving in quiet residential areas with minimal traffic.",
        },
        {
          title: "Urban Driving",
          description: "Navigate through city streets, intersections, and moderate traffic.",
        },
        {
          title: "Parking Techniques",
          description: "Learn various parking methods including parallel, perpendicular, and angle parking.",
        },
        {
          title: "Final Assessment",
          description: "Comprehensive evaluation of all skills learned throughout the course.",
        },
      ],
      instructors: [
        {
          name: "John Adeyemi",
          role: "Senior Driving Instructor",
          experience: "15 years",
          image: "/c.jpg?height=100&width=100",
        },
        {
          name: "Sarah Okafor",
          role: "Driving Instructor",
          experience: "8 years",
          image: "/c.jpg?height=100&width=100",
        },
      ],
    },
    // Additional lessons would be defined here
  ]

  return lessons.find((lesson) => lesson.id === id) || lessons[0]
}

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  const lesson = getLessonById(params.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-lg opacity-90 max-w-2xl mb-4">{lesson.description}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{lesson.duration} hours</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Car className="h-4 w-4 mr-2" />
                  <span className="text-sm capitalize">
                    {lesson.vehicle === "both" ? "Manual & Automatic" : lesson.vehicle}
                  </span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm capitalize">{lesson.category} Level</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-primary">GHS{lesson.price.toLocaleString()}</span>
                </div>
                <Button asChild size="lg" className="w-full">
                  <a href="#enroll">Enroll Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2">
              <img
                src={lesson.image || "/c.jpg"}
                alt={lesson.title}
                className="w-full h-auto rounded-lg shadow-md mb-8"
              />

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructors">Instructors</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                      <p className="text-gray-700 mb-6">{lesson.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lesson.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {lesson.curriculum.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="instructors" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Meet Your Instructors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lesson.instructors.map((instructor, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center"
                      >
                        <img
                          src={instructor.image || "/c.jpg"}
                          alt={instructor.name}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="font-bold text-lg">{instructor.name}</h3>
                        <p className="text-primary">{instructor.role}</p>
                        <div className="flex items-center mt-2">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{instructor.experience} experience</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Do I need any prior experience?</h3>
                      <p className="text-gray-600">
                        No, this course is designed for complete beginners with no prior driving experience.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">What documents do I need to bring?</h3>
                      <p className="text-gray-600">
                        You'll need a valid ID card or passport for registration purposes.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Can I choose my instructor?</h3>
                      <p className="text-gray-600">
                        Yes, you can request a specific instructor during the enrollment process, subject to
                        availability.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">What if I need to reschedule a lesson?</h3>
                      <p className="text-gray-600">
                        You can reschedule a lesson up to 24 hours in advance without any penalty.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Enrollment Form */}
            <div className="lg:col-span-1">
              <div id="enroll" className="bg-white border border-gray-200 rounded-lg p-6 shadow-md sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Enroll in This Course</h2>
                <EnrollmentForm lessonId={lesson.id} lessonTitle={lesson.title} lessonPrice={lesson.price} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div>
                  <img
                    src="/c.jpg?height=200&width=300"
                    alt="Related course"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">Related Driving Course {id}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Another great driving course that complements what you're looking at.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">GHS2,000</span>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/lessons/${id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Become a Confident Driver?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Enroll in our {lesson.title} today and take the first step towards mastering the road.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <a href="#enroll">
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}

