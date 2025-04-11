import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, User, ArrowRight } from "lucide-react"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for New Drivers",
    excerpt:
      "Starting your driving journey can be both exciting and nerve-wracking. Here are ten essential tips to help new drivers build confidence and stay safe on the road.",
    category: "Beginner Tips",
    author: "Michael Adeyemi",
    date: "June 15, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Defensive Driving Techniques",
    excerpt:
      "Defensive driving is about more than just following traffic rules. Learn how to anticipate potential hazards and protect yourself from dangerous situations on the road.",
    category: "Safety",
    author: "Sarah Okafor",
    date: "May 22, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: false,
  },
  {
    id: 3,
    title: "How to Master Parallel Parking",
    excerpt:
      "Parallel parking is often considered one of the most challenging driving skills to master. Follow our step-by-step guide to perfect your technique.",
    category: "Driving Skills",
    author: "David Nwosu",
    date: "April 10, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: false,
  },
  {
    id: 4,
    title: "Common Driving Test Mistakes and How to Avoid Them",
    excerpt:
      "Nervous about your upcoming driving test? Learn about the most common mistakes that test-takers make and how you can avoid them to pass on your first attempt.",
    category: "Test Preparation",
    author: "Amina Ibrahim",
    date: "March 5, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: false,
  },
  {
    id: 5,
    title: "The Benefits of Learning on a Manual Transmission",
    excerpt:
      "While automatic transmissions are becoming more common, there are still many benefits to learning how to drive a manual car. Discover why this skill is still valuable.",
    category: "Driving Skills",
    author: "Michael Adeyemi",
    date: "February 18, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: false,
  },
  {
    id: 6,
    title: "Driving in Adverse Weather Conditions",
    excerpt:
      "Rain, fog, and other adverse weather conditions can make driving challenging. Learn essential tips for staying safe when the weather turns bad.",
    category: "Safety",
    author: "Sarah Okafor",
    date: "January 30, 2023",
    image: "/a.jpg?height=300&width=600",
    featured: false,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Driving Tips & Insights</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Explore our collection of articles, tips, and resources to help you become a better, safer driver.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts
        .filter((post) => post.featured)
        .map((featuredPost) => (
          <section key={featuredPost.id} className="py-12 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="order-2 md:order-1 p-8 flex flex-col justify-center">
                    <div className="text-sm font-medium text-primary mb-2">Featured Article</div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.id}`}>
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="order-1 md:order-2">
                    <img
                      src={featuredPost.image || "/a.jpg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "300px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Blog Posts */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="beginner">Beginner Tips</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="skills">Driving Skills</SelectItem>
                  <SelectItem value="test">Test Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                  <Link href={`/blog/${post.id}`}>
                    <img src={post.image || "/a.jpg"} alt={post.title} className="w-full h-48 object-cover" />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="font-bold text-xl mb-2 hover:text-primary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{post.author}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/blog/${post.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" disabled>
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest driving tips, safety advice, and exclusive offers from Imperial Driving College.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Enter your email address" className="sm:flex-grow" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  )
}

