import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Quote, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Testimonials = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    course: "",
    rating: 0,
    testimonial: ""
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      course: "React Fundamentals",
      rating: 5,
      content: "This course completely transformed my understanding of React. The hands-on projects and expert guidance made complex concepts easy to grasp.",
      date: "January 2024",
      status: "approved"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Computer Science Professor",
      company: "State University",
      course: "Faculty Development Program",
      rating: 5,
      content: "Excellent program for educators looking to integrate modern technology into their teaching methods. Highly recommended!",
      date: "December 2023",
      status: "approved"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Data Analyst",
      company: "Analytics Corp",
      course: "Python for Data Science",
      rating: 5,
      content: "The practical approach to learning Python for data science was exactly what I needed. Now I'm confidently working on real projects.",
      date: "November 2023",
      status: "approved"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      role: "UI/UX Designer",
      company: "Design Studio",
      course: "UI/UX Design",
      rating: 4,
      content: "Great course with modern design principles. The instructor was knowledgeable and the projects were industry-relevant.",
      date: "October 2023",
      status: "approved"
    }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.VITE_API_URL || 'http://localhost:5001'}/api/send-email/testimonial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Testimonial Submitted Successfully",
          description: "Thank you for sharing your experience! We'll review and publish it soon."
        });
        
        // Clear form fields
        setFormData({
          name: "",
          role: "",
          company: "",
          course: "",
          rating: 0,
          testimonial: ""
        });
      } else {
        throw new Error(result.message || 'Failed to submit testimonial');
      }
    } catch (error) {
      toast({
        title: "Failed to Submit Testimonial",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Student Testimonials</h1>
          <p className="text-lg text-muted-foreground">
            Hear from our learners about their transformative experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Testimonial Form */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>
                Help others by sharing your learning journey with FutureOS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input 
                      id="role" 
                      placeholder="e.g., Student, Software Engineer"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Institution/Company</Label>
                    <Input 
                      id="company" 
                      placeholder="Where do you work/study?"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course/Program</Label>
                    <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Generative AI Fundamentals">Generative AI Fundamentals</SelectItem>
                        <SelectItem value="Large Language Models (LLMs)">Large Language Models (LLMs)</SelectItem>
                        <SelectItem value="AI-Powered Content Creation">AI-Powered Content Creation</SelectItem>
                        <SelectItem value="AI Chatbot Development">AI Chatbot Development</SelectItem>
                        <SelectItem value="Prompt Engineering Mastery">Prompt Engineering Mastery</SelectItem>
                        <SelectItem value="AI Ethics & Responsible AI">AI Ethics & Responsible AI</SelectItem>
                        <SelectItem value="Building AI-Powered Applications">Building AI-Powered Applications</SelectItem>
                        <SelectItem value="AI in Drug Discovery and Development">AI in Drug Discovery and Development</SelectItem>
                        <SelectItem value="Faculty Development Program">Faculty Development Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleInputChange("rating", star)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click stars to rate your experience
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial">Your Testimonial</Label>
                  <Textarea 
                    id="testimonial" 
                    placeholder="Share your learning experience, what you gained, and how it helped you..."
                    className="min-h-[120px]"
                    value={formData.testimonial}
                    onChange={(e) => handleInputChange("testimonial", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Testimonial"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Testimonials */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">What Our Students Say</h2>
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Quote className="h-8 w-8 text-primary/20 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-foreground mb-4 italic">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(testimonial.rating)}
                              <Badge variant="secondary" className="text-xs">
                                {testimonial.course}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;