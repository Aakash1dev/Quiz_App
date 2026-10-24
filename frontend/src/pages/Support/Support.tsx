import { useState } from "react";
import { getSupportCategories } from "@/lib/adminStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { LifeBuoy, Plus, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Support = () => {
  const { toast } = useToast();
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = parsedUser?.role === "admin";

  const [activeTab, setActiveTab] = useState(isAdmin ? "admin-desk" : "my-tickets");

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Quiz Generation");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  const [tickets, setTickets] = useState([
    {
      id: "TICK-101",
      user: "Priya Patel (priya@student.edu)",
      subject: "AI Quiz generation timed out for large text",
      category: "Quiz Generation",
      priority: "High",
      status: "Open",
      date: "Today, 10:30 AM",
      messages: [
        { sender: "user", text: "When I pasted 5 pages of biology notes, the generator took too long." },
      ],
    },
    {
      id: "TICK-102",
      user: "Rohan Verma (rohan@gmail.com)",
      subject: "Request to add export to PDF feature",
      category: "Feature Request",
      priority: "Medium",
      status: "In Progress",
      date: "Yesterday",
      messages: [
        { sender: "user", text: "It would be great to download quizzes as printable PDFs." },
        { sender: "admin", text: "Thanks Rohan! Our engineering team is currently implementing PDF export." },
      ],
    },
    {
      id: "TICK-103",
      user: "David Miller (david@univ.edu)",
      subject: "Updated API key not saving in localStorage",
      category: "Account & Settings",
      priority: "Low",
      status: "Resolved",
      date: "3 days ago",
      messages: [
        { sender: "user", text: "Issue resolved after refreshing browser cache." },
      ],
    },
  ]);

  const [replyTexts, setReplyTexts] = useState({});

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all ticket details.",
        variant: "destructive",
      });
      return;
    }

    const newTicket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      user: `${parsedUser?.name || "User"} (${parsedUser?.email || "user@eduvisio.com"})`,
      subject: subject.trim(),
      category,
      priority,
      status: "Open",
      date: "Just now",
      messages: [{ sender: "user", text: message.trim() }],
    };

    setTickets([newTicket, ...tickets]);
    setSubject("");
    setMessage("");
    setActiveTab("my-tickets");
    toast({
      title: "🎫 Support Ticket Created!",
      description: `Ticket #${newTicket.id} submitted. Our support team will respond shortly.`,
    });
  };

  const handleSendReply = (ticketId) => {
    const text = replyTexts[ticketId];
    if (!text || !text.trim()) return;

    setTickets(
      tickets.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            messages: [...t.messages, { sender: isAdmin ? "admin" : "user", text: text.trim() }],
            status: isAdmin ? "In Progress" : t.status,
          };
        }
        return t;
      })
    );

    setReplyTexts({ ...replyTexts, [ticketId]: "" });
    toast({
      title: "Reply Sent",
      description: "Message added to ticket conversation thread.",
    });
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    toast({
      title: "Status Updated",
      description: `Ticket #${ticketId} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="container mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0 h-14 w-14">
            <LifeBuoy className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              Support Desk &amp; Help Center
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Need assistance? Submit a ticket to our support team or manage active user inquiries.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setActiveTab("new-ticket")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Submit Support Ticket
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 max-w-md">
          {isAdmin && <TabsTrigger value="admin-desk">Admin Support Desk</TabsTrigger>}
          <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
        </TabsList>

        {isAdmin && (
          <TabsContent value="admin-desk" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="border-slate-200 shadow-sm">
                  <CardHeader className="py-3.5 px-5 bg-slate-50/50 border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm">{ticket.id}</span>
                          <Badge
                            className={
                              ticket.status === "Open"
                                ? "bg-amber-500 text-white"
                                : ticket.status === "In Progress"
                                ? "bg-blue-600 text-white"
                                : "bg-emerald-600 text-white"
                            }
                          >
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {ticket.category}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{ticket.subject}</h4>
                        <p className="text-xs text-slate-500">{ticket.user} • {ticket.date}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(ticket.id, "In Progress")}
                          className="h-7 text-xs"
                        >
                          In Progress
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(ticket.id, "Resolved")}
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="py-4 px-5 space-y-3 text-xs">
                    {ticket.messages.map((m, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl max-w-xl ${
                          m.sender === "admin"
                            ? "bg-blue-50 border border-blue-100 ml-auto"
                            : "bg-slate-100 border border-slate-200"
                        }`}
                      >
                        <p className="font-semibold text-slate-800 text-[11px] mb-1">
                          {m.sender === "admin" ? "🛡️ Support Representative" : "🎓 User Message"}
                        </p>
                        <p className="text-slate-700">{m.text}</p>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <Input
                        type="text"
                        placeholder="Type reply message to user..."
                        value={replyTexts[ticket.id] || ""}
                        onChange={(e) => setReplyTexts({ ...replyTexts, [ticket.id]: e.target.value })}
                        className="text-xs bg-white"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSendReply(ticket.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 shrink-0"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" /> Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="my-tickets" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="border-slate-200 shadow-sm">
                <CardHeader className="py-3.5 px-5 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-slate-900 text-xs">{ticket.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{ticket.subject}</h4>
                    </div>
                    <Badge
                      className={
                        ticket.status === "Open"
                          ? "bg-amber-500 text-white"
                          : ticket.status === "In Progress"
                          ? "bg-blue-600 text-white"
                          : "bg-emerald-600 text-white"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-4 px-5 space-y-2 text-xs">
                  {ticket.messages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl ${
                        m.sender === "admin"
                          ? "bg-blue-50 border border-blue-100"
                          : "bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <p className="font-semibold text-slate-800 text-[11px] mb-1">
                        {m.sender === "admin" ? "🛡️ Support Response" : "You"}
                      </p>
                      <p className="text-slate-700">{m.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new-ticket">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900">Submit a Support Ticket</CardTitle>
              <CardDescription className="text-xs">Describe your issue or question in detail</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <Label htmlFor="sub">Ticket Subject</Label>
                  <Input
                    id="sub"
                    placeholder="e.g. Issue generating quiz from custom text..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cat">Category</Label>
                    <select
                      id="cat"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
                    >
                      {getSupportCategories().map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prio">Priority</Label>
                    <select
                      id="prio"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="msg">Message Body</Label>
                  <Textarea
                    id="msg"
                    placeholder="Provide details about your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
