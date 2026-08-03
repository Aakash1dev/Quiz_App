import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowRight,
  ArrowLeft,
  Flag,
  RotateCcw,
  BarChart3,
  Award,
  BookOpen,
  Check,
  Pause,
  Play,
  HelpCircle,
  Sparkles,
  ChevronRight,
  List
} from "lucide-react";
import { getQuestionsForQuiz, saveQuizResult, getSavedResults } from "@/lib/quizStore";

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Navigation drawer/palette state
  const [showPalette, setShowPalette] = useState(false);

  // Load Quiz & Questions
  useEffect(() => {
    // Attempt to load quiz info from stored quizzes or defaults
    const storedQuizzesRaw = localStorage.getItem("eduvisio_user_quizzes");
    let quizTitle = "Interactive Practice Quiz";
    if (storedQuizzesRaw) {
      try {
        const storedQuizzes = JSON.parse(storedQuizzesRaw);
        const match = storedQuizzes.find((q) => q.id === id);
        if (match) quizTitle = match.title;
      } catch (e) {
        console.error(e);
      }
    } else if (id === "1") {
      quizTitle = "Machine Learning Fundamentals";
    } else if (id === "2") {
      quizTitle = "JavaScript Advanced Concepts";
    } else if (id === "3") {
      quizTitle = "Data Structures & Algorithms";
    }

    const loadedQuestions = getQuestionsForQuiz(id, quizTitle);
    setQuestions(loadedQuestions);
    setTimeRemaining(loadedQuestions.length * 60); // 1 minute per question

    // Check if result already saved previously
    const saved = getSavedResults();
    if (saved[id]) {
      setScoreResult(saved[id]);
    }
  }, [id]);

  // Timer Tick
  useEffect(() => {
    if (isSubmitted || isTimerPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, isTimerPaused, timeRemaining]);

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitQuiz = () => {
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const resultObj = {
      score: scorePercentage,
      correctCount,
      totalQuestions: questions.length,
      timeSpent,
      answers: userAnswers
    };

    setScoreResult(resultObj);
    setIsSubmitted(true);
    saveQuizResult(id, resultObj);

    toast({
      title: "Quiz Completed!",
      description: `You scored ${scorePercentage}% (${correctCount}/${questions.length} correct).`,
    });
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setScoreResult(null);
    setCurrentQuestionIndex(0);
    setTimeRemaining(questions.length * 60);
    setTimeSpent(0);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Brain className="h-12 w-12 animate-pulse text-brand-600 mx-auto" />
          <p className="text-gray-500 font-medium">Loading Quiz Questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const answeredCount = Object.keys(userAnswers).length;

  // -------------------------------------------------------------
  // RENDER RESULTS SCREEN AFTER SUBMISSION
  // -------------------------------------------------------------
  if (isSubmitted && scoreResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6 pb-12 animate-fadeIn">
        {/* Results Overview Header Card */}
        <Card className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent1-700 text-white shadow-xl overflow-hidden border-0">
          <CardContent className="p-8 text-center space-y-4 relative">
            <div className="inline-flex p-3 rounded-full bg-white/20 backdrop-blur-md mb-2">
              <Award className="h-12 w-12 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold">Quiz Performance Summary</h1>
            <p className="text-brand-100 text-sm max-w-md mx-auto">
              {scoreResult.score >= 80
                ? "Outstanding job! You've mastered this topic."
                : scoreResult.score >= 60
                ? "Good effort! Review the explanations below to improve."
                : "Keep practicing! Review incorrect answers below."}
            </p>

            <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs text-brand-200 uppercase font-semibold">Final Score</p>
                <p className="text-3xl font-extrabold text-yellow-300 mt-1">{scoreResult.score}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs text-brand-200 uppercase font-semibold">Correct Answers</p>
                <p className="text-3xl font-extrabold text-green-300 mt-1">
                  {scoreResult.correctCount} / {scoreResult.totalQuestions}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs text-brand-200 uppercase font-semibold">Time Taken</p>
                <p className="text-3xl font-extrabold text-white mt-1">{formatTimer(scoreResult.timeSpent)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs text-brand-200 uppercase font-semibold">Grade</p>
                <p className="text-3xl font-extrabold text-purple-200 mt-1">
                  {scoreResult.score >= 90 ? "A+" : scoreResult.score >= 80 ? "A" : scoreResult.score >= 70 ? "B" : scoreResult.score >= 60 ? "C" : "F"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6">
              <Button onClick={handleRestartQuiz} variant="secondary" className="bg-white text-brand-700 hover:bg-gray-100 font-semibold">
                <RotateCcw className="h-4 w-4 mr-2" /> Retake Quiz
              </Button>
              <Link to="/quizzes">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <BookOpen className="h-4 w-4 mr-2" /> All Quizzes
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <BarChart3 className="h-4 w-4 mr-2" /> View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Question Review & Correct Answers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-brand-600" />
              Correct Answers & Detailed Review
            </h2>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {scoreResult.correctCount} of {scoreResult.totalQuestions} Passed
            </Badge>
          </div>

          {questions.map((q, idx) => {
            const selectedIdx = userAnswers[q.id];
            const isCorrect = selectedIdx === q.correctAnswer;
            const isUnanswered = selectedIdx === undefined;

            return (
              <Card
                key={q.id}
                className={`border-l-4 transition-all shadow-sm ${
                  isCorrect
                    ? "border-l-green-500 bg-green-50/20"
                    : isUnanswered
                    ? "border-l-amber-500 bg-amber-50/20"
                    : "border-l-red-500 bg-red-50/20"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <CardTitle className="text-base font-semibold text-gray-900">{q.question}</CardTitle>
                      </div>
                    </div>
                    {isCorrect ? (
                      <Badge className="bg-green-600 text-white flex items-center gap-1 shrink-0">
                        <Check className="h-3.5 w-3.5" /> Correct
                      </Badge>
                    ) : isUnanswered ? (
                      <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50 shrink-0">
                        Unanswered
                      </Badge>
                    ) : (
                      <Badge className="bg-red-600 text-white flex items-center gap-1 shrink-0">
                        <XCircle className="h-3.5 w-3.5" /> Incorrect
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedIdx === optIdx;
                      const isThisCorrect = q.correctAnswer === optIdx;

                      let optClasses = "p-3 rounded-lg border text-sm flex items-center justify-between ";
                      if (isThisCorrect) {
                        optClasses += "bg-green-100 border-green-400 font-medium text-green-900";
                      } else if (isThisSelected && !isThisCorrect) {
                        optClasses += "bg-red-100 border-red-400 font-medium text-red-900";
                      } else {
                        optClasses += "bg-white border-gray-200 text-gray-700 opacity-80";
                      }

                      return (
                        <div key={optIdx} className={optClasses}>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs uppercase px-2 py-0.5 rounded bg-white/60">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isThisCorrect && (
                            <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                              <Check className="h-4 w-4" /> Correct Answer
                            </span>
                          )}
                          {isThisSelected && !isThisCorrect && (
                            <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                              <XCircle className="h-4 w-4" /> Your Selection
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-950 mb-0.5">Explanation & Reasoning:</p>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER INTERACTIVE QUIZ PLAYER INTERFACE (SPORCLE-STYLE)
  // -------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 pb-12">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={() => navigate("/quizzes")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Exit
          </Button>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">Question {currentQuestionIndex + 1} of {questions.length}</h1>
            <p className="text-xs text-gray-500">{answeredCount} of {questions.length} Answered</p>
          </div>
        </div>

        {/* Sporcle Timer Controls */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-2 bg-gray-100 px-3.5 py-1.5 rounded-lg border">
            <Clock className={`h-4 w-4 ${timeRemaining < 60 ? "text-red-500 animate-bounce" : "text-brand-600"}`} />
            <span className={`font-mono font-bold text-sm ${timeRemaining < 60 ? "text-red-600" : "text-gray-800"}`}>
              {formatTimer(timeRemaining)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-1"
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              title={isTimerPaused ? "Resume Timer" : "Pause Timer"}
            >
              {isTimerPaused ? <Play className="h-3.5 w-3.5 text-green-600" /> : <Pause className="h-3.5 w-3.5 text-gray-500" />}
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPalette(!showPalette)}
            className="flex items-center gap-1.5"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Questions Grid</span>
          </Button>

          <Button onClick={handleSubmitQuiz} className="bg-brand-600 hover:bg-brand-700 text-white font-semibold">
            Submit Quiz
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <Progress value={progressPercent} className="h-2 bg-gray-200" />
      </div>

      {/* Question Grid Navigator (Sporcle Palette) */}
      {showPalette && (
        <Card className="bg-gray-50 border shadow-inner">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b">
            <CardTitle className="text-sm font-bold text-gray-700">Question Palette</CardTitle>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-brand-600"></span> Answered</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span> Flagged</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-gray-300"></span> Pending</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];
                const isCurrent = idx === currentQuestionIndex;

                let btnStyle = "h-9 w-full rounded font-semibold text-xs transition-all relative ";
                if (isCurrent) {
                  btnStyle += "ring-2 ring-brand-600 ring-offset-1 ";
                }
                if (isAnswered) {
                  btnStyle += "bg-brand-600 text-white hover:bg-brand-700 ";
                } else if (isFlagged) {
                  btnStyle += "bg-amber-400 text-amber-950 font-bold ";
                } else {
                  btnStyle += "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 ";
                }

                return (
                  <button
                    key={q.id}
                    className={btnStyle}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setShowPalette(false);
                    }}
                  >
                    {idx + 1}
                    {isFlagged && <Flag className="h-2.5 w-2.5 absolute top-0.5 right-0.5 text-amber-900 fill-amber-900" />}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Question Display Card */}
      <Card className="shadow-md border-gray-200">
        <CardHeader className="pb-4 border-b bg-gray-50/50">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-brand-50 text-brand-700 border-brand-200 font-semibold px-2.5 py-0.5">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>

            <Button
              variant={flaggedQuestions[currentQ.id] ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggleFlag(currentQ.id)}
              className={flaggedQuestions[currentQ.id] ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-gray-600"}
            >
              <Flag className={`h-3.5 w-3.5 mr-1.5 ${flaggedQuestions[currentQ.id] ? "fill-white" : ""}`} />
              {flaggedQuestions[currentQ.id] ? "Flagged" : "Flag for Review"}
            </Button>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 pt-3 leading-snug">
            {currentQ.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((optionText, optionIdx) => {
              const isSelected = userAnswers[currentQ.id] === optionIdx;

              return (
                <div
                  key={optionIdx}
                  onClick={() => handleSelectOption(currentQ.id, optionIdx)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-brand-600 bg-brand-50/60 shadow-sm"
                      : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span
                      className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                        isSelected
                          ? "bg-brand-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + optionIdx)}
                    </span>
                    <span className="font-medium text-gray-800 text-base">{optionText}</span>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50/50 p-4 border-t flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>

          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            Select an answer to proceed
          </span>

          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)} className="bg-brand-600 hover:bg-brand-700">
              Next Question <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700 text-white font-semibold">
              Finish & Review <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TakeQuiz;
