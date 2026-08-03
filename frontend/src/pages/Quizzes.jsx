import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Filter, Search, Brain, CheckCircle2, Play, ClipboardList, Star, MoreVertical, Trash2, Edit, Copy, ArrowUpRight, BarChart3, FileText } from "lucide-react";
import { getSavedResults } from "@/lib/quizStore";

const Quizzes = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [quizzes, setQuizzes] = useState([
        {
            id: "1",
            title: "Machine Learning Fundamentals",
            description: "Basic concepts of machine learning and AI",
            category: "Computer Science",
            questionsCount: 10,
            completionPercentage: 100,
            score: 85,
            createdAt: "2023-09-15",
            source: "material",
            difficulty: "medium",
        },
        {
            id: "2",
            title: "JavaScript Advanced Concepts",
            description: "In-depth look at closures, promises, and async programming",
            category: "Web Development",
            questionsCount: 10,
            completionPercentage: 100,
            score: 72,
            createdAt: "2023-09-10",
            source: "material",
            difficulty: "hard",
        },
        {
            id: "3",
            title: "Data Structures Quiz",
            description: "Test your knowledge of arrays, linked lists, and trees",
            category: "Computer Science",
            questionsCount: 10,
            completionPercentage: 80,
            createdAt: "2023-09-05",
            source: "custom",
            difficulty: "medium",
        },
        {
            id: "4",
            title: "English Grammar",
            description: "Basic English grammar rules and usage",
            category: "Language",
            questionsCount: 10,
            completionPercentage: 100,
            score: 92,
            createdAt: "2023-08-28",
            source: "material",
            difficulty: "easy",
        },
        {
            id: "5",
            title: "World History: Ancient Rome",
            description: "History of the Roman Empire and its impact",
            category: "History",
            questionsCount: 10,
            completionPercentage: 0,
            createdAt: "2023-08-20",
            source: "ai",
            difficulty: "medium",
        },
        {
            id: "6",
            title: "Physics Mechanics",
            description: "Force, motion, and energy concepts",
            category: "Science",
            questionsCount: 10,
            completionPercentage: 40,
            createdAt: "2023-08-15",
            source: "custom",
            difficulty: "hard",
        },
    ]);

    useEffect(() => {
        const savedResults = getSavedResults();
        setQuizzes((prev) =>
            prev.map((quiz) => {
                if (savedResults[quiz.id]) {
                    return {
                        ...quiz,
                        completionPercentage: 100,
                        score: savedResults[quiz.id].score,
                    };
                }
                return quiz;
            })
        );
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const deleteQuiz = (id) => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    };

    const duplicateQuiz = (id) => {
        const quizToDuplicate = quizzes.find((quiz) => quiz.id === id);
        if (quizToDuplicate) {
            const newQuiz = {
                ...quizToDuplicate,
                id: Date.now().toString(),
                title: `Copy of ${quizToDuplicate.title}`,
                completionPercentage: 0,
                score: undefined,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setQuizzes([newQuiz, ...quizzes]);
        }
    };

    const getSourceBadge = (source) => {
        switch (source) {
            case "material":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        <FileText className="h-3 w-3 mr-1"/>
                        From Materials
                    </Badge>
                );
            case "custom":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <Edit className="h-3 w-3 mr-1"/>
                        Custom Created
                    </Badge>
                );
            case "ai":
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                        <Brain className="h-3 w-3 mr-1"/>
                        AI Generated
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Easy
                    </Badge>
                );
            case "medium":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        Medium
                    </Badge>
                );
            case "hard":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Hard
                    </Badge>
                );
            case "mixed":
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                        Mixed
                    </Badge>
                );
            default:
                return null;
        }
    };

    const filteredQuizzes = quizzes.filter(
        (quiz) =>
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const completedQuizzes = filteredQuizzes.filter((quiz) => quiz.completionPercentage === 100);
    const inProgressQuizzes = filteredQuizzes.filter((quiz) => quiz.completionPercentage > 0 && quiz.completionPercentage < 100);
    const notStartedQuizzes = filteredQuizzes.filter((quiz) => quiz.completionPercentage === 0);

    return (
        <div className="container mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Quizzes</h1>
                    <p className="text-muted-foreground">
                        View, take, and manage your interactive quiz library
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                    <Link to="/generate-quiz">
                        <Button className="bg-brand-600 hover:bg-brand-700">
                            <Brain className="h-4 w-4 mr-2"/>
                            Generate New Quiz
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                    <Input
                        type="search"
                        placeholder="Search quizzes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="md:w-auto w-full">
                            <Filter className="h-4 w-4 mr-2"/>
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>All Quizzes</DropdownMenuItem>
                        <DropdownMenuItem>Completed</DropdownMenuItem>
                        <DropdownMenuItem>In Progress</DropdownMenuItem>
                        <DropdownMenuItem>Not Started</DropdownMenuItem>
                        <DropdownMenuItem>Sort by Date (Newest)</DropdownMenuItem>
                        <DropdownMenuItem>Sort by Score (Highest)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="not-started">Not Started</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                    {filteredQuizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredQuizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    onDelete={deleteQuiz}
                                    onDuplicate={duplicateQuiz}
                                    formatDate={formatDate}
                                    getSourceBadge={getSourceBadge}
                                    getDifficultyBadge={getDifficultyBadge}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyQuizState />
                    )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                    {completedQuizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedQuizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    onDelete={deleteQuiz}
                                    onDuplicate={duplicateQuiz}
                                    formatDate={formatDate}
                                    getSourceBadge={getSourceBadge}
                                    getDifficultyBadge={getDifficultyBadge}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyQuizState message="You haven't completed any quizzes yet." />
                    )}
                </TabsContent>

                <TabsContent value="in-progress" className="space-y-6">
                    {inProgressQuizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inProgressQuizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    onDelete={deleteQuiz}
                                    onDuplicate={duplicateQuiz}
                                    formatDate={formatDate}
                                    getSourceBadge={getSourceBadge}
                                    getDifficultyBadge={getDifficultyBadge}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyQuizState message="You don't have any quizzes in progress." />
                    )}
                </TabsContent>

                <TabsContent value="not-started" className="space-y-6">
                    {notStartedQuizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notStartedQuizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    onDelete={deleteQuiz}
                                    onDuplicate={duplicateQuiz}
                                    formatDate={formatDate}
                                    getSourceBadge={getSourceBadge}
                                    getDifficultyBadge={getDifficultyBadge}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyQuizState message="You don't have any unstarted quizzes." />
                    )}
                </TabsContent>
            </Tabs>

            {/* Quiz Stats Section */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-6">Quiz Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Performance</CardTitle>
                            <CardDescription>Average quiz score</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold text-brand-600">81%</div>
                                <div className="text-sm text-green-600 flex items-center">
                                    <ArrowUpRight className="h-3 w-3 mr-1"/>
                                    +5% from last month
                                </div>
                            </div>
                            <Progress value={81} className="h-2 mt-4"/>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Completion Rate</CardTitle>
                            <CardDescription>Quiz completion progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-accent1-600">
                                {Math.round((completedQuizzes.length / (filteredQuizzes.length || 1)) * 100)}%
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="text-center p-2 bg-green-50 rounded-md">
                                    <div className="text-lg font-medium text-green-600">
                                        {completedQuizzes.length}
                                    </div>
                                    <div className="text-xs text-green-700">Completed</div>
                                </div>
                                <div className="text-center p-2 bg-amber-50 rounded-md">
                                    <div className="text-lg font-medium text-amber-600">
                                        {inProgressQuizzes.length}
                                    </div>
                                    <div className="text-xs text-amber-700">In Progress</div>
                                </div>
                                <div className="text-center p-2 bg-blue-50 rounded-md">
                                    <div className="text-lg font-medium text-blue-600">
                                        {notStartedQuizzes.length}
                                    </div>
                                    <div className="text-xs text-blue-700">Not Started</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Categories</CardTitle>
                            <CardDescription>Quiz distribution by subject</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array.from(new Set(quizzes.map((quiz) => quiz.category))).map((category) => {
                                    const count = quizzes.filter((quiz) => quiz.category === category).length;
                                    return (
                                        <div key={category} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-brand-600 mr-2"></div>
                                                <span className="text-sm">{category}</span>
                                            </div>
                                            <div className="text-sm font-medium">
                                                {count} quiz{count !== 1 ? "zes" : ""}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const QuizCard = ({ quiz, onDelete, onDuplicate, formatDate, getSourceBadge, getDifficultyBadge }) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md border-gray-200 flex flex-col justify-between">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{quiz.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                            {quiz.description}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDuplicate(quiz.id)}>
                                <Copy className="h-4 w-4 mr-2"/>
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(quiz.id)} className="text-red-500">
                                <Trash2 className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                    {getSourceBadge(quiz.source)}
                    {getDifficultyBadge(quiz.difficulty)}
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                        <ClipboardList className="h-4 w-4 mr-1"/>
                        {quiz.questionsCount} questions
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1"/>
                        {formatDate(quiz.createdAt)}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="text-sm font-medium">
                            {quiz.completionPercentage === 0
                                ? "Not started"
                                : quiz.completionPercentage === 100
                                    ? "Completed"
                                    : `${quiz.completionPercentage}% completed`}
                        </div>
                        {quiz.score !== undefined && (
                            <div className="flex items-center">
                                <Star
                                    className={`h-4 w-4 mr-1 ${
                                        quiz.score >= 80
                                            ? "text-yellow-500 fill-yellow-500"
                                            : quiz.score >= 60
                                                ? "text-amber-500 fill-amber-500"
                                                : "text-gray-400 fill-gray-400"
                                    }`}
                                />
                                <span
                                    className={
                                        quiz.score >= 80
                                            ? "text-yellow-600 font-bold"
                                            : quiz.score >= 60
                                                ? "text-amber-600 font-bold"
                                                : "text-gray-600 font-bold"
                                    }
                                >
                                    {quiz.score}%
                                </span>
                            </div>
                        )}
                    </div>
                    <Progress value={quiz.completionPercentage} className="h-2" />
                </div>
            </CardContent>
            <CardFooter className="pt-3 border-t">
                <div className="flex items-center justify-between w-full gap-2">
                    <Link to={`/quiz/${quiz.id}`} className="w-1/2">
                        <Button variant="outline" size="sm" className="w-full">
                            <BarChart3 className="h-4 w-4 mr-1.5"/>
                            Results
                        </Button>
                    </Link>
                    <Link to={`/quiz/${quiz.id}`} className="w-1/2">
                        <Button size="sm" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium">
                            {quiz.completionPercentage === 0 ? (
                                <>
                                    <Play className="h-4 w-4 mr-1.5"/>
                                    Start
                                </>
                            ) : quiz.completionPercentage === 100 ? (
                                <>
                                    <BookOpen className="h-4 w-4 mr-1.5"/>
                                    Retake
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4 mr-1.5"/>
                                    Continue
                                </>
                            )}
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

const EmptyQuizState = ({ message = "You don't have any quizzes yet." }) => (
    <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4"/>
        <h3 className="text-xl font-medium mb-2">No quizzes found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>
        <Link to="/generate-quiz">
            <Button className="bg-brand-600 hover:bg-brand-700">
                <Brain className="h-4 w-4 mr-2"/>
                Generate New Quiz
            </Button>
        </Link>
    </div>
);

export default Quizzes;
