"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Play,
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  BookOpen,
  Clock,
  ChevronRight,
  Gamepad2,
  Sparkles,
  FlameIcon as Fire,
  Crown,
} from "lucide-react"
import Link from "next/link"

// Mock data for the student
const studentData = {
  name: "Emma",
  avatar: "🦸",
  level: 12,
  totalXP: 2450,
  nextLevelXP: 2800,
  streak: 7,
  coursesCompleted: 3,
  badgesEarned: 15,
}

const currentCourses = [
  {
    id: 1,
    title: "Python Adventures",
    description: "Learn Python by building fun games",
    progress: 65,
    nextLesson: "Creating Your First Game",
    timeLeft: "25 min",
    color: "from-blue-400 to-blue-600",
    icon: Code,
    xpEarned: 450,
  },
  {
    id: 2,
    title: "Web Design Magic",
    description: "Build amazing websites with HTML & CSS",
    progress: 30,
    nextLesson: "Styling with Colors",
    timeLeft: "15 min",
    color: "from-purple-400 to-purple-600",
    icon: Sparkles,
    xpEarned: 180,
  },
]

const recentBadges = [
  { id: 1, name: "First Steps", icon: "🚀", description: "Completed your first lesson", rarity: "common" },
  { id: 2, name: "Code Warrior", icon: "⚔️", description: "Wrote 100 lines of code", rarity: "rare" },
  { id: 3, name: "Bug Hunter", icon: "🐛", description: "Fixed 10 coding errors", rarity: "epic" },
  { id: 4, name: "Creative Coder", icon: "🎨", description: "Built a colorful project", rarity: "rare" },
  { id: 5, name: "Speed Demon", icon: "⚡", description: "Completed lesson in record time", rarity: "legendary" },
  { id: 6, name: "Helper", icon: "🤝", description: "Helped a friend with coding", rarity: "common" },
]

const achievements = [
  { id: 1, title: "7-Day Streak", icon: Fire, count: 7, color: "text-orange-500" },
  { id: 2, title: "Courses Completed", icon: Trophy, count: 3, color: "text-yellow-500" },
  { id: 3, title: "Badges Earned", icon: Award, count: 15, color: "text-purple-500" },
  { id: 4, title: "XP Points", icon: Star, count: 2450, color: "text-blue-500" },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-100 text-gray-800 border-gray-300"
    case "rare":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "epic":
      return "bg-purple-100 text-purple-800 border-purple-300"
    case "legendary":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default function StudentDashboard() {
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false)
  const progressToNextLevel = ((studentData.totalXP % 350) / 350) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-fun rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-gray-900">Learn2Code</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
              <Fire className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">{studentData.streak} day streak!</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Parent View
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                {studentData.avatar}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Welcome back, {studentData.name}!</h1>
              <p className="text-xl text-gray-600 mb-4">Ready for another coding adventure?</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                  Level {studentData.level}
                </Badge>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-700">{studentData.totalXP} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold">Level Progress</h3>
                  <p className="text-blue-100">
                    {350 - (studentData.totalXP % 350)} XP to Level {studentData.level + 1}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{Math.round(progressToNextLevel)}%</div>
                  <div className="text-sm text-blue-100">Complete</div>
                </div>
              </div>
              <Progress value={progressToNextLevel} className="h-3 bg-blue-400/30" />
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <achievement.icon className={`w-8 h-8 mx-auto mb-3 ${achievement.color}`} />
                <div className="text-2xl font-heading font-bold text-gray-900 mb-1">{achievement.count}</div>
                <div className="text-sm text-gray-600">{achievement.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-900">Continue Learning</h2>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent" asChild>
                <Link href="/student/courses">View All Courses</Link>
              </Button>
            </div>

            <div className="space-y-6">
              {currentCourses.map((course) => (
                <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                      >
                        <course.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-gray-600 mb-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.timeLeft}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{course.xpEarned} XP earned</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 rounded-full">
                            {course.progress}% Complete
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Next Lesson:</p>
                            <p className="font-semibold text-gray-900">{course.nextLesson}</p>
                          </div>
                          <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 bg-transparent"
                  asChild
                >
                  <Link href="/student/courses">
                    <div className="text-center">
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">Browse Courses</span>
                    </div>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 rounded-2xl border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 bg-transparent"
                  asChild
                >
                  <Link href="/student/projects">
                    <div className="text-center">
                      <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">My Projects</span>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Badges */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-heading">
                  <Award className="w-5 h-5 text-purple-500" />
                  Recent Badges
                </CardTitle>
                <CardDescription>Your latest achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.slice(0, 4).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{badge.name}</span>
                        <Badge className={`text-xs px-2 py-0 ${getRarityColor(badge.rarity)}`}>{badge.rarity}</Badge>
                      </div>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full rounded-xl mt-4 bg-transparent" asChild>
                  <Link href="/student/badges">View All Badges</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-emerald-100">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-heading text-green-800">
                  <Target className="w-5 h-5" />
                  Daily Challenge
                </CardTitle>
                <CardDescription className="text-green-700">Complete today's coding puzzle!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-heading font-semibold text-green-900 mb-2">Loop Master</h4>
                  <p className="text-sm text-green-700 mb-4">Create a loop that prints numbers 1 to 10</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>+50 XP Bonus</span>
                  </div>
                </div>
                <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700">Start Challenge</Button>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-heading">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Class Leaderboard
                </CardTitle>
                <CardDescription>See how you rank this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Alex K.</p>
                    <p className="text-xs text-gray-600">2,890 XP</p>
                  </div>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Sarah M.</p>
                    <p className="text-xs text-gray-600">2,650 XP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border-2 border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 text-sm">Emma (You!)</p>
                    <p className="text-xs text-blue-700">2,450 XP</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-xl mt-4 bg-transparent" asChild>
                  <Link href="/student/leaderboard">View Full Leaderboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
