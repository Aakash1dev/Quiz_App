import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, BrainCircuit, BarChart3, FileUp, ArrowRight, } from "lucide-react";
const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const features = [
        {
            title: "Store & Organize Learning Materials",
            description: "Upload and organize videos, PDFs, text files, and more in one centralized learning hub.",
            icon: FileUp,
        },
        {
            title: "AI-Powered Quiz Generation",
            description: "Automatically generate quizzes from your learning materials to test your knowledge effectively.",
            icon: BrainCircuit,
        },
        {
            title: "Track Learning Progress",
            description: "Visualize your learning curve with detailed analytics and identify areas for improvement.",
            icon: BarChart3,
        },
        {
            title: "Test General Knowledge",
            description: "Generate random quizzes on various topics including current affairs, environment, and discoveries.",
            icon: BookOpen,
        },
    ];
    return (<div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-brand-600 mr-2"/>
              <span className="text-xl font-bold text-brand-600">EduVisio</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-brand-600">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-brand-600">
                About
              </a>
              <Link to="/login">
                <Button variant="outline" className="mr-2">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </Button>
            </div>
          </div>
          {isMenuOpen && (<div className="md:hidden mt-4 py-2 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#about" className="block text-gray-600 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
              <div className="pt-2 space-y-2">
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>)}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-500 to-accent1-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Supercharge Your Learning with AI
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Store materials, generate quizzes, and track your progress - all in one place.
                Let AI help you master any subject efficiently.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-brand-600 hover:bg-gray-100">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5"/>
                  </Button>
                </Link>
                <Link to="/login?guest=true">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-600">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Student learning with technology" className="rounded-lg shadow-xl w-full max-w-md"/>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Learning Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize your learning process and achieve better results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (<div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-brand-50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-brand-600"/>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How EduVisio Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the learning process with powerful AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <FileUp className="h-8 w-8 text-brand-600"/>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload Materials</h3>
              <p className="text-gray-600">
                Upload your study materials in any format - PDFs, videos, documents, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <BrainCircuit className="h-8 w-8 text-brand-600"/>
              </div>
              <h3 className="text-xl font-bold mb-2">2. Generate Quizzes</h3>
              <p className="text-gray-600">
                Our AI analyzes your materials and creates personalized quizzes to test your knowledge.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-brand-600"/>
              </div>
              <h3 className="text-xl font-bold mb-2">3. Track Progress</h3>
              <p className="text-gray-600">
                Visualize your learning journey with detailed analytics and improve where needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already improving their study efficiency with EduVisio.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <BrainCircuit className="h-8 w-8 text-white mr-2"/>
                <span className="text-xl font-bold text-white">EduVisio</span>
              </div>
              <p className="max-w-sm text-gray-400">
                AI-powered learning platform to help you master any subject efficiently and effectively.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduVisio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);
};
export default LandingPage;
