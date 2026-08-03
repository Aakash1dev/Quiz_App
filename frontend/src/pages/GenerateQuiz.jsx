import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Brain, FileText, Loader2, GraduationCap, Sparkles, BookOpen, Cog, Globe, History, BarChart } from "lucide-react";
const GenerateQuiz = () => {
    const [activeTab, setActiveTab] = useState("material");
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState("medium");
    const [includeExplanations, setIncludeExplanations] = useState(true);
    const [timeLimit, setTimeLimit] = useState(true);
    const [customText, setCustomText] = useState("");
    const [topicType, setTopicType] = useState("general");
    const [topic, setTopic] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    // Simulated materials that would normally come from an API/database
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
    const difficultyLabels = {
        easy: "Easy - Basic recall questions",
        medium: "Medium - Understanding and application questions",
        hard: "Hard - Analysis and evaluation questions",
        mixed: "Mixed - Combination of different difficulty levels",
    };
    const handleToggleMaterial = (id) => {
        setSelectedMaterials((prev) => prev.includes(id)
            ? prev.filter((materialId) => materialId !== id)
            : [...prev, id]);
    };
    const handleGenerateQuiz = () => {
        // Validate based on active tab
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
                description: "Please provide content to generate questions from",
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
        // Simulate API call to generate quiz
        setTimeout(() => {
            setIsGenerating(false);
            toast({
                title: "Quiz generated successfully!",
                description: `A new quiz with ${questionCount} questions has been created.`,
            });
            // In a real app, we would redirect to the quiz page
        }, 3000);
    };
    return (<div className="container mx-auto animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Generate Quiz</h1>
        <p className="text-muted-foreground">
          Create AI-generated quizzes to test your knowledge
        </p>
      </div>

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
              <Tabs defaultValue="material" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="material">
                    <FileText className="h-4 w-4 mr-2"/>
                    My Materials
                  </TabsTrigger>
                  <TabsTrigger value="custom">
                    <BookOpen className="h-4 w-4 mr-2"/>
                    Custom Text
                  </TabsTrigger>
                  <TabsTrigger value="topic">
                    <Globe className="h-4 w-4 mr-2"/>
                    General Topic
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="material" className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Select materials to generate questions from:
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {materials.map((material) => (<div key={material.id} className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${selectedMaterials.includes(material.id)
                ? "bg-brand-50 border border-brand-200"
                : "bg-white border hover:bg-gray-50"}`} onClick={() => handleToggleMaterial(material.id)}>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center mr-3 ${selectedMaterials.includes(material.id)
                ? "bg-brand-600 text-white"
                : "border border-gray-300"}`}>
                          {selectedMaterials.includes(material.id) && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>)}
                        </div>
                        <div>
                          <div className="font-medium">{material.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {material.type.toUpperCase()}
                          </div>
                        </div>
                      </div>))}
                  </div>

                  {materials.length === 0 && (<div className="text-center py-8">
                      <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2"/>
                      <h4 className="text-lg font-medium mb-1">No materials found</h4>
                      <p className="text-muted-foreground mb-4">
                        Upload learning materials to generate quizzes from them.
                      </p>
                      <Button>Upload Materials</Button>
                    </div>)}
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-text">Enter or paste content</Label>
                    <Textarea id="custom-text" placeholder="Paste text from your notes, articles, or any learning content..." className="min-h-[200px]" value={customText} onChange={(e) => setCustomText(e.target.value)}/>
                    <p className="text-xs text-muted-foreground">
                      The AI will analyze this text and generate relevant quiz questions.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="topic" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="topic-type">Question Category</Label>
                      <Select value={topicType} onValueChange={setTopicType}>
                        <SelectTrigger id="topic-type">
                          <SelectValue placeholder="Select category"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2"/>
                              General Knowledge
                            </div>
                          </SelectItem>
                          <SelectItem value="current">
                            <div className="flex items-center">
                              <History className="h-4 w-4 mr-2"/>
                              Current Affairs
                            </div>
                          </SelectItem>
                          <SelectItem value="academic">
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-2"/>
                              Academic Subjects
                            </div>
                          </SelectItem>
                          <SelectItem value="professional">
                            <div className="flex items-center">
                              <BarChart className="h-4 w-4 mr-2"/>
                              Professional Skills
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="topic">Specific Topic</Label>
                      <Select value={topic} onValueChange={setTopic}>
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="Select or type a topic"/>
                        </SelectTrigger>
                        <SelectContent>
                          {topicOptions[topicType].map((option) => (<SelectItem key={option} value={option.toLowerCase()}>
                              {option}
                            </SelectItem>))}
                          <SelectItem value="custom">Other (custom topic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {topic === "custom" && (<div className="grid gap-2">
                        <Label htmlFor="custom-topic">Custom Topic</Label>
                        <Input id="custom-topic" placeholder="Enter a specific topic" onChange={(e) => setTopic(e.target.value)}/>
                      </div>)}
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
              <CardDescription>Customize your quiz preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Number of Questions: {questionCount}</Label>
                  <Slider value={[questionCount]} min={5} max={30} step={5} onValueChange={(value) => setQuestionCount(value[0])}/>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5</span>
                    <span>30</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {difficultyLabels[difficulty]}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="explanations">Include Explanations</Label>
                      <p className="text-xs text-muted-foreground">
                        Show explanations for correct answers
                      </p>
                    </div>
                    <Switch id="explanations" checked={includeExplanations} onCheckedChange={setIncludeExplanations}/>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="time-limit">Enable Time Limit</Label>
                      <p className="text-xs text-muted-foreground">
                        Add a time limit for each question
                      </p>
                    </div>
                    <Switch id="time-limit" checked={timeLimit} onCheckedChange={setTimeLimit}/>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full mt-6" size="lg" onClick={handleGenerateQuiz} disabled={isGenerating}>
            {isGenerating ? (<>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                Generating Quiz...
              </>) : (<>
                <Brain className="h-4 w-4 mr-2"/>
                Generate Quiz
              </>)}
          </Button>
        </div>
      </div>

      {/* Quiz Templates Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Quick Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-blue-600"/>
                </div>
                <div>
                  <h3 className="font-medium">Current Events Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    15 questions about recent news
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-green-600"/>
                </div>
                <div>
                  <h3 className="font-medium">Academic Review</h3>
                  <p className="text-sm text-muted-foreground">
                    20 questions from your materials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Cog className="h-6 w-6 text-purple-600"/>
                </div>
                <div>
                  <h3 className="font-medium">Technical Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    10 challenging technical questions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
};
export default GenerateQuiz;
