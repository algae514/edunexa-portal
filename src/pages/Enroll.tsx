import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Award, CheckCircle } from "lucide-react";

const Enroll = () => {
  const { id } = useParams();
  
  // Complete course data for all courses
  const courses = {
    "1": {
      id: 1,
      title: "Generative AI Fundamentals",
      description: "Master the foundations of generative AI including large language models, prompt engineering, and AI applications",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      duration: "8 weeks",
      sessions: 16,
      price: "₹16,999",
      originalPrice: "₹24,999",
      emiPrice: "₹2,833",
      level: "Beginner",
      category: "Generative AI",
      startDate: "December 15, 2024",
      schedule: "Monday & Wednesday, 7:00 PM - 9:00 PM",
      rating: 4.9,
      features: [
        "Live interactive AI sessions",
        "Hands-on AI projects",
        "Course completion certificate",
        "Lifetime access to recordings",
        "1-on-1 AI mentor support",
        "Career guidance in AI field"
      ],
      curriculum: [
        "Introduction to Generative AI",
        "Understanding Large Language Models", 
        "Prompt Engineering Fundamentals",
        "Working with OpenAI APIs",
        "Advanced Prompt Techniques",
        "Building AI Applications",
        "AI Ethics and Safety",
        "Capstone AI Project"
      ],
      prerequisites: [
        "Basic programming knowledge (Python preferred)",
        "Understanding of basic machine learning concepts",
        "Familiarity with APIs and web development"
      ]
    },
    "2": {
      id: 2,
      title: "Large Language Models (LLMs)",
      description: "Deep dive into training, fine-tuning, and deploying large language models for real-world applications",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      duration: "12 weeks",
      sessions: 24,
      price: "₹24,999",
      originalPrice: "₹34,999",
      emiPrice: "₹4,167",
      level: "Advanced",
      category: "Generative AI",
      startDate: "January 8, 2025",
      schedule: "Tuesday & Thursday, 8:00 PM - 10:00 PM",
      rating: 4.8,
      features: [
        "Advanced LLM training techniques",
        "Model fine-tuning workshops",
        "Industry-grade AI projects",
        "Research paper discussions",
        "Direct access to AI researchers",
        "Publication opportunity"
      ],
      curriculum: [
        "Transformer Architecture Deep Dive",
        "Pre-training Large Models",
        "Fine-tuning Strategies",
        "RLHF and Alignment",
        "Model Evaluation Metrics",
        "Deployment at Scale",
        "Research Methodologies",
        "Capstone Research Project"
      ],
      prerequisites: [
        "Strong Python programming skills",
        "Deep learning framework experience (PyTorch/TensorFlow)",
        "Linear algebra and statistics knowledge",
        "Previous ML/AI course completion"
      ]
    },
    "3": {
      id: 3,
      title: "AI-Powered Content Creation",
      description: "Learn to create engaging content using AI tools like ChatGPT, DALL-E, and other generative AI platforms",
      instructor: "Satish Karri",
      coInstructor: "Swathi Uppadi",
      duration: "6 weeks",
      sessions: 12,
      price: "₹12,999",
      originalPrice: "₹18,999",
      emiPrice: "₹2,167",
      level: "Beginner",
      category: "Generative AI",
      startDate: "January 15, 2025",
      schedule: "Saturday & Sunday, 10:00 AM - 12:00 PM",
      rating: 4.7,
      features: [
        "Creative AI tool mastery",
        "Portfolio development",
        "Content strategy planning",
        "Brand voice optimization",
        "Industry networking sessions",
        "Freelancing guidance"
      ],
      curriculum: [
        "AI Content Tools Overview",
        "Text Generation with ChatGPT",
        "Image Creation with DALL-E",
        "Video Content with AI",
        "Content Strategy & Planning",
        "Portfolio Creation & Showcase"
      ],
      prerequisites: [
        "Basic computer literacy",
        "Creative writing or design interest",
        "Social media familiarity"
      ]
    },
    "4": {
      id: 4,
      title: "AI Chatbot Development",
      description: "Build intelligent conversational AI systems using modern frameworks and natural language processing",
      instructor: "Satish Karri",
      coInstructor: "Balaji Vuppuluri",
      duration: "10 weeks",
      sessions: 20,
      price: "₹19,999",
      originalPrice: "₹28,999",
      emiPrice: "₹3,333",
      level: "Intermediate",
      category: "Generative AI",
      startDate: "December 1, 2025",
      schedule: "Monday & Wednesday, 6:30 PM - 8:30 PM",
      rating: 4.6,
      features: [
        "NLP framework training",
        "Conversational AI projects",
        "Chatbot deployment",
        "Integration with platforms",
        "Industry case studies",
        "Certification support"
      ],
      curriculum: [
        "Introduction to Chatbots",
        "Natural Language Processing",
        "Intent Recognition",
        "Entity Extraction",
        "Dialogue Management",
        "Integration & Deployment",
        "Advanced Features",
        "Project Implementation"
      ],
      prerequisites: [
        "Python programming experience",
        "Basic understanding of APIs",
        "Familiarity with web development"
      ]
    },
    "5": {
      id: 5,
      title: "Prompt Engineering Mastery",
      description: "Master the art and science of prompt engineering to maximize AI model performance and creativity",
      instructor: "Satish Karri",
      coInstructor: "Swathi Uppadi",
      duration: "4 weeks",
      sessions: 8,
      price: "₹8,999",
      originalPrice: "₹12,999",
      emiPrice: "₹1,500",
      level: "Intermediate",
      category: "Generative AI",
      startDate: "December 15, 2025",
      schedule: "Tuesday & Friday, 7:00 PM - 9:00 PM",
      rating: 4.9,
      features: [
        "Advanced prompting techniques",
        "Chain of thought methods",
        "Model optimization",
        "Real-world applications",
        "Industry best practices",
        "Performance metrics"
      ],
      curriculum: [
        "Prompt Design Fundamentals",
        "Advanced Techniques",
        "Chain of Thought Prompting",
        "Optimization Strategies"
      ],
      prerequisites: [
        "Basic AI/ML knowledge",
        "Experience with AI tools",
        "Understanding of NLP concepts"
      ]
    },
    "7": {
      id: 7,
      title: "AI Ethics & Responsible AI",
      description: "Understanding ethical implications, bias mitigation, and responsible deployment of generative AI systems",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "6 weeks",
      sessions: 12,
      price: "₹11,999",
      originalPrice: "₹16,999",
      emiPrice: "₹2,000",
      level: "Intermediate",
      category: "Generative AI",
      startDate: "January 15, 2026",
      schedule: "Tuesday & Thursday, 6:00 PM - 8:00 PM",
      rating: 4.7,
      features: [
        "Ethical AI frameworks",
        "Bias detection methods",
        "Responsible deployment",
        "Legal considerations",
        "Industry standards",
        "Case study analysis"
      ],
      curriculum: [
        "AI Ethics Foundations",
        "Bias in AI Systems",
        "Fairness Metrics",
        "Responsible Deployment",
        "Legal Frameworks",
        "Future Considerations"
      ],
      prerequisites: [
        "Basic AI understanding",
        "Familiarity with ML concepts",
        "Interest in ethics"
      ]
    },
    "8": {
      id: 8,
      title: "Building AI-Powered Applications",
      description: "End-to-end development of AI applications using modern frameworks, APIs, and deployment strategies",
      instructor: "Kiran Kumar",
      coInstructor: "Balaji Vuppuluri, Satish Karri",
      duration: "16 weeks",
      sessions: 32,
      price: "₹28,999",
      originalPrice: "₹39,999",
      emiPrice: "₹4,833",
      level: "Advanced",
      category: "Generative AI",
      startDate: "July 27, 2025",
      schedule: "Monday & Wednesday, 7:30 PM - 9:30 PM",
      rating: 4.8,
      features: [
        "Full-stack AI development",
        "API integration",
        "Cloud deployment",
        "MLOps practices",
        "Production systems",
        "Performance optimization"
      ],
      curriculum: [
        "AI Application Architecture",
        "Frontend Development",
        "Backend Integration",
        "API Design",
        "Database Management",
        "Cloud Deployment",
        "MLOps Implementation",
        "Production Optimization"
      ],
      prerequisites: [
        "Strong programming skills",
        "Web development experience",
        "Cloud platform familiarity",
        "AI/ML knowledge"
      ]
    },
    "9": {
      id: 9,
      title: "AI in Drug Discovery and Development",
      description: "Comprehensive course covering AI applications across the entire drug discovery pipeline from target identification to clinical trials",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "12 weeks",
      sessions: 24,
      price: "₹32,999",
      originalPrice: "₹45,999",
      emiPrice: "₹5,500",
      level: "Advanced",
      category: "Pharma",
      startDate: "February 1, 2026",
      schedule: "Tuesday & Friday, 7:00 PM - 9:00 PM",
      rating: 4.9,
      features: [
        "Drug discovery pipeline training",
        "AI/ML in pharmaceutical research",
        "Hands-on bioinformatics projects",
        "Industry case studies",
        "Regulatory considerations",
        "Career guidance in pharma AI"
      ],
      curriculum: [
        "Basics of the drug discovery pipeline",
        "Introduction to AI in drug discovery and development",
        "Fundamentals of AI and ML techniques",
        "AI in target identification, prediction and validation",
        "AI in high throughput virtual screening and lead identification",
        "AI in lead optimization and drug-target interaction",
        "ADMET predictive modelling in drug discovery",
        "AI in clinical phase",
        "De Novo Drug Design using Generative AI",
        "Advanced concepts: Precision medicine, Network pharmacology and Drug repurposing",
        "Case studies, challenges, future directions, and resources",
        "Hands-on sessions (Advanced workflow implementation)"
      ],
      prerequisites: [
        "Background in biology, chemistry, or related field",
        "Basic understanding of drug development",
        "Python programming knowledge",
        "Interest in pharmaceutical research"
      ]
    },
    "11": {
      id: 11,
      title: "GenAI in Regulatory Affairs",
      description: "Learn AI-driven regulatory document automation, compliance monitoring, and regulatory intelligence extraction",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Intermediate",
      category: "Pharma",
      startDate: "October 1, 2025",
      schedule: "Tuesday & Friday, 6:30 PM - 8:30 PM",
      rating: 4.7,
      features: [
        "Regulatory document automation",
        "Compliance monitoring tools",
        "AI-driven intelligence extraction",
        "Hands-on regulatory projects",
        "Career development support",
        "Industry best practices"
      ],
      curriculum: [
        "Introduction to Regulatory Affairs & Compliance Basics",
        "AI in Regulatory Intelligence & Document Automation",
        "AI in Compliance Monitoring & Risk Assessment",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Understanding of pharmaceutical regulations",
        "Basic AI/GenAI knowledge",
        "Document management experience"
      ]
    },
    "12": {
      id: 12,
      title: "GenAI in Pharma Sales",
      description: "Transform pharma sales with AI-powered lead scoring, personalized communication, and territory planning strategies",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Beginner",
      category: "Pharma",
      startDate: "October 15, 2025",
      schedule: "Wednesday & Saturday, 7:00 PM - 9:00 PM",
      rating: 4.6,
      features: [
        "AI-powered lead scoring",
        "Personalized sales communication",
        "Territory planning optimization",
        "CRM enhancement techniques",
        "Sales performance analytics",
        "Professional development"
      ],
      curriculum: [
        "Pharma Sales Landscape & Challenges",
        "AI Tools for Sales Intelligence & CRM Enhancement",
        "AI-Powered Communication & Personalization",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Sales experience (preferably pharma)",
        "Basic understanding of CRM systems",
        "Interest in AI applications"
      ]
    },
    "13": {
      id: 13,
      title: "GenAI in Pharma Marketing",
      description: "Create AI-driven marketing campaigns, content generation, and predictive analytics for pharmaceutical marketing",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Beginner",
      category: "Pharma",
      startDate: "November 1, 2025",
      schedule: "Monday & Thursday, 6:00 PM - 8:00 PM",
      rating: 4.7,
      features: [
        "AI-driven campaign creation",
        "Content generation automation",
        "Predictive marketing analytics",
        "ROI optimization techniques",
        "Digital marketing strategies",
        "Portfolio development"
      ],
      curriculum: [
        "Foundations of Pharma Marketing",
        "AI-Driven Content Creation & Campaign Planning",
        "Predictive Analytics & ROI Optimization",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Marketing experience (preferably pharma)",
        "Understanding of digital marketing",
        "Basic knowledge of AI tools"
      ]
    },
    "14": {
      id: 14,
      title: "GenAI in Medical Writing",
      description: "Master AI-assisted medical writing for regulatory documents, clinical summaries, and compliance automation",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Intermediate",
      category: "Pharma",
      startDate: "November 15, 2025",
      schedule: "Tuesday & Friday, 7:30 PM - 9:30 PM",
      rating: 4.8,
      features: [
        "AI-assisted medical writing",
        "Regulatory document creation",
        "Clinical summary automation",
        "Compliance optimization",
        "Scientific communication skills",
        "Career advancement support"
      ],
      curriculum: [
        "Introduction to Medical Writing",
        "Leveraging GenAI for Drafting & Summarizing",
        "Editing, Formatting & Compliance Automation",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Medical or scientific writing experience",
        "Understanding of clinical research",
        "Basic knowledge of regulatory requirements"
      ]
    },
    "15": {
      id: 15,
      title: "GenAI in Pharmacovigilance",
      description: "Learn AI-powered adverse event detection, signal management, and automated PV workflow optimization",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Advanced",
      category: "Pharma",
      startDate: "December 1, 2025",
      schedule: "Monday & Wednesday, 8:00 PM - 10:00 PM",
      rating: 4.9,
      features: [
        "AI-powered adverse event detection",
        "Automated signal management",
        "PV workflow optimization",
        "Real-world data analysis",
        "Regulatory compliance tools",
        "Advanced career guidance"
      ],
      curriculum: [
        "Foundations of Pharmacovigilance (PV)",
        "AI in Adverse Event Detection & Signal Management",
        "Automating PV Workflows with GenAI",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Pharmacovigilance experience",
        "Understanding of drug safety",
        "Knowledge of regulatory requirements",
        "Basic AI/ML concepts"
      ]
    },
    "16": {
      id: 16,
      title: "GenAI in Patent Filing & IP Management",
      description: "Master AI-driven patent search, prior art analysis, and automated patent drafting for intellectual property management",
      instructor: "Swathi Uppadi",
      coInstructor: "",
      duration: "4 weeks",
      sessions: 8,
      price: "₹7,000",
      originalPrice: "₹10,000",
      emiPrice: "₹1,167",
      level: "Advanced",
      category: "Pharma",
      startDate: "December 15, 2025",
      schedule: "Thursday & Sunday, 7:00 PM - 9:00 PM",
      rating: 4.8,
      features: [
        "AI-driven patent search",
        "Automated prior art analysis",
        "Patent drafting assistance",
        "IP landscape analysis",
        "Competitive intelligence",
        "Professional networking"
      ],
      curriculum: [
        "Introduction to Patents and IP in Pharma",
        "AI for Patent Search & Prior Art Analysis",
        "Drafting, Filing & Monitoring Patents with GenAI",
        "Project + LinkedIn Optimization"
      ],
      prerequisites: [
        "Intellectual property experience",
        "Understanding of patent systems",
        "Technical or scientific background",
        "Basic knowledge of AI tools"
      ]
    }
  };

  const course = courses[id as keyof typeof courses] || courses["1"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to={`/course/${id}`} className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Course Details
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">
                      {course.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Starts: {course.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.duration} • {course.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.curriculum.map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Card */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Enroll Now</CardTitle>
                <CardDescription>
                  Secure your spot in this cutting-edge AI course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">{course.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <Badge variant="destructive" className="text-xs mb-2">
                    Early Bird Discount • {Math.round((1 - parseInt(course.price.replace('₹', '').replace(',', '')) / parseInt(course.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    EMI options available from <span className="font-semibold text-primary">{course.emiPrice}/month</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Course Fee</span>
                    <span>{course.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Registration Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Platform Fee</span>
                    <span>₹99</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{(parseInt(course.price.replace('₹', '').replace(',', '')) + 99).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Choose EMI Plan
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    30-day money-back guarantee • EMI options with 0% processing fee
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">AI Expert & Lead Instructor</p>
                </div>
                {course.coInstructor && (
                  <div>
                    <p className="font-medium">{course.coInstructor}</p>
                    <p className="text-sm text-muted-foreground">AI Researcher & Co-Instructor</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{course.schedule}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  All times are in IST (Indian Standard Time)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;