import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, Users, Star, Calendar, PlayCircle, Download, 
  CheckCircle, BookOpen, User, Mail, ArrowLeft, ExternalLink, Video 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseView = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("curriculum");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Check enrollment status - always false for public website
  useEffect(() => {
    setIsEnrolled(false);
  }, [id, searchParams]);

  // Mock Google Meet link (replace with your actual links)
  const googleMeetLink = `https://meet.google.com/your-meeting-id-${id}`;

  const handleJoinSession = () => {
    // Open Google Meet in new tab
    window.open(googleMeetLink, '_blank');
    toast({
      title: "Joining Session",
      description: "Opening Google Meet in a new tab...",
    });
  };

  // Course data based on ID
  const courseData = {
    1: {
      title: "Generative AI Fundamentals",
      description: "Master the foundations of generative AI including large language models, prompt engineering, and AI applications.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Balaji Vuppuluri", title: "AI Technology Expert", image: "/api/placeholder/64/64", bio: "Balaji Vuppuluri specializes in large language models and AI applications.", email: "balaji.vuppuluri@futureos.edu" },
      category: "Generative AI", level: "Beginner", duration: "8 weeks", rating: 4.9, price: "₹16,999", nextSession: "Dec 15, 2024", isLive: true,
      tags: ["GPT", "Prompt Engineering", "OpenAI", "LLMs"],
      curriculum: [
        { week: 1, title: "Introduction to Generative AI", topics: ["What is Generative AI", "History and Evolution", "Key Applications", "Setting up Development Environment"], duration: "4 hours" },
        { week: 2, title: "Understanding Large Language Models", topics: ["Transformer Architecture", "GPT Models Overview", "BERT vs GPT", "Model Parameters and Scale"], duration: "5 hours" },
        { week: 3, title: "Prompt Engineering Fundamentals", topics: ["Prompt Design Principles", "Few-shot vs Zero-shot Learning", "Chain of Thought Prompting", "Best Practices"], duration: "6 hours" },
        { week: 4, title: "Working with OpenAI APIs", topics: ["API Setup and Authentication", "GPT-3.5 and GPT-4 Usage", "Fine-tuning Models", "Cost Optimization"], duration: "5 hours" },
        { week: 5, title: "Advanced Prompt Techniques", topics: ["Role-based Prompting", "Context Management", "Multi-step Reasoning", "Error Handling"], duration: "6 hours" },
        { week: 6, title: "Building AI Applications", topics: ["Chatbot Development", "Content Generation Systems", "Code Generation", "Integration Patterns"], duration: "7 hours" },
        { week: 7, title: "AI Ethics and Safety", topics: ["Bias in AI Models", "Responsible AI Development", "Content Moderation", "Privacy Considerations"], duration: "5 hours" },
        { week: 8, title: "Capstone Project", topics: ["Project Planning", "Implementation", "Testing and Deployment", "Presentation and Evaluation"], duration: "8 hours" }
      ]
    },
    2: {
      title: "Large Language Models (LLMs)",
      description: "Deep dive into training, fine-tuning, and deploying large language models for real-world applications.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Balaji Vuppuluri", title: "AI Technology Expert", image: "/api/placeholder/64/64", bio: "Balaji Vuppuluri specializes in large language models and AI applications.", email: "balaji.vuppuluri@futureos.edu" },
      category: "Generative AI", level: "Advanced", duration: "12 weeks", rating: 4.8, price: "₹24,999", nextSession: "Jan 8, 2025", isLive: false,
      tags: ["Transformers", "BERT", "Fine-tuning", "PyTorch"],
      curriculum: [
        { week: 1, title: "LLM Architecture Deep Dive", topics: ["Transformer Architecture", "Attention Mechanisms", "Positional Encoding", "Layer Normalization"], duration: "6 hours" },
        { week: 2, title: "Training Large Models", topics: ["Distributed Training", "Gradient Accumulation", "Mixed Precision Training", "Memory Optimization"], duration: "8 hours" },
        { week: 3, title: "Pre-training Strategies", topics: ["Data Preparation", "Tokenization", "Training Objectives", "Evaluation Metrics"], duration: "7 hours" },
        { week: 4, title: "Fine-tuning Techniques", topics: ["Task-specific Fine-tuning", "Parameter-efficient Fine-tuning", "LoRA and Adapters", "Instruction Tuning"], duration: "8 hours" },
        { week: 5, title: "Model Optimization", topics: ["Quantization", "Pruning", "Knowledge Distillation", "Model Compression"], duration: "7 hours" },
        { week: 6, title: "Deployment Strategies", topics: ["Model Serving", "Inference Optimization", "Scaling Solutions", "Cost Management"], duration: "6 hours" },
        { week: 7, title: "Advanced Applications", topics: ["Code Generation", "Multimodal Models", "Reasoning Tasks", "Domain Adaptation"], duration: "8 hours" },
        { week: 8, title: "Research Frontiers", topics: ["Latest Architectures", "Emergent Capabilities", "Future Directions", "Research Methodology"], duration: "6 hours" },
        { week: 9, title: "Multimodal LLMs", topics: ["Vision-Language Models", "CLIP and DALL-E Integration", "Video Understanding", "Audio Processing"], duration: "7 hours" },
        { week: 10, title: "Agent-based Systems", topics: ["LLM Agents", "Tool Usage", "Planning and Reasoning", "Multi-agent Collaboration"], duration: "8 hours" },
        { week: 11, title: "Advanced Fine-tuning", topics: ["RLHF", "Constitutional AI", "Red Teaming", "Safety Alignment"], duration: "7 hours" },
        { week: 12, title: "Final Project", topics: ["Custom LLM Implementation", "Performance Evaluation", "Deployment Pipeline", "Project Presentation"], duration: "10 hours" }
      ]
    },
    3: {
      title: "AI-Powered Content Creation",
      description: "Learn to create engaging content using AI tools like ChatGPT, DALL-E, and other generative AI platforms.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Swathi Uppadi", title: "AI Content Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI-powered content creation and digital marketing strategies.", email: "swathi.uppadi@futureos.edu" },
      category: "Generative AI", level: "Beginner", duration: "6 weeks", rating: 4.7, price: "₹12,999", nextSession: "Jan 15, 2025", isLive: false,
      tags: ["ChatGPT", "DALL-E", "Content Creation", "Midjourney"],
      curriculum: [
        { week: 1, title: "Content Creation Landscape", topics: ["AI Content Tools Overview", "ChatGPT and GPT-4 Basics", "DALL-E and Image Generation", "Setting up Creative Workflows"], duration: "4 hours" },
        { week: 2, title: "Mastering Text Content", topics: ["Blog Post Creation", "Social Media Content", "Email Marketing Copy", "SEO-Optimized Writing"], duration: "5 hours" },
        { week: 3, title: "Visual Content Creation", topics: ["AI Image Generation", "Midjourney Mastery", "Canva AI Integration", "Brand Visual Consistency"], duration: "6 hours" },
        { week: 4, title: "Video and Audio Content", topics: ["AI Video Generation", "Voice Cloning and Synthesis", "Podcast Script Writing", "Music and Sound Effects"], duration: "5 hours" },
        { week: 5, title: "Content Strategy and Automation", topics: ["Content Calendar Planning", "Automated Publishing", "Performance Analytics", "A/B Testing Content"], duration: "4 hours" },
        { week: 6, title: "Advanced Content Techniques", topics: ["Multi-format Content Creation", "Interactive Content", "Personalization at Scale", "Portfolio Development"], duration: "6 hours" }
      ]
    },
    4: {
      title: "AI Chatbot Development",
      description: "Build intelligent conversational AI systems using modern frameworks and natural language processing.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Balaji Vuppuluri", title: "AI Technology Expert", image: "/api/placeholder/64/64", bio: "Balaji Vuppuluri specializes in large language models and AI applications.", email: "balaji.vuppuluri@futureos.edu" },
      category: "Generative AI", level: "Intermediate", duration: "10 weeks", rating: 4.6, price: "₹19,999", nextSession: "Dec 1, 2025", isLive: false,
      tags: ["NLP", "Dialogflow", "Rasa", "Conversational AI"],
      curriculum: [
        { week: 1, title: "Conversational AI Fundamentals", topics: ["Introduction to Chatbots", "Rule-based vs AI-powered bots", "NLP Basics for Conversations", "Intent Recognition and Entity Extraction"], duration: "6 hours" },
        { week: 2, title: "Building with Dialogflow", topics: ["Dialogflow Setup and Configuration", "Creating Intents and Entities", "Context Management", "Webhook Integration"], duration: "7 hours" },
        { week: 3, title: "Advanced NLP for Chatbots", topics: ["Sentiment Analysis in Conversations", "Multi-turn Dialogue Management", "Named Entity Recognition", "Language Understanding Models"], duration: "8 hours" },
        { week: 4, title: "Rasa Framework Deep Dive", topics: ["Rasa Core and NLU", "Custom Action Development", "Training Data Preparation", "Model Evaluation and Testing"], duration: "8 hours" },
        { week: 5, title: "Integration and Deployment", topics: ["Platform Integration (Slack, WhatsApp, Web)", "API Development for Chatbots", "Database Connectivity", "User Session Management"], duration: "7 hours" },
        { week: 6, title: "Advanced Features", topics: ["Voice-enabled Chatbots", "Multilingual Support", "Personalization and User Profiling", "Analytics and Insights"], duration: "8 hours" },
        { week: 7, title: "Enterprise Chatbot Development", topics: ["Security and Privacy", "Scalability Considerations", "Error Handling and Fallbacks", "Monitoring and Maintenance"], duration: "7 hours" },
        { week: 8, title: "LLM-powered Chatbots", topics: ["Integrating GPT models", "RAG for Knowledge-based Chatbots", "Fine-tuning for Specific Domains", "Cost Optimization Strategies"], duration: "8 hours" },
        { week: 9, title: "Testing and Optimization", topics: ["Conversation Flow Testing", "A/B Testing for Chatbots", "Performance Optimization", "User Experience Design"], duration: "7 hours" },
        { week: 10, title: "Capstone Project", topics: ["End-to-end Chatbot Development", "Project Deployment", "Performance Analysis", "Presentation and Demo"], duration: "10 hours" }
      ]
    },
    5: {
      title: "Prompt Engineering Mastery",
      description: "Master the art and science of prompt engineering to maximize AI model performance and creativity.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Swathi Uppadi", title: "AI Content Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI-powered content creation and digital marketing strategies.", email: "swathi.uppadi@futureos.edu" },
      category: "Generative AI", level: "Intermediate", duration: "4 weeks", rating: 4.9, price: "₹8,999", nextSession: "Dec 15, 2025", isLive: true,
      tags: ["Prompt Design", "Chain of Thought", "Few-shot Learning"],
      curriculum: [
        { week: 1, title: "Prompt Engineering Foundations", topics: ["Anatomy of Effective Prompts", "Zero-shot vs Few-shot Learning", "Model Behavior and Limitations", "Prompt Structure and Components"], duration: "6 hours" },
        { week: 2, title: "Advanced Prompting Techniques", topics: ["Chain of Thought Prompting", "Tree of Thoughts Method", "Role-based Prompting", "Constitutional AI Principles"], duration: "8 hours" },
        { week: 3, title: "Domain-Specific Applications", topics: ["Prompting for Code Generation", "Creative Writing and Storytelling", "Data Analysis and Reasoning", "Technical Documentation"], duration: "8 hours" },
        { week: 4, title: "Optimization and Best Practices", topics: ["Prompt Iteration and Testing", "Cost-effective Prompting", "Prompt Libraries and Templates", "Final Project: Custom Prompt Suite"], duration: "6 hours" }
      ]
    },
    7: {
      title: "AI Ethics & Responsible AI",
      description: "Understanding ethical implications, bias mitigation, and responsible deployment of generative AI systems.",
      instructor: { name: "Swathi Uppadi", title: "AI Ethics Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI ethics, bias detection, and responsible AI deployment.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Generative AI", level: "Intermediate", duration: "6 weeks", rating: 4.7, price: "₹11,999", nextSession: "Jan 15, 2026", isLive: false,
      tags: ["AI Ethics", "Bias Detection", "Responsible AI", "Fairness"],
      curriculum: [
        { week: 1, title: "Foundations of AI Ethics", topics: ["Ethical Frameworks for AI", "Historical Context and Case Studies", "Stakeholder Perspectives", "Regulatory Landscape"], duration: "6 hours" },
        { week: 2, title: "Bias and Fairness in AI", topics: ["Types of Bias in AI Systems", "Bias Detection Methods", "Fairness Metrics and Evaluation", "Mitigation Strategies"], duration: "7 hours" },
        { week: 3, title: "Privacy and Security", topics: ["Data Privacy in AI", "Differential Privacy", "Adversarial Attacks", "Security Best Practices"], duration: "7 hours" },
        { week: 4, title: "Transparency and Explainability", topics: ["Explainable AI (XAI)", "Interpretability Techniques", "Model Documentation", "Audit Trails"], duration: "6 hours" },
        { week: 5, title: "Governance and Compliance", topics: ["AI Governance Frameworks", "Regulatory Compliance", "Risk Assessment", "Ethical Review Processes"], duration: "6 hours" },
        { week: 6, title: "Implementation and Practice", topics: ["Building Ethical AI Teams", "Ethics in AI Development Lifecycle", "Case Study Analysis", "Final Project: Ethics Assessment"], duration: "8 hours" }
      ]
    },
    8: {
      title: "Building AI-Powered Applications",
      description: "Develop end-to-end AI applications using modern frameworks, APIs, and deployment strategies for real-world solutions.",
      instructor: { name: "Satish Karri", title: "AI Research Specialist", image: "/api/placeholder/64/64", bio: "Satish Karri has extensive experience in AI research and generative models.", email: "satish.karri@futureos.edu" },
      coInstructor: { name: "Balaji Vuppuluri", title: "AI Technology Expert", image: "/api/placeholder/64/64", bio: "Balaji Vuppuluri specializes in large language models and AI applications.", email: "balaji.vuppuluri@futureos.edu" },
      category: "Generative AI", level: "Advanced", duration: "16 weeks", rating: 4.8, price: "₹29,999", nextSession: "Jul 27, 2025", isLive: true,
      tags: ["Full Stack AI", "API Integration", "Deployment", "Production"],
      curriculum: [
        { week: 1, title: "AI Application Architecture", topics: ["System Design for AI Apps", "Microservices vs Monolithic", "API Design Patterns", "Data Flow Architecture"], duration: "8 hours" },
        { week: 2, title: "Frontend Development for AI", topics: ["React for AI Applications", "User Interface Design", "Real-time Data Visualization", "Interactive AI Components"], duration: "8 hours" },
        { week: 3, title: "Backend Services", topics: ["FastAPI for AI Backends", "Database Design for AI", "Authentication and Authorization", "API Rate Limiting"], duration: "8 hours" },
        { week: 4, title: "AI Model Integration", topics: ["Model Serving with FastAPI", "OpenAI API Integration", "Custom Model Deployment", "Model Versioning"], duration: "8 hours" },
        { week: 5, title: "Data Pipeline Development", topics: ["ETL for AI Applications", "Real-time Data Processing", "Vector Databases", "Data Validation"], duration: "8 hours" },
        { week: 6, title: "Testing AI Applications", topics: ["Unit Testing AI Components", "Integration Testing", "Model Performance Testing", "A/B Testing Framework"], duration: "8 hours" },
        { week: 7, title: "Deployment Strategies", topics: ["Docker for AI Applications", "Kubernetes Deployment", "CI/CD for AI", "Blue-Green Deployment"], duration: "8 hours" },
        { week: 8, title: "Monitoring and Observability", topics: ["Application Monitoring", "Model Performance Tracking", "Error Handling", "Logging and Alerting"], duration: "8 hours" },
        { week: 9, title: "Scaling AI Applications", topics: ["Horizontal Scaling", "Load Balancing", "Caching Strategies", "Performance Optimization"], duration: "8 hours" },
        { week: 10, title: "Security in AI Applications", topics: ["Secure API Design", "Data Encryption", "Input Validation", "Threat Modeling"], duration: "8 hours" },
        { week: 11, title: "Cost Optimization", topics: ["Resource Management", "Cost Monitoring", "Efficient Model Usage", "Infrastructure Optimization"], duration: "8 hours" },
        { week: 12, title: "Advanced Features", topics: ["Real-time AI Processing", "Webhook Integration", "Third-party API Integration", "Custom Analytics"], duration: "8 hours" },
        { week: 13, title: "Project Planning", topics: ["Requirements Analysis", "System Architecture Design", "Technology Stack Selection", "Project Timeline"], duration: "8 hours" },
        { week: 14, title: "Project Development", topics: ["Core Feature Implementation", "Frontend Development", "Backend Development", "Testing and Debugging"], duration: "12 hours" },
        { week: 15, title: "Project Deployment", topics: ["Production Deployment", "Performance Tuning", "User Acceptance Testing", "Documentation"], duration: "10 hours" },
        { week: 16, title: "Project Presentation", topics: ["Demo Preparation", "Presentation Skills", "Project Showcase", "Peer Review and Feedback"], duration: "8 hours" }
      ]
    },
    9: {
      title: "AI in Drug Discovery and Development",
      description: "Comprehensive course covering AI applications across the entire drug discovery pipeline from target identification to clinical trials.",
      instructor: { name: "Swathi Uppadi", title: "AI Drug Discovery Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications in drug discovery and pharmaceutical research.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Advanced", duration: "12 weeks", rating: 4.9, price: "₹32,999", nextSession: "Feb 1, 2026", isLive: false,
      tags: ["Drug Discovery", "ADMET", "Virtual Screening", "Clinical AI"],
      curriculum: [
        { week: 1, title: "Basics of the drug discovery pipeline", topics: ["Drug discovery and development", "Overview of drug discovery workflows", "Drug design strategies", "Conventional methods for drug discovery", "Riddles in drug discovery"], duration: "6 hours" },
        { week: 2, title: "Introduction to AI in drug discovery and development", topics: ["History and evolution of AI in drug discovery", "Overview of AI technologies", "Key applications of AI across the pipeline", "Available AI tools and platforms", "Advantages of AI integration in drug discovery"], duration: "6 hours" },
        { week: 3, title: "Fundamentals of AI and ML techniques", topics: ["Introduction to machine learning concepts", "Overview of neural networks", "Feature engineering and data preprocessing", "Evaluation metrics for AI models", "Introduction to Python libraries for AI in drug discovery"], duration: "7 hours" },
        { week: 4, title: "AI in target identification, prediction and validation", topics: ["Introduction to biological targets", "Basics of target identification and validation", "Omics data integration for target discovery", "Binding site and protein structure prediction with AI", "Hands-on tutorial: Protein structure prediction"], duration: "8 hours" },
        { week: 5, title: "AI in high throughput virtual screening and lead identification", topics: ["Introduction and approaches to virtual screening", "AI tools for virtual screening", "AI assisted molecular docking", "Workflow of high-throughput virtual screening", "Hands-on tutorial: AI-assisted molecular docking"], duration: "8 hours" },
        { week: 6, title: "AI in lead optimization and drug-target interaction", topics: ["Basics of lead optimization", "AI for drug-target interaction studies", "QSAR modelling", "Molecular dynamics simulations", "Hands-on tutorial: Molecular dynamics trajectory analysis"], duration: "8 hours" },
        { week: 7, title: "ADMET predictive modelling in drug discovery", topics: ["Introduction to ADMET Properties", "Importance in lead optimization", "Conventional methods for ADMET prediction", "Open available resources for ADMET prediction", "Hands-on tutorial: AI-enabled ADMET prediction"], duration: "7 hours" },
        { week: 8, title: "AI in clinical phase", topics: ["Overview of clinical trials", "Patient recruitment, stratification, and retention", "Clinical trial protocol design and optimization", "Predicting outcomes of clinical trials with AI", "Data collection and monitoring for regulatory submissions"], duration: "6 hours" },
        { week: 9, title: "De Novo Drug Design using Generative AI", topics: ["Introduction to Generative AI in drug design", "Deep Generative Models for drug design (GAN, GNN, RNN, VAE etc.)", "Benchmarking Generative Models for drug design", "Molecule optimization with Generative AI", "Hands-on tutorial: AI-powered de novo drug design"], duration: "8 hours" },
        { week: 10, title: "Advanced concepts: Precision medicine, Network pharmacology and Drug repurposing", topics: ["AI in genomics for personalized treatments", "AI in real-time monitoring and feedback", "Overview and data sources for AI in drug repurposing", "Integrating multi-target drug discovery", "Network pharmacology with AI"], duration: "7 hours" },
        { week: 11, title: "Case studies, challenges, future directions, and resources", topics: ["Public AI resources for drug discovery", "Examples of notable successful case studies", "Challenges in modern drug discovery realm", "Regulatory considerations for AI implementation in drug development", "Future outlook: Explainable artificial intelligence, (XAI) and other emerging technologies in drug discovery"], duration: "6 hours" },
        { week: 12, title: "Hands-on sessions (Advanced workflow implementation)", topics: ["Molecular structure representation", "ML-assisted solubility prediction", "AI-assisted bioactivity prediction", "Pharmacophore-based ultra-large virtual screening", "Similarity based virtual screening"], duration: "10 hours" }
      ]
    },
    11: {
      title: "GenAI in Regulatory Affairs",
      description: "Learn AI-driven regulatory document automation, compliance monitoring, and regulatory intelligence extraction.",
      instructor: { name: "Swathi Uppadi", title: "Regulatory Affairs AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications in regulatory affairs and compliance automation.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Intermediate", duration: "4 weeks", rating: 4.7, price: "₹7,000", nextSession: "Oct 1, 2025", isLive: false,
      tags: ["Regulatory Affairs", "Compliance", "Document Automation", "NLP"],
      curriculum: [
        { week: 1, title: "Introduction to Regulatory Affairs & Compliance Basics", topics: ["Introduction to the drug approval lifecycle", "Regulatory bodies (CDSCO, USFDA, EMA) and their mandates", "Role of regulatory affairs in pharma", "Regulatory documentation and timelines", "Challenges in current regulatory processes"], duration: "6 hours" },
        { week: 2, title: "AI in Regulatory Intelligence & Document Automation", topics: ["AI tools for regulatory document drafting", "Automating CTD/eCTD submissions", "NLP-based label comparison and version control", "RAG for regulatory intelligence extraction", "Hands-on: Summarize regulatory guidelines using ChatGPT"], duration: "7 hours" },
        { week: 3, title: "AI in Compliance Monitoring & Risk Assessment", topics: ["Compliance signal detection with AI", "Risk-based monitoring using predictive models", "Detecting deviations using GenAI workflows", "Structured data extraction from inspection reports", "Hands-on: AI-assisted deviation tracking"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: Build a mock AI-driven regulatory dossier", "Peer review and improvement", "LinkedIn profile structuring for Regulatory + GenAI roles", "Resume boost with GenAI skills", "Certification and showcase"], duration: "5 hours" }
      ]
    },
    12: {
      title: "GenAI in Pharma Sales",
      description: "Transform pharma sales with AI-powered lead scoring, personalized communication, and territory planning strategies.",
      instructor: { name: "Swathi Uppadi", title: "Pharma Sales AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications in pharmaceutical sales and customer relationship management.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Beginner", duration: "4 weeks", rating: 4.6, price: "₹7,000", nextSession: "Oct 15, 2025", isLive: false,
      tags: ["Pharma Sales", "Lead Scoring", "CRM", "Personalization"],
      curriculum: [
        { week: 1, title: "Pharma Sales Landscape & Challenges", topics: ["Overview of pharma sales lifecycle", "Stakeholders: Doctors, chemists, hospitals, institutions", "Key account management strategies", "Sales funnel and conversion metrics", "Challenges in current sales workflows"], duration: "6 hours" },
        { week: 2, title: "AI Tools for Sales Intelligence & CRM Enhancement", topics: ["Using AI for lead scoring and targeting HCPs", "NLP for summarizing medical literature into sales-ready pitches", "Predicting doctor behavior using GenAI", "AI-driven territory planning and segmentation", "Hands-on: Build a sales pitch using ChatGPT"], duration: "7 hours" },
        { week: 3, title: "AI-Powered Communication & Personalization", topics: ["Using AI to generate email, SMS, WhatsApp campaigns", "Personalizing medical reps content with GenAI", "Voice-based GenAI assistants for sales teams", "Using GenAI to respond to objections and queries", "Hands-on: Generate a personalized sales script"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: AI-personalized omnichannel sales strategy for a new drug", "Peer feedback and refinement", "LinkedIn profile tips for pharma sales + GenAI roles", "Resume revamp using quantifiable AI impact", "Certification"], duration: "5 hours" }
      ]
    },
    13: {
      title: "GenAI in Pharma Marketing",
      description: "Create AI-driven marketing campaigns, content generation, and predictive analytics for pharmaceutical marketing.",
      instructor: { name: "Swathi Uppadi", title: "Pharma Marketing AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications in pharmaceutical marketing and campaign optimization.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Beginner", duration: "4 weeks", rating: 4.7, price: "₹7,000", nextSession: "Nov 1, 2025", isLive: false,
      tags: ["Pharma Marketing", "Content Generation", "Predictive Analytics", "ROI"],
      curriculum: [
        { week: 1, title: "Foundations of Pharma Marketing", topics: ["Overview of pharma marketing channels", "Differentiating B2B and B2C in pharma", "Understanding HCP and patient personas", "Regulatory-compliant messaging", "Challenges in traditional pharma marketing"], duration: "6 hours" },
        { week: 2, title: "AI-Driven Content Creation & Campaign Planning", topics: ["Using GenAI for visual and text campaign generation", "Personalized content for HCPs and patients", "Social media content creation with GenAI", "Campaign calendar generation using AI tools", "Hands-on: Generate a content plan using ChatGPT"], duration: "7 hours" },
        { week: 3, title: "Predictive Analytics & ROI Optimization", topics: ["Target audience segmentation using AI", "Forecasting campaign effectiveness", "A/B testing and response prediction", "Tools for measuring ROI using GenAI", "Hands-on: Build a targeted marketing strategy with AI support"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: AI-generated launch plan for a new therapy", "Presentation of digital marketing kit", "LinkedIn strategy for marketing professionals with GenAI focus", "Resume enhancement tips with GenAI skills", "Certification"], duration: "5 hours" }
      ]
    },
    14: {
      title: "GenAI in Medical Writing",
      description: "Master AI-assisted medical writing for regulatory documents, clinical summaries, and compliance automation.",
      instructor: { name: "Swathi Uppadi", title: "Medical Writing AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI-assisted medical writing and regulatory document creation.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Intermediate", duration: "4 weeks", rating: 4.8, price: "₹7,000", nextSession: "Nov 15, 2025", isLive: false,
      tags: ["Medical Writing", "Regulatory Documents", "Clinical Summaries", "Compliance"],
      curriculum: [
        { week: 1, title: "Introduction to Medical Writing", topics: ["Types of medical writing: Regulatory, Scientific, Promotional", "Key documents: CSR, ICF, IB, Protocols, Manuscripts", "Understanding target audiences (regulators, HCPs, patients)", "Common challenges: Consistency, compliance, clarity", "Ethical writing and plagiarism"], duration: "6 hours" },
        { week: 2, title: "Leveraging GenAI for Drafting & Summarizing", topics: ["Using GenAI to draft clinical trial summaries and case reports", "Literature summarization with NLP tools", "Rewriting scientific texts for different audiences", "Head-to-head comparisons using RAG models", "Hands-on: Generate a clinical trial summary with ChatGPT"], duration: "7 hours" },
        { week: 3, title: "Editing, Formatting & Compliance Automation", topics: ["Grammar, readability, and tone adjustments with AI", "Reference management and citation checks", "Compliance checklists and auto-flagging using AI", "Adapting to global submission formats (ICMJE, CONSORT)", "Hands-on: Regulatory-compliant IB or ICF generation"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: Create a regulatory medical document using GenAI", "Peer review and editing round", "LinkedIn makeover for medical writers with AI skills", "Resume keywords to target GenAI-based med writing jobs", "Certification"], duration: "5 hours" }
      ]
    },
    15: {
      title: "GenAI in Pharmacovigilance",
      description: "Learn AI-powered adverse event detection, signal management, and automated PV workflow optimization.",
      instructor: { name: "Swathi Uppadi", title: "Pharmacovigilance AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications for pharmacovigilance and safety signal detection.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Advanced", duration: "4 weeks", rating: 4.9, price: "₹7,000", nextSession: "Dec 1, 2025", isLive: false,
      tags: ["Pharmacovigilance", "Adverse Events", "Signal Detection", "Safety"],
      curriculum: [
        { week: 1, title: "Foundations of Pharmacovigilance (PV)", topics: ["What is PV? Importance in drug safety", "Overview of ICSR, PSUR, DSUR, and Risk Management Plans", "Signal detection and benefit-risk analysis", "Regulatory authorities and PV reporting systems (e.g., EudraVigilance, Vigibase)", "Common PV challenges"], duration: "6 hours" },
        { week: 2, title: "AI in Adverse Event Detection & Signal Management", topics: ["NLP for identifying Adverse Drug Reactions (ADR) in free text", "AI-based duplicate detection and case validity checks", "Real-world data mining using AI for signal detection", "Sentiment analysis on social media & forums for PV", "Hands-on: Extracting AEs from clinical notes using ChatGPT"], duration: "7 hours" },
        { week: 3, title: "Automating PV Workflows with GenAI", topics: ["Automating case intake and triage", "Drafting narratives using GenAI", "Auto-generation of periodic safety update reports", "AI-enabled literature surveillance", "Hands-on: Draft a narrative report using GenAI tools"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: AI-assisted end-to-end PV case processing", "Peer sharing of project outputs", "LinkedIn tips for PV + GenAI professionals", "Resume optimization: GenAI use cases in PV", "Certification"], duration: "5 hours" }
      ]
    },
    16: {
      title: "GenAI in Patent Filing & IP Management",
      description: "Master AI-driven patent search, prior art analysis, and automated patent drafting for intellectual property management.",
      instructor: { name: "Swathi Uppadi", title: "Patent & IP AI Expert", image: "/api/placeholder/64/64", bio: "Swathi Uppadi specializes in AI applications for patent search, IP management, and automated drafting.", email: "swathi.uppadi@futureos.edu" },
      coInstructor: { name: "", title: "", image: "/api/placeholder/64/64", bio: "", email: "" },
      category: "Pharma", level: "Advanced", duration: "4 weeks", rating: 4.8, price: "₹7,000", nextSession: "Dec 15, 2025", isLive: false,
      tags: ["Patent Filing", "IP Management", "Prior Art", "Patent Search"],
      curriculum: [
        { week: 1, title: "Introduction to Patents and IP in Pharma", topics: ["Types of IP: Patents, Trademarks, Copyrights, Trade Secrets", "Importance of patents in drug development", "Patent lifecycle: Filing, prosecution, granting, maintenance", "Challenges in traditional patent research", "Global patent regulations overview (India, US, EU)"], duration: "6 hours" },
        { week: 2, title: "AI for Patent Search & Prior Art Analysis", topics: ["Using GenAI for semantic patent search", "NLP-based prior art comparison and clustering", "Patent claim interpretation using LLMs", "Tools for analyzing large patent datasets", "Hands-on: Extract and compare patent claims using ChatGPT"], duration: "7 hours" },
        { week: 3, title: "Drafting, Filing & Monitoring Patents with GenAI", topics: ["GenAI-assisted patent drafting (claims, abstract, background)", "Patentability check using AI", "Competitive patent landscaping with visualization tools", "Automating status tracking and alerts", "Hands-on: Drafting a mock patent application using GenAI"], duration: "8 hours" },
        { week: 4, title: "Project + LinkedIn Optimization", topics: ["Final project: Prepare and present a GenAI-assisted patent document", "Peer feedback on novelty and structure", "LinkedIn strategies for IP & patent professionals entering GenAI", "Resume and portfolio tips for patent tech jobs", "Certification"], duration: "5 hours" }
      ]
    }
  };

  const course = {
    id: parseInt(id || "1"),
    ...courseData[parseInt(id || "1") as keyof typeof courseData] || courseData[1],
    recordings: []
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/student-programmes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programmes
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                    {course.level}
                  </Badge>
                  {course.isLive && (
                    <Badge className="bg-red-500 text-white">Live Session</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Starts: {course.nextSession}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  <CardDescription>EMI options available • Lifetime access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-medium text-green-800">You're enrolled in this course!</p>
                      </div>
                      {course.isLive ? (
                        <Button 
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" 
                          onClick={handleJoinSession}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join Session
                        </Button>
                      ) : (
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                          onClick={handleJoinSession}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join Session
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      {course.isLive ? (
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-accent" 
                          asChild
                        >
                          <Link to={`/payment/${course.id}`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Enroll Now
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-accent" 
                          asChild
                        >
                          <Link to={`/payment/${course.id}`}>
                            Enroll Now
                          </Link>
                        </Button>
                      )}
                    </>
                  )}
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                  
                  <div className="text-sm text-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    30-day money-back guarantee
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="curriculum">Course Curriculum</TabsTrigger>
                  <TabsTrigger value="recordings">Recordings</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Curriculum</CardTitle>
                      <CardDescription>
                        Comprehensive 8-week Gen AI programme with hands-on projects and real-world AI applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {course.curriculum.map((week, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">Week {week.week}: {week.title}</h3>
                              <Badge variant="secondary">{week.duration}</Badge>
                            </div>
                            <ul className="space-y-1">
                              {week.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-success" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recordings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Recordings</CardTitle>
                      <CardDescription>
                        Access previous session recordings and downloadable resources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <PlayCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No recordings available yet</h3>
                        <p className="text-muted-foreground">
                          Session recordings will be available here after the course begins.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Instructors */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instructors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Instructor */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{course.instructor.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                      </div>
                    </div>
                    <p className="text-sm">{course.instructor.bio}</p>
                  </div>

                  <Separator />

                  {/* Co-Instructor */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={course.coInstructor.image} alt={course.coInstructor.name} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{course.coInstructor.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.coInstructor.title}</p>
                      </div>
                    </div>
                    <p className="text-sm">{course.coInstructor.bio}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseView;