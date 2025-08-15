import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, Search, Filter, BookOpen, Calendar } from "lucide-react";

const StudentProgrammes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Generative AI Fundamentals",
      description: "Master the foundations of generative AI including large language models, prompt engineering, and AI applications.",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      category: "Generative AI",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.9,
      students: 342,
      price: "₹16,999",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      nextSession: "Sep 15, 2025",
      isLive: true,
      tags: ["GPT", "Prompt Engineering", "OpenAI", "LLMs"]
    },
    {
      id: 2,
      title: "Large Language Models (LLMs)",
      description: "Deep dive into training, fine-tuning, and deploying large language models for real-world applications.",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      category: "Generative AI",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.8,
      students: 189,
      price: "₹24,999",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
      nextSession: "Oct 8, 2025",
      isLive: false,
      tags: ["Transformers", "BERT", "Fine-tuning", "PyTorch"]
    },
    {
      id: 3,
      title: "AI-Powered Content Creation",
      description: "Learn to create engaging content using AI tools like ChatGPT, DALL-E, and other generative AI platforms.",
      instructor: "Satish Karri",
      coInstructor: "Swathi Uppadi",
      category: "Generative AI",
      level: "Beginner",
      duration: "6 weeks",
      rating: 4.7,
      students: 456,
      price: "₹12,999",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      nextSession: "Nov 15, 2025",
      isLive: false,
      tags: ["ChatGPT", "DALL-E", "Content Creation", "Midjourney"]
    },
    {
      id: 4,
      title: "AI Chatbot Development",
      description: "Build intelligent conversational AI systems using modern frameworks and natural language processing.",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      category: "Generative AI",
      level: "Intermediate",
      duration: "10 weeks",
      rating: 4.6,
      students: 298,
      price: "₹19,999",
      image: "https://images.unsplash.com/photo-1498050108023-4542c06a5843?w=400&h=250&fit=crop",
      nextSession: "Dec 1, 2025",
      isLive: false,
      tags: ["NLP", "Dialogflow", "Rasa", "Conversational AI"]
    },
    {
      id: 5,
      title: "Prompt Engineering Mastery",
      description: "Master the art and science of prompt engineering to maximize AI model performance and creativity.",
      instructor: "Satish Karri",
      coInstructor: "Swathi Uppadi",
      category: "Generative AI",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.9,
      students: 567,
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
      nextSession: "Dec 15, 2025",
      isLive: true,
      tags: ["Prompt Design", "Chain of Thought", "Few-shot Learning"]
    },
    {
      id: 7,
      title: "AI Ethics & Responsible AI",
      description: "Understanding ethical implications, bias mitigation, and responsible deployment of generative AI systems.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Generative AI",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.7,
      students: 189,
      price: "₹11,999",
      image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=400&h=250&fit=crop",
      nextSession: "Jan 15, 2026",
      isLive: false,
      tags: ["AI Ethics", "Bias Detection", "Responsible AI", "Fairness"]
    },
    {
      id: 8,
      title: "Building AI-Powered Applications",
      description: "End-to-end development of AI applications using modern frameworks, APIs, and deployment strategies.",
      instructor: "Kiran Kumar",
      coInstructor: "Balaji Vuppuluri, Satish Karri",
      category: "Generative AI",
      level: "Advanced",
      duration: "16 weeks",
      rating: 4.8,
      students: 145,
      price: "₹28,999",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
      nextSession: "Jul 27, 2025 (Live Session Started)",
      isLive: true,
      tags: ["API Integration", "MLOps", "Docker", "Cloud Deployment"]
    },
    {
      id: 9,
      title: "AI in Drug Discovery and Development",
      description: "Comprehensive course covering AI applications across the entire drug discovery pipeline from target identification to clinical trials.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.9,
      students: 78,
      price: "₹32,999",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop",
      nextSession: "Feb 1, 2026",
      isLive: false,
      tags: ["Drug Discovery", "ADMET", "Virtual Screening", "Clinical AI"]
    },
    {
      id: 11,
      title: "GenAI in Regulatory Affairs",
      description: "Learn AI-driven regulatory document automation, compliance monitoring, and regulatory intelligence extraction.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.7,
      students: 98,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop",
      nextSession: "Oct 1, 2025",
      isLive: false,
      tags: ["Regulatory Affairs", "Compliance", "Document Automation", "NLP"]
    },
    {
      id: 12,
      title: "GenAI in Pharma Sales",
      description: "Transform pharma sales with AI-powered lead scoring, personalized communication, and territory planning strategies.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.6,
      students: 234,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
      nextSession: "Oct 15, 2025",
      isLive: false,
      tags: ["Pharma Sales", "Lead Scoring", "CRM", "Personalization"]
    },
    {
      id: 13,
      title: "GenAI in Pharma Marketing",
      description: "Create AI-driven marketing campaigns, content generation, and predictive analytics for pharmaceutical marketing.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.7,
      students: 187,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=250&fit=crop",
      nextSession: "Nov 1, 2025",
      isLive: false,
      tags: ["Pharma Marketing", "Content Generation", "Predictive Analytics", "ROI"]
    },
    {
      id: 14,
      title: "GenAI in Medical Writing",
      description: "Master AI-assisted medical writing for regulatory documents, clinical summaries, and compliance automation.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.8,
      students: 156,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=250&fit=crop",
      nextSession: "Nov 15, 2025",
      isLive: false,
      tags: ["Medical Writing", "Regulatory Documents", "Clinical Summaries", "Compliance"]
    },
    {
      id: 15,
      title: "GenAI in Pharmacovigilance",
      description: "Learn AI-powered adverse event detection, signal management, and automated PV workflow optimization.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Advanced",
      duration: "4 weeks",
      rating: 4.9,
      students: 89,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
      nextSession: "Dec 1, 2025",
      isLive: false,
      tags: ["Pharmacovigilance", "Adverse Events", "Signal Detection", "Safety"]
    },
    {
      id: 16,
      title: "GenAI in Patent Filing & IP Management",
      description: "Master AI-driven patent search, prior art analysis, and automated patent drafting for intellectual property management.",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      category: "Pharma",
      level: "Advanced",
      duration: "4 weeks",
      rating: 4.8,
      students: 67,
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=250&fit=crop",
      nextSession: "Dec 15, 2025",
      isLive: false,
      tags: ["Patent Filing", "IP Management", "Prior Art", "Patent Search"]
    }
  ];

  const categories = ["All", "Generative AI", "Pharma"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">AI & Pharma Student Programmes</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the future of AI with comprehensive courses in Generative AI and Pharmaceutical AI designed to accelerate your career in artificial intelligence and drug discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, skills, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase() === "all" ? "all" : category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
             <div className="flex items-center gap-2">
               <BookOpen className="h-4 w-4 text-muted-foreground" />
               <span className="text-sm text-muted-foreground">
                 Professional AI & Pharma courses available
               </span>
             </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-elegant transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                  {course.isLive && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      Live Session
                    </Badge>
                  )}
                  <Badge 
                    variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
                    className="absolute top-3 left-3"
                  >
                    {course.level}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <div>Instructor: <span className="font-medium text-foreground">{course.instructor}</span></div>
                    {course.coInstructor && (
                      <div>Co-Instructor: <span className="font-medium text-foreground">{course.coInstructor}</span></div>
                    )}
                  </div>

                   <div className="flex items-center justify-between text-sm">
                     <div className="flex items-center gap-1">
                       <Clock className="h-4 w-4 text-muted-foreground" />
                       <span>{course.duration}</span>
                     </div>
                     <div className="flex items-center gap-1">
                       <Calendar className="h-4 w-4 text-muted-foreground" />
                       <span>Starts: {course.nextSession}</span>
                     </div>
                   </div>

                   <div className="flex items-center justify-end text-sm">
                     <div className="font-bold text-lg text-primary">{course.price}</div>
                   </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" asChild>
                      <Link to={`/course/${course.id}`}>View Course</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/payment/${course.id}`}>Enroll</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setFilterLevel("all");
                setFilterCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentProgrammes;