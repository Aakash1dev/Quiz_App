import { useState, useEffect } from "react";
import { getAdminFaqs, addAdminFaq, deleteAdminFaq } from "@/lib/adminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle, Search, Plus, Trash2 } from "lucide-react";

export const Faq = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("Quizzes & AI");

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = parsedUser?.role === "admin";

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    setFaqList(getAdminFaqs());
  }, []);

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both the question and answer fields.",
        variant: "destructive",
      });
      return;
    }

    const updated = addAdminFaq({
      category: newCategory,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    });

    setFaqList(updated);
    setNewQuestion("");
    setNewAnswer("");
    setIsAddingFaq(false);
    toast({
      title: "FAQ Entry Added",
      description: "New question has been published to the knowledgebase.",
    });
  };

  const handleDeleteFaq = (id) => {
    const updated = deleteAdminFaq(id);
    setFaqList(updated);
    toast({
      title: "FAQ Deleted",
      description: "FAQ entry removed from knowledgebase.",
    });
  };

  const filteredFaqs = faqList.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === "all" || f.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 h-14 w-14">
            <HelpCircle className="h-7 w-7 text-[#10bc00]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              Frequently Asked Questions &amp; Knowledgebase
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Find instant answers regarding AI quiz generation, materials, subscriptions, and platform features.
            </p>
          </div>
        </div>

        {isAdmin && (
          <Button
            onClick={() => setIsAddingFaq(!isAddingFaq)}
            className="bg-[#10bc00] hover:bg-[#0b7c00] text-white text-xs font-semibold shrink-0"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add FAQ Entry
          </Button>
        )}
      </div>

      {isAdmin && isAddingFaq && (
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#10bc00]" /> Add New FAQ Entry (Admin)
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4 pb-4">
            <form onSubmit={handleAddFaq} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <Label htmlFor="faq-q">Question</Label>
                  <Input
                    id="faq-q"
                    placeholder="Enter question text..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="bg-white text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="faq-cat">Category</Label>
                  <select
                    id="faq-cat"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
                  >
                    <option value="Quizzes & AI">Quizzes &amp; AI</option>
                    <option value="Account & Subscriptions">Account &amp; Subscriptions</option>
                    <option value="Technical & Platform">Technical &amp; Platform</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="faq-a">Answer</Label>
                <Textarea
                  id="faq-a"
                  placeholder="Enter detailed answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="bg-white text-xs min-h-[80px]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsAddingFaq(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#10bc00] hover:bg-[#0b7c00] text-white">
                  Publish FAQ
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs bg-white border-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {["all", "Quizzes & AI", "Account & Subscriptions", "Technical & Platform"].map((cat) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 rounded-full font-medium h-8 shrink-0 ${
                activeCategory === cat
                  ? "bg-[#10bc00] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <Card key={faq.id} className="border-slate-200 hover:border-slate-300 transition-colors shadow-sm">
            <CardHeader className="py-4 px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-[#0b7c00] bg-emerald-50">
                      {faq.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{faq.answer}</p>
                </div>

                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="text-slate-400 hover:text-red-600 shrink-0 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Faq;
