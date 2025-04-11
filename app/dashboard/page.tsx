"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User, FileText, Award, CheckCircle, AlertCircle, ArrowRight, MapPin } from "lucide-react"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+234 123 456 7890",
  profileImage: "/placeholder.svg?height=100&width=100",
  upcomingLessons: [
    {
      id: 1,
      title: "Beginner's Course - Lesson 2",
      date: "June 25, 2023",
      time: "10:00 AM - 12:00 PM",
      instructor: "Sarah Okafor",
      location: "Ikeja Training Center",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Beginner's Course - Lesson 3",
      date: "July 2, 2023",
      time: "10:00 AM - 12:00 PM",
      instructor: "Sarah Okafor",
      location: "Ikeja Training Center",
      status: "confirmed",
    },
  ],
  completedLessons: [
    {
      id: 3,
      title: "Beginner's Course - Lesson 1",
      date: "June 18, 2023",
      time: "10:00 AM - 12:00 PM",
      instructor: "Sarah Okafor",
      location: "Ikeja Training Center",
      status: "completed",
      feedback: "Good progress on basic vehicle controls. Need to work on smooth braking.",
    },
  ],
  enrolledCourses: [
    {
      id: 1,
      title: "Beginner's Course",
      progress: 30,
      totalLessons: 10,
      completedLessons: 3,
      startDate: "June 18, 2023",
      endDate: "August 20, 2023",
    },
  ],
  certificates: [
    // Empty for new student
  ] as { title: string; date: string }[],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <section className="bg-primary text-white py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={userData.profileImage || "/placeholder.svg"}
                alt={userData.name}
                className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-white"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, {userData.name}</h1>
                <p className="text-white/80">Track your progress and manage your driving lessons</p>
              </div>
            </div>
            <div>
              <Button asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/lessons">Book New Lesson</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">My Lessons</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userData.enrolledCourses.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Completed Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userData.completedLessons.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Upcoming Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userData.upcomingLessons.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Certificates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userData.certificates.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Next Lesson */}
              {userData.upcomingLessons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Next Lesson</CardTitle>
                    <CardDescription>Upcoming scheduled driving lesson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2">{userData.upcomingLessons[0].title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-primary mr-2" />
                          <span>{userData.upcomingLessons[0].date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <span>{userData.upcomingLessons[0].time}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-primary mr-2" />
                          <span>Instructor: {userData.upcomingLessons[0].instructor}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-primary mr-2" />
                          <span>{userData.upcomingLessons[0].location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reschedule</Button>
                    <Button>View Details</Button>
                  </CardFooter>
                </Card>
              )}

              {/* Course Progress */}
              {userData.enrolledCourses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Track your learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData.enrolledCourses.map((course) => (
                      <div key={course.id} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold">{course.title}</h3>
                          <span className="text-sm text-gray-500">
                            {course.completedLessons} of {course.totalLessons} lessons completed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>Started: {course.startDate}</span>
                          <span>Expected completion: {course.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/progress">View Detailed Progress</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Recent Feedback */}
              {userData.completedLessons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>Instructor comments from your latest lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData.completedLessons.slice(0, 3).map((lesson) => (
                      <div
                        key={lesson.id}
                        className="mb-4 last:mb-0 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold">{lesson.title}</h3>
                          <span className="text-sm text-gray-500">{lesson.date}</span>
                        </div>
                        <p className="text-gray-600 italic">"{lesson.feedback}"</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Lessons Tab */}
            <TabsContent value="lessons" className="space-y-8">
              {/* Upcoming Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Lessons</CardTitle>
                  <CardDescription>Your scheduled driving lessons</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.upcomingLessons.length > 0 ? (
                    <div className="space-y-4">
                      {userData.upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="bg-primary/10 p-3 rounded-lg mr-4">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h3 className="font-bold">{lesson.title}</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Confirmed
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{lesson.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{lesson.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  <span>Instructor: {lesson.instructor}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{lesson.location}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-4">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button variant="outline" size="sm">
                                  Cancel
                                </Button>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">No Upcoming Lessons</h3>
                      <p className="text-gray-500 mb-6">
                        You don't have any scheduled lessons. Book your next lesson now.
                      </p>
                      <Button asChild>
                        <Link href="/lessons">Book a Lesson</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Completed Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle>Completed Lessons</CardTitle>
                  <CardDescription>Your lesson history and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.completedLessons.length > 0 ? (
                    <div className="space-y-4">
                      {userData.completedLessons.map((lesson) => (
                        <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="bg-gray-100 p-3 rounded-lg mr-4">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h3 className="font-bold">{lesson.title}</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Completed
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{lesson.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{lesson.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  <span>Instructor: {lesson.instructor}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{lesson.location}</span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="font-medium text-sm mb-1">Instructor Feedback:</h4>
                                <p className="text-gray-600 italic text-sm">"{lesson.feedback}"</p>
                              </div>
                              <div className="mt-4">
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">No Completed Lessons</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't completed any lessons yet. Your lesson history will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-8">
              {/* Course Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.enrolledCourses.length > 0 ? (
                    <div className="space-y-8">
                      {userData.enrolledCourses.map((course) => (
                        <div key={course.id}>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <span className="text-sm font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                              {course.progress}% Complete
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Total Lessons</div>
                              <div className="text-2xl font-bold">{course.totalLessons}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Completed</div>
                              <div className="text-2xl font-bold">{course.completedLessons}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Remaining</div>
                              <div className="text-2xl font-bold">{course.totalLessons - course.completedLessons}</div>
                            </div>
                          </div>

                          <h4 className="font-bold mb-4">Lesson Breakdown</h4>
                          <div className="space-y-2">
                            {[...Array(course.totalLessons)].map((_, index) => (
                              <div key={index} className="flex items-center">
                                {index < course.completedLessons ? (
                                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                ) : (
                                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                                )}
                                <span className={index < course.completedLessons ? "text-gray-900" : "text-gray-500"}>
                                  Lesson {index + 1}:{" "}
                                  {index === 0
                                    ? "Introduction to Driving"
                                    : index === 1
                                      ? "Basic Vehicle Controls"
                                      : index === 2
                                        ? "Road Rules and Signs"
                                        : `Lesson ${index + 1}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">No Courses Enrolled</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't enrolled in any courses yet. Browse our courses to get started.
                      </p>
                      <Button asChild>
                        <Link href="/lessons">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card>
                <CardHeader>
                  <CardTitle>Certificates</CardTitle>
                  <CardDescription>Your achievements and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userData.certificates.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                          <div className="mb-4">
                            <Award className="h-12 w-12 text-primary mx-auto" />
                          </div>
                          <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                          <p className="text-gray-500 mb-4">Issued on {cert.date}</p>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">No Certificates Yet</h3>
                      <p className="text-gray-500 mb-6">
                        Complete your courses to earn certificates. They will appear here once issued.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="mb-4">
                        <img
                          src={userData.profileImage || "/placeholder.svg"}
                          alt={userData.name}
                          className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Full Name</label>
                          <input
                            placeholder="Enter value"
                            type="text"
                            value={userData.name}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Email Address</label>
                          <input
                            placeholder="Enter value"
                            type="email"
                            value={userData.email}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Phone Number</label>
                          <input
                            placeholder="Enter value"
                            type="tel"
                            value={userData.phone}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Date of Birth</label>
                          <input
                            placeholder="Enter value"
                            type="text"
                            value="January 15, 1995"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 block mb-1">Address</label>
                        <input
                          placeholder="Enter value"
                          type="text"
                          value="123 Main Street, Lekki, Lagos"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          readOnly
                        />
                      </div>
                      <div className="pt-4">
                        <Button>Edit Profile</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive emails about your lessons and updates</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" placeholder="Enter value" name="toggle" id="email-toggle" className="sr-only" defaultChecked />
                        <label
                          htmlFor="email-toggle"
                          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-0 checked:translate-x-full"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive text messages for lesson reminders</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" placeholder="Enter value" name="toggle" id="sms-toggle" className="sr-only" defaultChecked />
                        <label
                          htmlFor="sms-toggle"
                          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-0 checked:translate-x-full"></span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-primary/5 border-t border-gray-200">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Next Lesson?</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Continue your driving journey with our expert instructors. Book your next lesson today.
          </p>
          <Button asChild size="lg">
            <Link href="/lessons">
              Book a Lesson <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

