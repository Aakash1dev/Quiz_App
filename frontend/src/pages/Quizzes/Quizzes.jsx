import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Filter, Search, Brain, CheckCircle2, Play, ClipboardList, MoreVertical, Trash2, Edit, Copy, ArrowUpRight, FileText } from "lucide-react";
import { getSavedResults } from "@/lib/quizStore";

export const Quizzes = () => {
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
        const userQuizzesRaw = localStorage.getItem("eduvisio_user_quizzes");
        let combinedQuizzes = [...quizzes];
        if (userQuizzesRaw) {
            try {
                const userQuizzes = JSON.parse(userQuizzesRaw);
                const userQuizIds = new Set(userQuizzes.map((q) => q.id));
                combinedQuizzes = [
                    ...userQuizzes,
                    ...quizzes.filter((q) => !userQuizIds.has(q.id)),
                ];
            } catch (e) {
                console.error("Failed to load custom user quizzes", e);
            }
        }

        setQuizzes(
            combinedQuizzes.map((quiz) => {
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
        const filtered = quizzes.filter((quiz) => quiz.id !== id);
        setQuizzes(filtered);
        try {
            const userQuizzesRaw = localStorage.getItem("eduvisio_user_quizzes");
            if (userQuizzesRaw) {
                const userQuizzes = JSON.parse(userQuizzesRaw).filter((q) => q.id !== id);
                localStorage.setItem("eduvisio_user_quizzes", JSON.stringify(userQuizzes));
            }
            localStorage.removeItem(`eduvisio_questions_${id}`);
        } catch (e) {
            console.error("Failed to update localStorage on delete", e);
        }
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
                        <Button className="bg-[#10bc00] hover:bg-[#0b7c00] text-white">
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
            </Tabs>
        </div>
    );
};

const QuizCard = ({ quiz, onDelete, onDuplicate, formatDate, getSourceBadge, getDifficultyBadge }) => {
    return (
        <Card className="flex flex-col justify-between hover:border-emerald-200 transition-all shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-muted-foreground">{quiz.category}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDuplicate(quiz.id)}>
                                <Copy className="h-4 w-4 mr-2" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(quiz.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <CardTitle className="text-lg mt-1">{quiz.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex gap-2">
                    {getSourceBadge(quiz.source)}
                    {getDifficultyBadge(quiz.difficulty)}
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                    <span>{quiz.questionsCount} Questions</span>
                    {quiz.score !== undefined && <span className="font-bold text-[#10bc00]">{quiz.score}% Score</span>}
                </div>
            </CardContent>
            <CardFooter className="pt-3 border-t border-slate-100">
                <Link to={`/quiz/${quiz.id}`} className="w-full">
                    <Button className="w-full bg-[#10bc00] hover:bg-[#0b7c00] text-white text-xs font-semibold">
                        <Play className="h-3.5 w-3.5 mr-1.5" /> Start Quiz
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

const EmptyQuizState = ({ message = "No quizzes found." }) => (
    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-800">{message}</h4>
        <p className="text-xs text-slate-500 mt-1">Generate a new quiz from text or materials to start learning.</p>
        <Link to="/generate-quiz" className="inline-block mt-4">
            <Button className="bg-[#10bc00] hover:bg-[#0b7c00] text-white text-xs">Generate Quiz</Button>
        </Link>
    </div>
);

export default Quizzes;
