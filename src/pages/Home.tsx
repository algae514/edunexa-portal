import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, Award, ArrowRight, Play, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Access structured learning programmes designed by industry experts."
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from experienced professionals and renowned educators."
    },
    {
      icon: Calendar,
      title: "Live Sessions",
      description: "Join interactive sessions and engage with instructors in real-time."
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized certificates upon successful course completion."
    }
  ];

  const experts = [
    {
      name: "Satish Karri",
      position: "Sr. PM, Tredence Inc",
      expertise: "Entrepreneur | Generative AI Specialist",
      tag: "Industry Leader",
      experience: "15+ years of experience driving AI innovation",
      description: "Leading AI innovation and Generative AI solutions"
    },
    {
      name: "Jose Anitt",
      position: "Principal Platform Architect, Gaian Solutions",
      expertise: "Principal Platform Architect",
      tag: "Technology Visionary",
      experience: "B.Tech – IIT Bombay",
      description: "Expert in Scalable Systems & AI-Driven Platforms"
    },
    {
      name: "Kiran Kumar",
      position: "Research Scholar - Vision & Generative AI, IIT Hyderabad",
      expertise: "M.Tech - IIT Bombay",
      tag: "AI Research Expert",
      experience: "13+ Years Academic & Industry Experience",
      description: "Driving innovation at the intersection of AI research and education"
    },
    {
      name: "Balaji Vuppuluri",
      position: "Entrepreneur | Sr. Manager – American Express",
      expertise: "15+ Years of Experience in Software Development & Innovation",
      tag: "Global Enterprise Expert",
      experience: "Tech Leader with a Passion for Building Scalable, Impactful Solutions",
      description: "Driving cutting-edge projects across global enterprise platforms"
    },
    {
      name: "Pruthvi Kaveti",
      position: "Senior Product Manager",
      expertise: "IIT Bombay (CSE) | IIM Ahmedabad",
      tag: "Product Innovation Expert",
      experience: "Entrepreneur | Ex–Next Education, Samsung",
      description: "Bridging Technology, Business & Education with Product Innovation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Welcome to FutureOS
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Empower Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Learning Journey</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of students and faculty in our comprehensive skill development programmes. Access world-class courses, live sessions, and expert guidance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" asChild>
                  <Link to="/student-programmes">
                    Browse Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/faculty-development">
                    <Play className="mr-2 h-5 w-5" />
                    Faculty Programs
                  </Link>
                </Button>
              </div>

            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Educational Excellence"
                className="rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose FutureOS?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform offers everything you need for comprehensive skill development and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Experts */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Experts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from industry leaders and academic experts who bring real-world experience to our programmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <Card key={index} className="hover:shadow-elegant transition-shadow duration-300 text-center">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{expert.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{expert.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="secondary" className="mb-2">
                    {expert.tag}
                  </Badge>
                  <p className="text-sm text-muted-foreground font-medium">{expert.expertise}</p>
                  <p className="text-sm text-muted-foreground">{expert.experience}</p>
                  <p className="text-sm leading-relaxed">{expert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join our community of learners and take the next step in your professional development journey.
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">
                  Get Started Today
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;