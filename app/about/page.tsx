import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Users, Award, Shield, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Imperial Driving College</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Learn about our mission, values, and commitment to creating safe, confident drivers through quality
            education.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Imperial Driving College was founded in 2010 with a simple mission: to create safer roads by training
                confident, responsible drivers. What began as a small operation with just two instructors has grown into
                one of the most respected driving schools in Ghana.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Michael Adeyemi, started the academy after witnessing too many preventable accidents caused
                by inadequate driver training. He believed that proper education could save lives, and that philosophy
                remains at the core of everything we do today.
              </p>
              <p className="text-gray-600">
                Over the years, we've helped thousands of students become safe, skilled drivers. We take pride in our
                comprehensive curriculum, experienced instructors, and commitment to road safety.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img
                src="/d.jpg?height=400&width=600"
                alt="Imperial Driving College founders"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Imperial Driving College, we're guided by a set of core principles that inform everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">
                We believe that safety is the foundation of good driving. Every lesson, technique, and practice we teach
                is designed with safety as the top priority.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Student-Centered Learning</h3>
              <p className="text-gray-600">
                We recognize that every student is unique. Our personalized approach ensures that each driver receives
                the specific guidance they need to succeed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence in Education</h3>
              <p className="text-gray-600">
                We're committed to providing the highest quality driving education. Our curriculum is comprehensive,
                up-to-date, and delivered by expert instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our instructors are the heart of Imperial Driving College. Each brings years of experience and a passion for
              teaching safe driving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Michael Adeyemi",
                role: "Founder & Lead Instructor",
                experience: "20+ years",
                image: "/d.jpg?height=300&width=300",
              },
              {
                name: "Sarah Okafor",
                role: "Senior Instructor",
                experience: "15+ years",
                image: "/d.jpg?height=300&width=300",
              },
              {
                name: "David Nwosu",
                role: "Defensive Driving Specialist",
                experience: "12+ years",
                image: "/d.jpg?height=300&width=300",
              },
              {
                name: "Amina Ibrahim",
                role: "Instructor",
                experience: "8+ years",
                image: "/d.jpg?height=300&width=300",
              },
            ].map((instructor, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src={instructor.image || "/d.jpg"}
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{instructor.name}</h3>
                  <p className="text-primary mb-2">{instructor.role}</p>
                  <div className="flex items-center text-gray-500">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{instructor.experience} experience</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Imperial Driving College?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Experienced Instructors</h3>
                    <p className="text-gray-600">
                      All our instructors have at least 5 years of teaching experience and undergo regular training to
                      stay current with best practices.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Comprehensive Curriculum</h3>
                    <p className="text-gray-600">
                      Our lessons cover everything from basic vehicle control to advanced defensive driving techniques,
                      ensuring you're fully prepared for any situation on the road.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Modern, Well-Maintained Vehicles</h3>
                    <p className="text-gray-600">
                      Learn in our fleet of safe, reliable vehicles that are regularly serviced and equipped with dual
                      controls for added safety.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Flexible Scheduling</h3>
                    <p className="text-gray-600">
                      We offer lessons seven days a week with flexible time slots to accommodate your busy schedule.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Proven Track Record</h3>
                    <p className="text-gray-600">
                      Our students have a 95% first-time pass rate, significantly higher than the national average.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/d.jpg?height=500&width=600"
                alt="Driving instruction"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Driving Journey?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied students who have learned to drive with confidence at Imperial Driving College.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/lessons">
                Browse Our Lessons <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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

