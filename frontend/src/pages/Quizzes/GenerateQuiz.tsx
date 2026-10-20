import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Brain, FileText, Loader2, Sparkles, BookOpen, Globe, Key } from "lucide-react";
import { saveGeneratedQuiz, generateSmartQuestionsFromText } from "@/lib/quizStore";

const callDirectGeminiApi = async (key, contentToAnalyze, questionCount, difficulty, includeExplanations) => {
    const prompt = `You are an expert quiz author. Create a structured multiple-choice quiz based strictly on the provided text.

Requirements:
- Generate EXACTLY ${questionCount} unique, distinct multiple-choice questions.
- Target difficulty level: ${difficulty}.
- Each question must have EXACTLY 4 distinct, plausible options.
- "correctAnswer" MUST be an integer index from 0 to 3 corresponding to the correct option in "options".
- ${includeExplanations ? 'Provide a helpful 1-2 sentence explanation for each correct answer.' : 'Keep explanations empty.'}

Source Content:
"""
${contentToAnalyze.trim()}
"""

Respond ONLY with a valid JSON object adhering strictly to this schema:
{
  "title": "Specific title summarizing the main topic (3-6 words)",
  "description": "One sentence summary of what this quiz covers",
  "category": "Subject category (e.g. Science, Technology, History, General)",
  "questions": [
    {
      "id": "q1",
      "question": "Clear question text asking about a specific fact or concept",
      "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
      "correctAnswer": 0,
      "explanation": "Explanation for correct answer"
    }
  ]
}`;

    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'];
    for (const modelName of modelsToTry) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key.trim()}`;
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            if (!res.ok) continue;
            const data = await res.json();
            const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResult) {
                const cleanedStr = textResult.replace(/```json/gi, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(cleanedStr);
                if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn(`Direct Gemini REST API with ${modelName} failed:`, e);
        }
    }
    return null;
};

export const GenerateQuiz = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("custom");
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState("medium");
    const [includeExplanations, setIncludeExplanations] = useState(true);
    const [customText, setCustomText] = useState("");
    const [topicType, setTopicType] = useState("general");
    const [topic, setTopic] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) setApiKey(storedKey);
    }, []);

    const handleSaveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem("gemini_api_key", key);
    };

    const materials = [
        { id: "1", title: "Introduction to Machine Learning", type: "pdf" },
        { id: "2", title: "Advanced JavaScript Concepts", type: "video" },
        { id: "3", title: "Data Structures & Algorithms", type: "document" },
        { id: "4", title: "English Grammar Basics", type: "document" },
        { id: "5", title: "History of Ancient Rome", type: "audio" },
        { id: "6", title: "Physics Fundamentals", type: "pdf" },
    ];

    const topicOptions = {
        general: ["Environment", "Science", "Technology", "Culture", "Arts"],
        current: ["Politics", "Economics", "World News", "Social Issues", "Innovations"],
        academic: ["Mathematics", "Literature", "Biology", "Computer Science", "Physics"],
        professional: ["Marketing", "Finance", "Project Management", "Leadership", "Communication"],
    };

    const handleToggleMaterial = (id) => {
        setSelectedMaterials((prev) => prev.includes(id)
            ? prev.filter((materialId) => materialId !== id)
            : [...prev, id]);
    };

    const handleGenerateQuiz = async () => {
        if (activeTab === "material" && selectedMaterials.length === 0) {
            toast({
                title: "Materials required",
                description: "Please select at least one learning material",
                variant: "destructive",
            });
            return;
        }
        if (activeTab === "custom" && !customText.trim()) {
            toast({
                title: "Content required",
                description: "Please enter or paste text content to generate questions from",
                variant: "destructive",
            });
            return;
        }
        if (activeTab === "topic" && !topic) {
            toast({
                title: "Topic required",
                description: "Please select or enter a topic",
                variant: "destructive",
            });
            return;
        }

        setIsGenerating(true);

        let contentToAnalyze = "";
        if (activeTab === "custom") {
            contentToAnalyze = customText.trim();
        } else if (activeTab === "topic") {
            contentToAnalyze = `Subject topic: ${topic}. Category: ${topicType}. Generate comprehensive learning questions about ${topic}.`;
        } else {
            const selectedTitles = materials
                .filter((m) => selectedMaterials.includes(m.id))
                .map((m) => m.title)
                .join(", ");
            contentToAnalyze = `Learning materials: ${selectedTitles}. Generate comprehensive quiz questions testing comprehension of these topics.`;
        }

        try {
            let data = null;
            try {
                const response = await fetch("http://localhost:5000/api/ai/generate-quiz", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-gemini-api-key": apiKey.trim(),
                    },
                    body: JSON.stringify({
                        customText: contentToAnalyze,
                        questionCount,
                        difficulty,
                        includeExplanations,
                        apiKey: apiKey.trim(),
                    }),
                });
                const resData = await response.json();
                if (resData.success && resData.questions && resData.questions.length > 0) {
                    data = resData;
                }
            } catch (errBackend) {
                console.warn("Backend API not reachable:", errBackend.message);
            }

            if (!data && apiKey.trim()) {
                const directResult = await callDirectGeminiApi(apiKey.trim(), contentToAnalyze, questionCount, difficulty, includeExplanations);
                if (directResult && directResult.questions && directResult.questions.length > 0) {
                    data = {
                        success: true,
                        title: directResult.title,
                        description: directResult.description,
                        category: directResult.category,
                        questions: directResult.questions,
                    };
                }
            }

            if (data && data.questions && data.questions.length > 0) {
                const quizId = `ai_quiz_${Date.now()}`;
                const newQuizMeta = {
                    id: quizId,
                    title: data.title || (activeTab === "custom" ? "Custom Text AI Quiz" : topic ? `${topic} Quiz` : "AI Generated Quiz"),
                    description: data.description || `AI generated quiz (${data.questions.length} questions)`,
                    category: data.category || (activeTab === "topic" ? topicType : "AI Generated"),
                    questionsCount: data.questions.length,
                    completionPercentage: 0,
                    createdAt: new Date().toISOString().split("T")[0],
                    source: "ai",
                    difficulty: difficulty,
                };

                saveGeneratedQuiz(newQuizMeta, data.questions);

                toast({
                    title: "✨ Quiz Generated with Gemini AI!",
                    description: `Successfully created "${newQuizMeta.title}" with ${data.questions.length} questions. Redirecting...`,
                });

                setTimeout(() => {
                    navigate(`/quiz/${quizId}`);
                }, 800);
                return;
            }

            const quizId = `quiz_${Date.now()}`;
            let fallbackTitle = "Custom Text Quiz";
            if (activeTab === "custom") {
                const firstLine = customText.trim().split("\n")[0].trim();
                if (firstLine.length > 3 && firstLine.length < 60) {
                    fallbackTitle = `${firstLine} Quiz`;
                } else {
                    fallbackTitle = "Custom Text Quiz";
                }
            } else if (activeTab === "topic") {
                fallbackTitle = `${topic} Quiz`;
            } else {
                fallbackTitle = "Selected Materials Quiz";
            }

            const fallbackQuestions = generateSmartQuestionsFromText(contentToAnalyze, fallbackTitle, questionCount);
            const newQuizMeta = {
                id: quizId,
                title: fallbackTitle,
                description: `Practice quiz generated for ${fallbackTitle} (${questionCount} questions)`,
                category: activeTab === "topic" ? topicType : "General",
                questionsCount: questionCount,
                completionPercentage: 0,
                createdAt: new Date().toISOString().split("T")[0],
                source: activeTab === "custom" ? "custom" : "ai",
                difficulty: difficulty,
            };

            saveGeneratedQuiz(newQuizMeta, fallbackQuestions);

            toast({
                title: "Quiz Created Successfully!",
                description: `Generated "${newQuizMeta.title}" with ${questionCount} questions. Redirecting...`,
            });

            setTimeout(() => {
                navigate(`/quiz/${quizId}`);
            }, 800);
        } catch (err) {
            console.error("Error in quiz generation:", err);
            toast({
                title: "Generation Failed",
                description: err.message || "Failed to generate quiz questions.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="container mx-auto animate-fadeIn pb-12">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Generate Quiz</h1>
                    <p className="text-muted-foreground">
                        Create AI-generated quizzes from custom text, materials, or topics using Gemini AI
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                    className="flex items-center gap-2 border-emerald-200 text-[#0b7c00] bg-emerald-50/50 hover:bg-emerald-100"
                >
                    <Key className="h-4 w-4 text-[#10bc00]" />
                    {apiKey ? "Gemini API Key Configured" : "Set Gemini API Key"}
                </Button>
            </div>

            {showApiKeyInput && (
                <Card className="mb-6 border-emerald-200 bg-emerald-50/30">
                    <CardHeader className="py-3 px-4">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Key className="h-4 w-4 text-[#10bc00]" /> Google Gemini API Key
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Enter your Google Gemini API key below to enable live AI quiz generation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 px-4 pb-4">
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="AIzaSy..."
                                value={apiKey}
                                onChange={(e) => handleSaveApiKey(e.target.value)}
                                className="max-w-md bg-white text-sm"
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    toast({ title: "API Key Saved", description: "Your Gemini API Key has been saved locally." });
                                    setShowApiKeyInput(false);
                                }}
                            >
                                Save Key
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quiz Source</CardTitle>
                            <CardDescription>
                                Select where to generate quiz questions from
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="custom" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                                <TabsList className="grid grid-cols-3">
                                    <TabsTrigger value="custom">
                                        <BookOpen className="h-4 w-4 mr-2"/>
                                        Custom Text
                                    </TabsTrigger>
                                    <TabsTrigger value="material">
                                        <FileText className="h-4 w-4 mr-2"/>
                                        My Materials
                                    </TabsTrigger>
                                    <TabsTrigger value="topic">
                                        <Globe className="h-4 w-4 mr-2"/>
                                        General Topic
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="custom" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="custom-text">Enter or paste content</Label>
                                        <Textarea
                                            id="custom-text"
                                            placeholder="Paste text from your notes, articles, research, or any learning content..."
                                            className="min-h-[220px] font-sans leading-relaxed"
                                            value={customText}
                                            onChange={(e) => setCustomText(e.target.value)}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="material" className="space-y-4">
                                    <div className="space-y-2">
                                        {materials.map((m) => (
                                            <div
                                                key={m.id}
                                                onClick={() => handleToggleMaterial(m.id)}
                                                className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center ${
                                                    selectedMaterials.includes(m.id)
                                                        ? "border-[#10bc00] bg-emerald-50/50"
                                                        : "border-slate-200"
                                                }`}
                                            >
                                                <span className="font-semibold text-xs">{m.title}</span>
                                                <Badge variant="outline">{m.type}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="topic" className="space-y-4">
                                    <div className="space-y-3">
                                        <Label>Select Category &amp; Topic</Label>
                                        <Input
                                            type="text"
                                            placeholder="e.g. Machine Learning, Ancient History, Quantum Physics..."
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quiz Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Number of Questions: {questionCount}</Label>
                                <Slider
                                    value={[questionCount]}
                                    min={5}
                                    max={20}
                                    step={1}
                                    onValueChange={(val) => setQuestionCount(val[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="difficulty">Difficulty Level</Label>
                                <Select value={difficulty} onValueChange={setDifficulty}>
                                    <SelectTrigger id="difficulty">
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                onClick={handleGenerateQuiz}
                                disabled={isGenerating}
                                className="w-full bg-[#10bc00] hover:bg-[#0b7c00] text-white font-bold h-11"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Generating Quiz...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" /> Generate Quiz Now
                                    </span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GenerateQuiz;
