import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Mail } from "lucide-react"

// Mock blog post data
const getBlogPostById = (id: string) => {
  const blogPosts = [
    {
      id: "1",
      title: "10 Essential Tips for New Drivers",
      excerpt:
        "Starting your driving journey can be both exciting and nerve-wracking. Here are ten essential tips to help new drivers build confidence and stay safe on the road.",
      content: `
        <p>Learning to drive is an exciting milestone, but it can also be intimidating for beginners. Whether you've just received your learner's permit or you're preparing for your driving test, these essential tips will help you build confidence and develop safe driving habits from the start.</p>
        
        <h2>1. Get Familiar with Your Vehicle</h2>
        <p>Before hitting the road, take time to understand your car's features. Locate and learn how to use all controls, including lights, wipers, turn signals, and emergency brake. Adjust your mirrors and seat to ensure optimal visibility and comfort.</p>
        
        <h2>2. Start in Low-Traffic Areas</h2>
        <p>Begin practicing in empty parking lots or quiet residential streets. This allows you to get comfortable with basic controls without the pressure of other vehicles around you. Gradually progress to busier roads as your confidence increases.</p>
        
        <h2>3. Maintain Proper Hand Position</h2>
        <p>The recommended hand position is at 9 and 3 o'clock on the steering wheel. This gives you the most control and allows for smooth steering adjustments without crossing your arms.</p>
        
        <h2>4. Keep a Safe Following Distance</h2>
        <p>Follow the three-second rule: when the vehicle ahead of you passes a fixed point, count "one-thousand-one, one-thousand-two, one-thousand-three." If you reach that point before finishing, you're following too closely.</p>
        
        <h2>5. Eliminate Distractions</h2>
        <p>Put your phone away, keep music at a reasonable volume, and avoid eating while driving. For new drivers, even conversations can be distracting, so consider limiting passengers during your learning phase.</p>
        
        <h2>6. Check Blind Spots Regularly</h2>
        <p>Mirrors don't show everything. Develop the habit of checking your blind spots by looking over your shoulder before changing lanes or making turns.</p>
        
        <h2>7. Practice Defensive Driving</h2>
        <p>Always anticipate what other drivers might do. Assume others will make mistakes and be prepared to respond safely. This mindset can help prevent accidents caused by others' errors.</p>
        
        <h2>8. Master Proper Braking Technique</h2>
        <p>Learn to brake smoothly by applying gentle, gradual pressure rather than stomping on the pedal. Begin braking earlier than you think necessary to avoid harsh stops.</p>
        
        <h2>9. Learn to Manage Adverse Conditions</h2>
        <p>Practice driving in various conditions, including rain and nighttime, under the supervision of an experienced driver. Reduce your speed and increase following distance in challenging conditions.</p>
        
        <h2>10. Stay Calm Under Pressure</h2>
        <p>Everyone makes mistakes while learning. If you miss a turn or take a wrong route, don't panic. Safely continue driving and find an appropriate place to turn around or adjust your route.</p>
        
        <p>Remember, becoming a skilled driver takes time and practice. Be patient with yourself, focus on developing good habits from the start, and prioritize safety above all else. With consistent practice and the right mindset, you'll gain confidence and become a safe, responsible driver.</p>
      `,
      category: "Beginner Tips",
      author: "Michael Adeyemi",
      authorRole: "Founder & Lead Instructor",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "June 15, 2023",
      image: "/placeholder.svg?height=500&width=1000",
      tags: ["new drivers", "driving tips", "road safety", "beginner advice"],
    },
    // Additional blog posts would be defined here
  ]

  return blogPosts.find((post) => post.id === id) || blogPosts[0]
}

// Related posts
const relatedPosts = [
  {
    id: 2,
    title: "Understanding Defensive Driving Techniques",
    excerpt:
      "Defensive driving is about more than just following traffic rules. Learn how to anticipate potential hazards.",
    category: "Safety",
    author: "Sarah Okafor",
    date: "May 22, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "How to Master Parallel Parking",
    excerpt:
      "Parallel parking is often considered one of the most challenging driving skills to master. Follow our guide.",
    category: "Driving Skills",
    author: "David Nwosu",
    date: "April 10, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Common Driving Test Mistakes and How to Avoid Them",
    excerpt: "Nervous about your upcoming driving test? Learn about the most common mistakes that test-takers make.",
    category: "Test Preparation",
    author: "Amina Ibrahim",
    date: "March 5, 2023",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-white/80 text-sm gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="sticky top-24 space-y-8">
                {/* Author Info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Experienced driving instructor with a passion for teaching safe driving practices to new drivers.
                  </p>
                </div>

                {/* Share Links */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-4">Share This Article</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blog/tag/${tag}`}
                        className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 order-1 md:order-2">
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* CTA */}
              <div className="bg-primary/10 p-8 rounded-lg mt-12">
                <h3 className="text-xl font-bold mb-4">Ready to Start Your Driving Journey?</h3>
                <p className="mb-6">
                  Put these tips into practice with professional instruction from our experienced driving instructors.
                </p>
                <Button asChild>
                  <Link href="/lessons">View Our Driving Lessons</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                <Link href={`/blog/${post.id}`}>
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
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
                    <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">{post.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

