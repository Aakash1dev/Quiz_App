import { useState, useEffect } from "react";
import { getAdminFeedback, addAdminFeedback, respondToAdminFeedback } from "@/lib/adminStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Star, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FeedbackPage = () => {
  const { toast } = useToast();
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = parsedUser?.role === "admin";

  const [rating, setRating] = useState(5);
  const [feedbackCat, setFeedbackCat] = useState("Quiz Generation");
  const [comments, setComments] = useState("");
  const [activeTab, setActiveTab] = useState(isAdmin ? "moderator" : "submit");

  const [feedbackList, setFeedbackList] = useState([]);
  const [adminResponseText, setAdminResponseText] = useState({});

  useEffect(() => {
    setFeedbackList(getAdminFeedback());
  }, []);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      toast({
        title: "Validation Error",
        description: "Please share your feedback comments.",
        variant: "destructive",
      });
      return;
    }

    const updated = addAdminFeedback({
      user: parsedUser?.name || "Anonymous Learner",
      rating,
      category: feedbackCat,
      comment: comments.trim(),
    });

    setFeedbackList(updated);
    setComments("");
    setRating(5);
    toast({
      title: "🌟 Thank You for Your Feedback!",
      description: "Your review has been submitted to the EduVisio team.",
    });
  };

  const handleAdminRespond = (id) => {
    const text = adminResponseText[id];
    if (!text || !text.trim()) return;

    const updated = respondToAdminFeedback(id, text.trim());
    setFeedbackList(updated);

    setAdminResponseText({ ...adminResponseText, [id]: "" });
    toast({
      title: "Response Published",
      description: "Admin response attached to feedback review.",
    });
  };

  return (
    <div className="container mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center shrink-0 h-14 w-14">
            <MessageSquare className="h-7 w-7 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              User Feedback &amp; Reviews
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Share your experience, rate AI quiz features, and view community feedback.
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 max-w-xs">
          <TabsTrigger value="submit">Submit Review</TabsTrigger>
          <TabsTrigger value="moderator">View Reviews ({feedbackList.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <Card className="border-slate-200 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900">Rate Your Experience with EduVisio</CardTitle>
              <CardDescription className="text-xs">Your insights help us continuously improve our AI tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
                <div className="space-y-2">
                  <Label>Overall Rating</Label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="fb-cat">Category</Label>
                  <select
                    id="fb-cat"
                    value={feedbackCat}
                    onChange={(e) => setFeedbackCat(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
                  >
                    <option value="Quiz Generation">AI Quiz Generation</option>
                    <option value="Material Upload">Material Upload</option>
                    <option value="UI & Design">UI &amp; User Experience</option>
                    <option value="Performance">Performance &amp; Speed</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="fb-comment">Comments &amp; Suggestions</Label>
                  <Textarea
                    id="fb-comment"
                    placeholder="Tell us what you loved or how we can improve..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                  Submit Feedback Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderator" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {feedbackList.map((item) => (
              <Card key={item.id} className="border-slate-200 shadow-sm">
                <CardHeader className="py-3.5 px-5 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.user}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${
                            s <= item.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-4 px-5 space-y-3 text-xs">
                  <p className="text-slate-700 leading-relaxed">{item.comment}</p>

                  {item.response && (
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="font-semibold text-purple-900 text-[11px] mb-1">🛡️ EduVisio Admin Response:</p>
                      <p className="text-purple-800">{item.response}</p>
                    </div>
                  )}

                  {isAdmin && !item.response && (
                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <Input
                        type="text"
                        placeholder="Type admin response to user..."
                        value={adminResponseText[item.id] || ""}
                        onChange={(e) => setAdminResponseText({ ...adminResponseText, [item.id]: e.target.value })}
                        className="text-xs bg-white"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAdminRespond(item.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white h-9 px-4 shrink-0"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" /> Respond
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackPage;
