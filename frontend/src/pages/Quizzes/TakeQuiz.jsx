import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowLeft,
  RotateCcw,
  BarChart3,
  Award,
  BookOpen,
  Check,
  Pause,
  Play,
  Sparkles,
  List
} from "lucide-react";
import { getQuestionsForQuiz, saveQuizResult, getSavedResults } from "@/lib/quizStore";

export const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const [timeRemaining, setTimeRemaining] = useState(300);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
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
    setTimeRemaining(loadedQuestions.length * 60);

    const saved = getSavedResults();
    if (saved[id]) {
      setScoreResult(saved[id]);
    }
  }, [id]);

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
          <Brain className="h-12 w-12 animate-pulse text-[#10bc00] mx-auto" />
          <p className="text-gray-500 font-medium">Loading Quiz Questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  if (isSubmitted && scoreResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6 pb-12 animate-fadeIn">
        <Card className="bg-gradient-to-r from-[#10bc00] to-[#0b7c00] text-white shadow-xl overflow-hidden border-0">
          <CardContent className="p-8 text-center space-y-4 relative">
            <div className="inline-flex p-3 rounded-full bg-white/20 backdrop-blur-md mb-2">
              <Award className="h-12 w-12 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold">Quiz Performance Summary</h1>
            <p className="text-white/90 text-sm max-w-md mx-auto">
              {scoreResult.score >= 80
                ? "Outstanding job! You've mastered this topic."
                : scoreResult.score >= 60
                ? "Good effort! Review the explanations below to improve."
                : "Keep practicing! Review incorrect answers below."}
            </p>

            <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-semibold">Final Score</p>
                <p className="text-3xl font-extrabold text-yellow-300 mt-1">{scoreResult.score}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-semibold">Correct Answers</p>
                <p className="text-3xl font-extrabold text-green-300 mt-1">
                  {scoreResult.correctCount} / {scoreResult.totalQuestions}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-semibold">Time Taken</p>
                <p className="text-3xl font-extrabold text-white mt-1">{formatTimer(scoreResult.timeSpent)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-semibold">Grade</p>
                <p className="text-3xl font-extrabold text-purple-200 mt-1">
                  {scoreResult.score >= 90 ? "A+" : scoreResult.score >= 80 ? "A" : scoreResult.score >= 70 ? "B" : scoreResult.score >= 60 ? "C" : "F"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6">
              <Button onClick={handleRestartQuiz} variant="secondary" className="bg-white text-slate-800 hover:bg-gray-100 font-semibold">
                <RotateCcw className="h-4 w-4 mr-2" /> Retake Quiz
              </Button>
              <Link to="/quizzes">
                <Button className="bg-white text-emerald-800 hover:bg-gray-100 font-semibold">
                  <BookOpen className="h-4 w-4 mr-2 text-[#10bc00]" /> All Quizzes
                </Button>
              </Link>
              <Link to="/analytics">
                <Button className="bg-white text-emerald-800 hover:bg-gray-100 font-semibold">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#10bc00]" /> View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-[#10bc00]" />
              Correct Answers &amp; Detailed Review
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
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 pb-12">
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

        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-2 bg-gray-100 px-3.5 py-1.5 rounded-lg border">
            <Clock className={`h-4 w-4 ${timeRemaining < 60 ? "text-red-500 animate-bounce" : "text-[#10bc00]"}`} />
            <span className={`font-mono font-bold text-sm ${timeRemaining < 60 ? "text-red-600" : "text-gray-800"}`}>
              {formatTimer(timeRemaining)}
            </span>
          </div>

          <Button onClick={handleSubmitQuiz} className="bg-[#10bc00] hover:bg-[#0b7c00] text-white font-semibold">
            Submit Quiz
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectOption(currentQ.id, idx)}
              className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                userAnswers[currentQ.id] === idx
                  ? "border-[#10bc00] bg-emerald-50 text-emerald-900 font-bold"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 border text-center text-xs flex items-center justify-center font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm">{opt}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TakeQuiz;
