import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell } from "recharts";
import { BookOpen, FileText, Play, FileUp, Brain, Trophy, Clock, BarChart3, ArrowUpRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [recentMaterials, setRecentMaterials] = useState([]);
    const [recentQuizzes, setRecentQuizzes] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Load user data
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(user.name);
        }
        // Simulate loading data
        setRecentMaterials([
            {
                id: "1",
                title: "Introduction to Machine Learning",
                type: "pdf",
                icon: FileText,
                lastAccessed: "2 hours ago",
                progress: 75,
            },
            {
                id: "2",
                title: "Advanced JavaScript Concepts",
                type: "video",
                icon: Play,
                lastAccessed: "Yesterday",
                progress: 45,
            },
            {
                id: "3",
                title: "Data Structures & Algorithms",
                type: "document",
                icon: FileText,
                lastAccessed: "3 days ago",
                progress: 60,
            },
        ]);
        setRecentQuizzes([
            {
                id: "1",
                title: "Machine Learning Basics",
                score: 85,
                questionsCount: 10,
                date: "Today",
            },
            {
                id: "2",
                title: "JavaScript Fundamentals",
                score: 72,
                questionsCount: 10,
                date: "Yesterday",
            },
            {
                id: "3",
                title: "Data Structures Quiz",
                score: 80,
                questionsCount: 10,
                date: "3 days ago",
            },
        ]);
    }, []);

    const barData = [
        { name: "Mon", value: 15 },
        { name: "Tue", value: 25 },
        { name: "Wed", value: 18 },
        { name: "Thu", value: 30 },
        { name: "Fri", value: 40 },
        { name: "Sat", value: 20 },
        { name: "Sun", value: 10 },
    ];

    const subjectData = [
        { name: "Computer Science", value: 40 },
        { name: "Mathematics", value: 25 },
        { name: "Language", value: 15 },
        { name: "Science", value: 20 },
    ];

    return (
        <div className="container mx-auto animate-fadeIn">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userName || "Learner"}</h1>
                <p className="text-muted-foreground">
                    Here's an overview of your learning journey
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                    Learning Time
                                </p>
                                <h3 className="text-2xl font-bold">12.5 hrs</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-3 w-3 mr-1"/>
                                    +2.5 hrs this week
                                </p>
                            </div>
                            <div className="bg-brand-100 rounded-full p-3">
                                <Clock className="h-6 w-6 text-brand-600"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                    Materials
                                </p>
                                <h3 className="text-2xl font-bold">24</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-3 w-3 mr-1"/>
                                    +3 new
                                </p>
                            </div>
                            <div className="bg-accent1-100 rounded-full p-3">
                                <FileText className="h-6 w-6 text-accent1-600"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                    Quizzes Completed
                                </p>
                                <h3 className="text-2xl font-bold">18</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-3 w-3 mr-1"/>
                                    +5 this week
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
                                    Avg. Quiz Score
                                </p>
                                <h3 className="text-2xl font-bold">82%</h3>
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <ArrowUpRight className="h-3 w-3 mr-1"/>
                                    +4% improvement
                                </p>
                            </div>
                            <div className="bg-yellow-100 rounded-full p-3">
                                <Trophy className="h-6 w-6 text-yellow-600"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Learning Progress Card */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Learning Activity</CardTitle>
                        <CardDescription>Your daily learning activity over the week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <BarChart width={500} height={250} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3F9FFF" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3F9FFF" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name"/>
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="url(#colorValue)" radius={[4, 4, 0, 0]} name="Minutes"/>
                            </BarChart>
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Learning Distribution</CardTitle>
                        <CardDescription>Breakdown by subject area</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex items-center justify-center">
                            <PieChart width={250} height={250}>
                                <Pie data={subjectData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" nameKey="name">
                                    {subjectData.map((entry, index) => {
                                        const colors = ["#3F9FFF", "#6C40CC", "#FF6384", "#36A2EB"];
                                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>;
                                    })}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Recent Materials */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Materials</CardTitle>
                            <CardDescription>Continue where you left off</CardDescription>
                        </div>
                        <Link to="/materials">
                            <Button variant="ghost" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentMaterials.map((material) => (
                                <div key={material.id} className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center">
                                        <div className="bg-brand-50 p-2 rounded-md mr-3">
                                            <material.icon className="h-5 w-5 text-brand-600"/>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{material.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Last accessed: {material.lastAccessed}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-medium">{material.progress}%</div>
                                        <Progress value={material.progress} className="w-20"/>
                                    </div>
                                </div>
                            ))}
                            {recentMaterials.length === 0 && (
                                <div className="text-center py-8">
                                    <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2"/>
                                    <h4 className="text-lg font-medium mb-1">No materials yet</h4>
                                    <p className="text-muted-foreground mb-4">
                                        Upload your first learning material to get started.
                                    </p>
                                    <Link to="/upload">
                                        <Button>
                                            <FileUp className="h-4 w-4 mr-2"/>
                                            Upload Material
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Quizzes */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Quizzes</CardTitle>
                            <CardDescription>Your recent quiz scores</CardDescription>
                        </div>
                        <Link to="/quizzes">
                            <Button variant="ghost" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentQuizzes.map((quiz) => (
                                <Link key={quiz.id} to={`/quiz/${quiz.id}`} className="block border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {quiz.date} • {quiz.questionsCount} questions
                                        </p>
                                    </div>
                                    <div className={`font-medium text-sm px-2.5 py-1 rounded-full ${
                                        quiz.score >= 80
                                            ? "bg-green-100 text-green-800"
                                            : quiz.score >= 60
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                    }`}>
                                        {quiz.score}%
                                    </div>
                                </Link>
                            ))}
                            {recentQuizzes.length === 0 && (
                                <div className="text-center py-8">
                                    <Brain className="h-10 w-10 text-muted-foreground mx-auto mb-2"/>
                                    <h4 className="text-lg font-medium mb-1">No quizzes yet</h4>
                                    <p className="text-muted-foreground mb-4">
                                        Generate your first quiz to test your knowledge.
                                    </p>
                                    <Link to="/generate-quiz">
                                        <Button>
                                            <Brain className="h-4 w-4 mr-2"/>
                                            Generate Quiz
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Learning Insights */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Learning Insights</CardTitle>
                    <CardDescription>AI-powered insights to improve your learning</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                            <div className="mb-3">
                                <Lightbulb className="h-6 w-6 text-blue-600"/>
                            </div>
                            <h4 className="font-medium mb-2">Your Strongest Area</h4>
                            <p className="text-sm text-gray-700 mb-2">
                                You're performing exceptionally well in <strong>Computer Science</strong>. Keep up the good work!
                            </p>
                            <p className="text-xs text-gray-500">Based on your 10 most recent quizzes</p>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
                            <div className="mb-3">
                                <Lightbulb className="h-6 w-6 text-amber-600"/>
                            </div>
                            <h4 className="font-medium mb-2">Area to Improve</h4>
                            <p className="text-sm text-gray-700 mb-2">
                                You could improve in <strong>Mathematics</strong>. Focus on more practice in this area.
                            </p>
                            <p className="text-xs text-gray-500">Based on your learning patterns</p>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                            <div className="mb-3">
                                <Lightbulb className="h-6 w-6 text-green-600"/>
                            </div>
                            <h4 className="font-medium mb-2">Recommendation</h4>
                            <p className="text-sm text-gray-700 mb-2">
                                Try spacing out your Mathematics study sessions throughout the week for better retention.
                            </p>
                            <p className="text-xs text-gray-500">Personalized recommendation</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <FileUp className="h-8 w-8 mb-4"/>
                            <h3 className="text-lg font-medium mb-2">Upload New Materials</h3>
                            <p className="mb-4 text-brand-100">
                                Add new study materials to your personal learning library.
                            </p>
                            <Link to="/upload">
                                <Button variant="secondary" className="w-full">
                                    Upload Now
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent1-500 to-accent1-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <Brain className="h-8 w-8 mb-4"/>
                            <h3 className="text-lg font-medium mb-2">Generate Quiz</h3>
                            <p className="mb-4 text-accent1-100">
                                Create an AI-powered quiz from your learning materials.
                            </p>
                            <Link to="/generate-quiz">
                                <Button variant="secondary" className="w-full">
                                    Generate Now
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <BarChart3 className="h-8 w-8 mb-4"/>
                            <h3 className="text-lg font-medium mb-2">View Detailed Analytics</h3>
                            <p className="mb-4 text-green-100">
                                See detailed insights about your learning progress.
                            </p>
                            <Link to="/analytics">
                                <Button variant="secondary" className="w-full">
                                    View Analytics
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
