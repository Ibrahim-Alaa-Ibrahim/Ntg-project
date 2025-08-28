"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  User,
  Calendar,
  CreditCard,
  Bell,
  Settings,
  TrendingUp,
  Award,
  BookOpen,
  Download,
  Eye,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Users,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

// Mock data for parent dashboard
const parentData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  subscriptionPlan: "Family Plan",
  subscriptionStatus: "Active",
  nextBilling: "2024-03-15",
  monthlySpent: 29.99,
}

const children = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "🦸",
    level: 12,
    totalXP: 2450,
    coursesEnrolled: 2,
    coursesCompleted: 1,
    badgesEarned: 15,
    weeklyProgress: 85,
    lastActive: "2024-01-15",
    currentStreak: 7,
    courses: [
      {
        name: "Python Adventures",
        progress: 65,
        timeSpent: "12h 30m",
        lastLesson: "Creating Your First Game",
        status: "in-progress",
      },
      {
        name: "Scratch Basics",
        progress: 100,
        timeSpent: "8h 15m",
        lastLesson: "Final Project",
        status: "completed",
        certificate: true,
      },
    ],
  },
  {
    id: 2,
    name: "Alex",
    age: 12,
    avatar: "🧙",
    level: 18,
    totalXP: 3890,
    coursesEnrolled: 3,
    coursesCompleted: 2,
    badgesEarned: 23,
    weeklyProgress: 92,
    lastActive: "2024-01-14",
    currentStreak: 12,
    courses: [
      {
        name: "Web Design Magic",
        progress: 45,
        timeSpent: "15h 20m",
        lastLesson: "CSS Animations",
        status: "in-progress",
      },
      {
        name: "JavaScript Fundamentals",
        progress: 100,
        timeSpent: "22h 45m",
        lastLesson: "Building a Calculator",
        status: "completed",
        certificate: true,
      },
      {
        name: "Python Basics",
        progress: 100,
        timeSpent: "18h 30m",
        lastLesson: "Final Project Showcase",
        status: "completed",
        certificate: true,
      },
    ],
  },
]

const notifications = [
  {
    id: 1,
    type: "achievement",
    title: "Emma earned a new badge!",
    description: "Speed Demon - Completed lesson in record time",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "progress",
    title: "Alex completed JavaScript Fundamentals",
    description: "Certificate is now available for download",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "billing",
    title: "Payment successful",
    description: "Your Family Plan has been renewed for another month",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    type: "course",
    title: "New course available",
    description: "Mobile App Development for Teens is now live",
    time: "1 week ago",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "achievement":
      return <Award className="w-4 h-4 text-yellow-500" />
    case "progress":
      return <TrendingUp className="w-4 h-4 text-green-500" />
    case "billing":
      return <CreditCard className="w-4 h-4 text-blue-500" />
    case "course":
      return <BookOpen className="w-4 h-4 text-purple-500" />
    default:
      return <Bell className="w-4 h-4 text-gray-500" />
  }
}

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0])
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-fun rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-gray-900">Learn2Code</span>
            <Badge className="ml-2 bg-blue-100 text-blue-800">Parent Portal</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{parentData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {parentData.name.split(" ")[0]}!</h1>
          <p className="text-gray-600">Track your children's coding progress and manage your account</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold text-gray-900">{children.length}</div>
                      <div className="text-sm text-gray-600">Children</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold text-gray-900">
                        {children.reduce((sum, child) => sum + child.coursesEnrolled, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Active Courses</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-2xl font-bold text-gray-900">
                        {children.reduce((sum, child) => sum + child.badgesEarned, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Badges Earned</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(children.reduce((sum, child) => sum + child.weeklyProgress, 0) / children.length)}%
                      </div>
                      <div className="text-sm text-gray-600">Avg. Weekly Progress</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Children Overview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Your Children</h3>
                  {children.map((child) => (
                    <Card key={child.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-2xl">
                            {child.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                                <p className="text-gray-600">
                                  {child.age} years old • Level {child.level}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                  <span>Last active: {new Date(child.lastActive).toLocaleDateString()}</span>
                                  <span>{child.currentStreak} day streak</span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedChild(child)}
                                className="bg-transparent"
                              >
                                View Details
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-lg font-semibold text-blue-600">{child.coursesEnrolled}</div>
                                <div className="text-xs text-blue-700">Courses Enrolled</div>
                              </div>
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-lg font-semibold text-green-600">{child.badgesEarned}</div>
                                <div className="text-xs text-green-700">Badges Earned</div>
                              </div>
                              <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-lg font-semibold text-purple-600">{child.totalXP}</div>
                                <div className="text-xs text-purple-700">Total XP</div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600">Weekly Progress</span>
                                <span className="font-semibold text-gray-900">{child.weeklyProgress}%</span>
                              </div>
                              <Progress value={child.weeklyProgress} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Child Selector */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Child</CardTitle>
                    <CardDescription>View detailed progress for each child</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {children.map((child) => (
                        <Button
                          key={child.id}
                          variant={selectedChild.id === child.id ? "default" : "outline"}
                          onClick={() => setSelectedChild(child)}
                          className="flex items-center gap-2"
                        >
                          <span className="text-lg">{child.avatar}</span>
                          {child.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Child Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{selectedChild.avatar}</span>
                      {selectedChild.name}'s Progress
                    </CardTitle>
                    <CardDescription>
                      Level {selectedChild.level} • {selectedChild.totalXP} XP • {selectedChild.currentStreak} day
                      streak
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Course Progress */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Course Progress</h4>
                      <div className="space-y-4">
                        {selectedChild.courses.map((course, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-medium text-gray-900">{course.name}</h5>
                                <p className="text-sm text-gray-600">Last lesson: {course.lastLesson}</p>
                                <p className="text-sm text-gray-500">Time spent: {course.timeSpent}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={
                                    course.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {course.status === "completed" ? "Completed" : "In Progress"}
                                </Badge>
                                {course.certificate && (
                                  <Button size="sm" variant="outline" className="bg-transparent">
                                    <Download className="w-4 h-4 mr-1" />
                                    Certificate
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-gray-900">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificates & Achievements</CardTitle>
                    <CardDescription>Download and share your children's accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {children.map((child) => (
                        <div key={child.id}>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-lg">{child.avatar}</span>
                            {child.name}'s Certificates
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {child.courses
                              .filter((course) => course.certificate)
                              .map((course, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h5 className="font-medium text-gray-900">{course.name}</h5>
                                      <p className="text-sm text-gray-600">Completed course</p>
                                      <p className="text-sm text-gray-500">Time spent: {course.timeSpent}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="bg-transparent">
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button size="sm" variant="outline" className="bg-transparent">
                                        <Download className="w-4 h-4 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                {/* Subscription Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>Manage your Learn2Code subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Current Plan</h4>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-blue-900">{parentData.subscriptionPlan}</span>
                            <Badge className="bg-green-100 text-green-800">{parentData.subscriptionStatus}</Badge>
                          </div>
                          <p className="text-sm text-blue-700 mb-3">Access to all courses for up to 4 children</p>
                          <div className="text-2xl font-bold text-blue-900">${parentData.monthlySpent}/month</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Billing Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Next billing date:</span>
                            <span className="font-medium text-gray-900">
                              {new Date(parentData.nextBilling).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Payment method:</span>
                            <span className="font-medium text-gray-900">•••• •••• •••• 4242</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Auto-renewal:</span>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" className="bg-transparent">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Payment History
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Change Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{notification.description}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/parent/courses">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/parent/reports">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/parent/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/support">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Get Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">Safe Learning Environment</h4>
                    <p className="text-sm text-green-800">
                      Your children are learning in a secure, monitored environment with age-appropriate content and
                      parental controls.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
