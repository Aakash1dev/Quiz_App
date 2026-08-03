import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Sliders, Brain, Save, Trophy, BookOpen, Clock, ShieldCheck, Mail, Sparkles } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({ name: "", email: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Preference states
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [defaultDifficulty, setDefaultDifficulty] = useState("medium");
  const [defaultQuestionCount, setDefaultQuestionCount] = useState("10");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your study and app settings have been updated.",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Profile Banner Card */}
      <Card className="bg-gradient-to-r from-brand-600 to-brand-800 text-white overflow-hidden shadow-lg border-0">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <Avatar className="h-24 w-24 border-4 border-white/20 shadow-md">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white text-brand-700 text-3xl font-bold">
                  {name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{name || "Learner"}</h1>
                <p className="text-brand-100 flex items-center justify-center md:justify-start gap-1.5 mt-1">
                  <Mail className="h-4 w-4 opacity-80" />
                  {email || "user@example.com"}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> Pro Student
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-300" /> Account Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 w-full md:w-auto">
              <div>
                <div className="flex justify-center mb-1">
                  <BookOpen className="h-5 w-5 text-brand-200" />
                </div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-brand-200">Materials</p>
              </div>
              <div>
                <div className="flex justify-center mb-1">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                </div>
                <p className="text-xl font-bold">85%</p>
                <p className="text-xs text-brand-200">Avg Score</p>
              </div>
              <div>
                <div className="flex justify-center mb-1">
                  <Clock className="h-5 w-5 text-brand-200" />
                </div>
                <p className="text-xl font-bold">24h</p>
                <p className="text-xs text-brand-200">Study Time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account Details
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Study Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Account Details Tab */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your name, email, and personal profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Preferences Tab */}
        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-brand-600" />
                AI Quiz Generation Defaults
              </CardTitle>
              <CardDescription>Customize your default options for generated quizzes and interface theme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Difficulty</Label>
                  <Select value={defaultDifficulty} onValueChange={setDefaultDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Question Count</Label>
                  <Select value={defaultQuestionCount} onValueChange={setDefaultQuestionCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode Interface</p>
                  <p className="text-sm text-gray-500">Toggle dark theme for night study sessions</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={handleSavePreferences} className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you get notified about quiz reminders and performance summaries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive weekly study summaries and analytics</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium text-gray-900">Quiz Reminders</p>
                  <p className="text-sm text-gray-500">Get notified about scheduled quizzes</p>
                </div>
                <Switch checked={quizReminders} onCheckedChange={setQuizReminders} />
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={handleSavePreferences} className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
