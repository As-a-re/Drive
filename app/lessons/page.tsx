import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Clock, Car } from "lucide-react"

// Lesson data
const lessons = [
  {
    id: 1,
    title: "Beginner's Course",
    description:
      "Perfect for first-time drivers with no prior experience. Learn the basics of vehicle control, road rules, and safe driving practices.",
    price: 2500,
    duration: 10,
    category: "beginner",
    vehicle: "both",
    image: "/d.jpg?height=200&width=300",
    popular: true,
  },
  {
    id: 2,
    title: "Defensive Driving",
    description:
      "Learn advanced techniques to anticipate hazards and stay safe on the road. Ideal for drivers of all experience levels.",
    price: 3000,
    duration: 8,
    category: "advanced",
    vehicle: "both",
    image: "/d.jpg?height=200&width=300",
    popular: false,
  },
  {
    id: 3,
    title: "Highway Confidence",
    description:
      "Master highway driving with expert guidance. Learn merging, lane changing, and maintaining safe speeds on busy highways.",
    price: 2000,
    duration: 6,
    category: "intermediate",
    vehicle: "both",
    image: "/d.jpg?height=200&width=300",
    popular: false,
  },
  {
    id: 4,
    title: "Manual Transmission Mastery",
    description:
      "Specialized course for learning to drive vehicles with manual transmission. Master clutch control, gear shifting, and hill starts.",
    price: 2800,
    duration: 8,
    category: "specialized",
    vehicle: "manual",
    image: "/d.jpg?height=200&width=300",
    popular: false,
  },
  {
    id: 5,
    title: "Automatic Transmission Basics",
    description:
      "Learn to drive automatic transmission vehicles with confidence. Ideal for beginners or those transitioning from manual.",
    price: 2200,
    duration: 6,
    category: "beginner",
    vehicle: "automatic",
    image: "/d.jpg?height=200&width=300",
    popular: false,
  },
  {
    id: 6,
    title: "Refresher Course",
    description:
      "Perfect for licensed drivers who haven't driven in a while and need to rebuild confidence and skills.",
    price: 1800,
    duration: 4,
    category: "intermediate",
    vehicle: "both",
    image: "/d.jpg?height=200&width=300",
    popular: false,
  },
]

export default function LessonsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Driving Lessons</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Browse our comprehensive range of driving lessons designed for all skill levels. From beginner to advanced,
            we have the perfect course to help you become a confident driver.
          </p>
        </div>
      </section>

      {/* Filters and Lessons */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Filter className="mr-2 h-5 w-5" /> Filters
                </h2>

                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="search" placeholder="Search lessons..." className="pl-10" />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level
                  </label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle Type Filter */}
                <div className="mb-6">
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <Select>
                    <SelectTrigger id="vehicle">
                      <SelectValue placeholder="All Vehicles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="manual">Manual Transmission</SelectItem>
                      <SelectItem value="automatic">Automatic Transmission</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (GHS)</label>
                  <div className="pt-4">
                    <Slider defaultValue={[2000]} max={5000} step={1000} />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>GHS0</span>
                    <span>GHS5,000</span>
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-6">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <Select>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Duration</SelectItem>
                      <SelectItem value="short">Short (1-4 hours)</SelectItem>
                      <SelectItem value="medium">Medium (5-8 hours)</SelectItem>
                      <SelectItem value="long">Long (9+ hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Filters Button */}
                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Available Lessons</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration-low">Duration: Short to Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[40vw]">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 relative"
                  >
                    {lesson.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div>
                      <img
                        src={lesson.image || "/d.jpg"}
                        alt={lesson.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{lesson.duration} hours</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Car className="h-4 w-4 mr-1" />
                          <span className="text-sm capitalize">
                            {lesson.vehicle === "both" ? "Manual/Auto" : lesson.vehicle}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">GHS{lesson.price.toLocaleString()}</span>
                        <Button asChild>
                          <Link href={`/lessons/${lesson.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

