import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Sliders, Brain, Save, Key } from "lucide-react";

export const Settings = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>({ name: "", email: "", role: "user" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [apiKey, setApiKey] = useState("");
  const [defaultDifficulty, setDefaultDifficulty] = useState("medium");
  const [defaultQuestionCount, setDefaultQuestionCount] = useState("10");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setIsAdmin(parsed.role === "admin");
      } catch (e) {
        console.error(e);
      }
    }
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
      title: "Profile updated",
      description: "Your account details have been saved.",
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem("gemini_api_key", apiKey.trim());
    toast({
      title: "Preferences saved",
      description: "Your app, quiz settings, and Gemini API key have been updated.",
    });
  };

  return (
    <div className={`space-y-6 max-w-5xl mx-auto pb-10 ${isAdmin ? "admin-theme" : ""}`}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences, quiz defaults, and notification settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex bg-white border border-slate-200">
          <TabsTrigger value="profile" className="flex items-center gap-2 text-xs">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2 text-xs">
            <Sliders className="h-4 w-4" />
            Quiz Defaults
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal info and email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                <div className="flex items-center space-x-6">
                  <Avatar className={`h-20 w-20 border-2 ${isAdmin ? "border-[#f97316]" : "border-[#10bc00]"}`}>
                    <AvatarImage src="" />
                    <AvatarFallback
                      className={`text-2xl font-bold ${
                        isAdmin ? "bg-orange-100 text-[#ea580c]" : "bg-emerald-100 text-[#0b7c00]"
                      }`}
                    >
                      {name?.slice(0, 2).toUpperCase() || (isAdmin ? "AD" : "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={`text-white font-semibold transition-all shadow-sm ${
                      isAdmin
                        ? "bg-[#f97316] hover:bg-[#ea580c]"
                        : "bg-[#10bc00] hover:bg-[#0b7c00]"
                    }`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className={`h-5 w-5 ${isAdmin ? "text-[#f97316]" : "text-[#10bc00]"}`} />
                AI Quiz Generation Preferences
              </CardTitle>
              <CardDescription>
                Customize default parameters when creating new quizzes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1.5">
                  <Label>Default Difficulty</Label>
                  <Select value={defaultDifficulty} onValueChange={setDefaultDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Default Question Count</Label>
                  <Select value={defaultQuestionCount} onValueChange={setDefaultQuestionCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2 text-xs">
                <Label htmlFor="gemini-key" className="flex items-center gap-2 font-semibold">
                  <Key className={`h-4 w-4 ${isAdmin ? "text-[#f97316]" : "text-[#10bc00]"}`} />
                  Google Gemini API Key
                </Label>
                <Input
                  id="gemini-key"
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono text-xs max-w-lg"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSavePreferences}
                  className={`text-white font-semibold transition-all shadow-sm ${
                    isAdmin
                      ? "bg-[#f97316] hover:bg-[#ea580c]"
                      : "bg-[#10bc00] hover:bg-[#0b7c00]"
                  }`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
