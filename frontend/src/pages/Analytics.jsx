import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, } from "recharts";
import { BarChart3, Calendar, TrendingUp, PieChart as PieChartIcon, Download, AlertCircle, Clock, BookOpen, Brain, Trophy, ArrowUpRight, CheckCircle2 } from "lucide-react";
const Analytics = () => {
    const [timeRange, setTimeRange] = useState("month");
    // Sample data for charts
    const performanceData = [
        { date: "Week 1", score: 65 },
        { date: "Week 2", score: 70 },
        { date: "Week 3", score: 75 },
        { date: "Week 4", score: 68 },
        { date: "Week 5", score: 82 },
        { date: "Week 6", score: 85 },
        { date: "Week 7", score: 78 },
        { date: "Week 8", score: 90 },
    ];
    const categoryPerformance = [
        { name: "Computer Science", value: 85 },
        { name: "Mathematics", value: 65 },
        { name: "Language", value: 78 },
        { name: "Science", value: 72 },
        { name: "History", value: 80 },
    ];
    const weeklyActivity = [
        { day: "Mon", hours: 2.5 },
        { day: "Tue", hours: 1.8 },
        { day: "Wed", hours: 3.2 },
        { day: "Thu", hours: 2.0 },
        { day: "Fri", hours: 1.5 },
        { day: "Sat", hours: 4.0 },
        { day: "Sun", hours: 2.8 },
    ];
    const skillRadarData = [
        { subject: "Memory", A: 85, fullMark: 100 },
        { subject: "Application", A: 70, fullMark: 100 },
        { subject: "Analysis", A: 65, fullMark: 100 },
        { subject: "Evaluation", A: 60, fullMark: 100 },
        { subject: "Creation", A: 55, fullMark: 100 },
        { subject: "Understanding", A: 75, fullMark: 100 },
    ];
    const COLORS = ["#3F9FFF", "#8760FF", "#FF6384", "#36A2EB", "#FFCE56"];
    return (<div className="container mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress and identify areas for improvement
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2"/>
              <SelectValue placeholder="Select timeframe"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4"/>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Quiz Average
                </p>
                <h3 className="text-2xl font-bold">78%</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1"/>
                  +5% improvement
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Brain className="h-6 w-6 text-blue-600"/>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Study Time
                </p>
                <h3 className="text-2xl font-bold">18.5 hrs</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1"/>
                  +2.5 hrs this week
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-purple-600"/>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Materials Covered
                </p>
                <h3 className="text-2xl font-bold">14</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1"/>
                  +3 this month
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-green-600"/>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Completed Quizzes
                </p>
                <h3 className="text-2xl font-bold">22</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircle2 className="h-3 w-3 mr-1"/>
                  2 this week
                </p>
              </div>
              <div className="bg-amber-100 rounded-full p-3">
                <Trophy className="h-6 w-6 text-amber-600"/>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2"/>
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance">
            <TrendingUp className="h-4 w-4 mr-2"/>
            Performance
          </TabsTrigger>
          <TabsTrigger value="subjects">
            <PieChartIcon className="h-4 w-4 mr-2"/>
            Subject Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Progression</CardTitle>
                <CardDescription>
                  Your quiz score trends over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="date"/>
                      <YAxis domain={[0, 100]}/>
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#3F9FFF" strokeWidth={2} activeDot={{ r: 8 }} name="Quiz Score"/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Activity</CardTitle>
                <CardDescription>
                  Hours spent studying per day
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="day"/>
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" name="Study Hours" fill="#8760FF" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Insights</CardTitle>
              <CardDescription>AI-powered recommendations based on your activity</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <TrendingUp className="h-5 w-5 text-blue-600"/>
                    </div>
                    <div>
                      <h3 className="font-medium">Progress Trend</h3>
                      <p className="text-sm text-gray-600">
                        Your performance is steadily improving! Continue with your current study habits.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-amber-50 border-amber-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <AlertCircle className="h-5 w-5 text-amber-600"/>
                    </div>
                    <div>
                      <h3 className="font-medium">Focus Area</h3>
                      <p className="text-sm text-gray-600">
                        Mathematics needs attention. Consider dedicating 30% more time to this subject.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50 border-green-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600"/>
                    </div>
                    <div>
                      <h3 className="font-medium">Strength</h3>
                      <p className="text-sm text-gray-600">
                        Computer Science shows exceptional results. You're in the top 10% of performers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Areas</CardTitle>
                <CardDescription>
                  Cognitive skill breakdown based on Bloom's taxonomy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject"/>
                      <PolarRadiusAxis domain={[0, 100]}/>
                      <Radar name="Skills" dataKey="A" stroke="#8760FF" fill="#8760FF" fillOpacity={0.6}/>
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance by Question Type</CardTitle>
                <CardDescription>
                  Your score breakdown by question format
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
            { type: "Multiple Choice", score: 85 },
            { type: "True/False", score: 90 },
            { type: "Short Answer", score: 65 },
            { type: "Fill-in-blank", score: 70 },
            { type: "Essay", score: 60 },
        ]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="type"/>
                      <YAxis domain={[0, 100]}/>
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#3F9FFF" name="Score" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Opportunities</CardTitle>
              <CardDescription>
                AI-identified areas where focused study can improve performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                        <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/>
                        <path d="M15 3v6h6"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Short Answer Questions</h3>
                      <p className="text-sm text-muted-foreground">
                        Your performance on short answer questions is below average
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Practice Now</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                        <path d="M10 9H8"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Application Knowledge</h3>
                      <p className="text-sm text-muted-foreground">
                        Focus on applying concepts to practical scenarios
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Practice Now</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Concept Relationships</h3>
                      <p className="text-sm text-muted-foreground">
                        Work on connecting related concepts across different topics
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Practice Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Your average scores by subject area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryPerformance} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryPerformance.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Time Distribution</CardTitle>
                <CardDescription>
                  How you allocate study time by subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
            { subject: "Computer Science", hours: 12.5 },
            { subject: "Mathematics", hours: 8.2 },
            { subject: "Language", hours: 5.5 },
            { subject: "Science", hours: 9.8 },
            { subject: "History", hours: 4.0 },
        ]} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                      <XAxis type="number"/>
                      <YAxis dataKey="subject" type="category" scale="band" width={100}/>
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" name="Study Hours" fill="#8760FF" radius={[0, 4, 4, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subject Recommendations</CardTitle>
              <CardDescription>
                Personalized recommendations for each subject area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryPerformance.map((subject, index) => (<div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{subject.name}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${subject.value >= 80
                ? "bg-green-100 text-green-800"
                : subject.value >= 70
                    ? "bg-blue-100 text-blue-800"
                    : subject.value >= 60
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"}`}>
                        {subject.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{
                width: `${subject.value}%`,
                backgroundColor: COLORS[index % COLORS.length],
            }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {subject.value >= 80
                ? "Excellent! Continue with advanced topics."
                : subject.value >= 70
                    ? "Good progress. Focus on strengthening core concepts."
                    : subject.value >= 60
                        ? "Needs improvement. Consider spending more time on fundamentals."
                        : "Requires attention. Create a structured study plan."}
                    </p>
                  </div>))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
};
export default Analytics;
