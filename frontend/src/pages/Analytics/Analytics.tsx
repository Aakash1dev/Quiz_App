import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { BarChart3, Calendar, TrendingUp, PieChart as PieChartIcon, Download, AlertCircle, Clock, BookOpen, Brain, Trophy, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const Analytics = () => {
    const [timeRange, setTimeRange] = useState("month");
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

    return (
    <div className="container mx-auto animate-fadeIn pb-12">
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
              <div className="bg-emerald-100 rounded-full p-3">
                <Brain className="h-6 w-6 text-[#10bc00]"/>
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
                      <Line type="monotone" dataKey="score" stroke="#10bc00" strokeWidth={2.5} activeDot={{ r: 8 }} name="Quiz Score"/>
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
                      <Bar dataKey="hours" name="Study Hours" fill="#10bc00" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>);
};

export default Analytics;
