import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Calendar, Award, MapPin, Clock, Mail, Phone, CheckCircle, Building2, Camera, Star, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const FacultyDevelopment = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    expectedParticipants: '',
    preferredDates: '',
    specificRequirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.VITE_API_URL || 'http://localhost:5001'}/api/send-email/fdp-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "FDP Registration Submitted Successfully",
          description: "Thank you for your interest! We'll contact you within 24 hours to discuss your requirements."
        });
        
        // Clear form fields
        setFormData({
          collegeName: '',
          contactPerson: '',
          email: '',
          phone: '',
          location: '',
          expectedParticipants: '',
          preferredDates: '',
          specificRequirements: ''
        });
      } else {
        throw new Error(result.message || 'Failed to submit FDP registration');
      }
    } catch (error) {
      toast({
        title: "Failed to Submit Registration",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fdpList = [
    {
      college: "Sri Sai College of Pharmacy",
      location: "Pathankot, Punjab",
      date: "26th July 2024",
      topics: ["GenAI in Pharmaceutical Education", "Drug Discovery AI Tools", "Research Methodology"],
      status: "completed",
      featured: true,
      participants: 45,
      feedback: "4.9/5 rating from participants",
      photos: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400"
      ],
      testimonials: [
        {
          name: "Dr. Priya Sharma",
          designation: "Professor, Pharmaceutical Sciences",
          text: "Excellent workshop! The AI tools demonstrated will revolutionize how we approach drug discovery education."
        },
        {
          name: "Dr. Rajesh Kumar",
          designation: "Head of Department",
          text: "Very practical and hands-on approach. Students are already implementing these tools in their research."
        }
      ]
    },
    {
      college: "Chandigarh University",
      location: "Chandigarh",
      date: "9th August 2025", 
      topics: ["AI in Higher Education", "Teaching Excellence", "Digital Transformation"],
      status: "scheduled",
      featured: false
    },
    {
      college: "Mahayogi Goraknath University",
      location: "Gorakhpur",
      date: "23rd August 2025",
      topics: ["Research Innovation", "AI-Powered Learning", "Faculty Development"],
      status: "scheduled",
      featured: false
    },
    {
      college: "SRKR College of Engineering",
      location: "Bhimavaram",
      date: "5th September 2025",
      topics: ["Engineering Education", "AI Integration", "Industry-Academia Bridge"],
      status: "scheduled",
      featured: true
    }
  ];


  const benefits = [
    "Professional Development Certificates",
    "Networking with Industry Experts",
    "Access to Latest Educational Resources",
    "Mentorship Opportunities",
    "Research Collaboration Possibilities",
    "Career Advancement Support"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 text-white">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Free Faculty Development<br />
              Program on Generative AI
            </h1>
            <div className="space-y-4">
              <p className="text-2xl font-medium">Empowering Faculty & Students with</p>
              <h2 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Generative AI Excellence
              </h2>
            </div>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed">
              Join industry experts in a transformative 6-hour journey to understand, embrace, and master 
              Generative AI technologies. This comprehensive Faculty Development Program offers expert-led 
              training, hands-on workshops, and certification to unlock the future of education today.
            </p>
            <div className="flex flex-col items-center gap-6 pt-6">
              <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full" asChild>
                <a href="#register-fdp">Register for Free FDP →</a>
              </Button>
              <p className="text-lg font-medium">• 6 Hours • Completely Free • Next Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our FDP?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our faculty development programmes offer comprehensive support for your professional journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/50">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduled FDPs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Scheduled Faculty Development Programmes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our upcoming GenAI-focused FDPs at various institutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fdpList.map((fdp, index) => (
              <Card key={index} className={`hover:shadow-elegant transition-all duration-300 ${fdp.featured ? 'ring-2 ring-primary/20' : ''} ${fdp.status === 'completed' ? 'opacity-90' : ''}`}>
                {fdp.featured && (
                  <div className="bg-gradient-to-r from-primary to-accent p-1">
                    <div className="bg-card p-2 text-center">
                      <Badge className="bg-primary text-primary-foreground">
                        {fdp.status === 'completed' ? 'Successfully Completed' : 'Featured FDP'}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className={`text-xl flex items-center gap-2 ${fdp.status === 'completed' ? 'text-muted-foreground' : ''}`}>
                    <Building2 className="h-5 w-5 text-primary" />
                    {fdp.college}
                  </CardTitle>
                  <CardDescription>Faculty Development Programme on Generative AI</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{fdp.date}</span>
                      {fdp.status === 'completed' && <Badge variant="outline" className="ml-2 text-xs">Completed</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{fdp.location}</span>
                    </div>
                    {fdp.participants && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{fdp.participants} participants</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {fdp.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant={fdp.status === 'completed' ? 'outline' : 'secondary'} className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {fdp.feedback && (
                    <div className="bg-success/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-success flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current" />
                        {fdp.feedback}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {fdp.status === 'completed' ? (
                      <>
                        <Button variant="outline" className="flex-1" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Camera className="h-4 w-4 mr-2" />
                              View Photos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>FDP at {fdp.college}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {fdp.photos && (
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Photo Gallery</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {fdp.photos.map((photo, photoIndex) => (
                                      <div key={photoIndex} className="aspect-video rounded-lg overflow-hidden">
                                        <img 
                                          src={photo} 
                                          alt={`FDP at ${fdp.college} - ${photoIndex + 1}`}
                                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {fdp.testimonials && (
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
                                  <div className="space-y-4">
                                    {fdp.testimonials.map((testimonial, testIndex) => (
                                      <Card key={testIndex} className="p-4">
                                        <div className="flex items-start gap-3">
                                          <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                              <Star className="h-5 w-5 text-primary fill-current" />
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm text-muted-foreground mb-2">"{testimonial.text}"</p>
                                            <div>
                                              <p className="font-medium text-sm">{testimonial.name}</p>
                                              <p className="text-xs text-muted-foreground">{testimonial.designation}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : (
                      <>
                        <Button className="flex-1" onClick={() => {
                          window.location.href = `mailto:support@futureos.edu?subject=FDP Registration - ${fdp.college}&body=Hello, I would like to register for the Faculty Development Programme scheduled at ${fdp.college} on ${fdp.date}.`;
                        }}>
                          Register Interest
                        </Button>
                        <Button variant="outline">Learn More</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Register FDP Section */}
      <section id="register-fdp" className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-elegant">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl mb-4">Register FDP at Your College</CardTitle>
                <CardDescription className="text-lg">
                  Bring our faculty development programmes directly to your institution. 
                  We'll customize the content to meet your specific needs.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Registration Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="collegeName">College/Institution Name *</Label>
                      <Input
                        id="collegeName"
                        value={formData.collegeName}
                        onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                        placeholder="Enter college/institution name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="Enter contact person name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location/City *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Enter city/location"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expectedParticipants">Expected Participants</Label>
                      <Input
                        id="expectedParticipants"
                        type="number"
                        value={formData.expectedParticipants}
                        onChange={(e) => setFormData({...formData, expectedParticipants: e.target.value})}
                        placeholder="Number of participants"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredDates">Preferred Dates</Label>
                    <Input
                      id="preferredDates"
                      value={formData.preferredDates}
                      onChange={(e) => setFormData({...formData, preferredDates: e.target.value})}
                      placeholder="Enter preferred dates or time period"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specificRequirements">Specific Requirements</Label>
                    <Textarea
                      id="specificRequirements"
                      value={formData.specificRequirements}
                      onChange={(e) => setFormData({...formData, specificRequirements: e.target.value})}
                      placeholder="Any specific requirements, focus areas, or additional information"
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">What We Offer:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Customized curriculum design
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Expert faculty and industry speakers
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Hands-on workshops and sessions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Certification and assessment
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Follow-up support and resources
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Contact Information:</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-sm text-muted-foreground">support@futureos.edu</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-sm text-muted-foreground">+91 123 456 7890</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Programme Coordinator</div>
                            <div className="text-sm text-muted-foreground">Dr. Academic Excellence</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <Button 
                      type="submit"
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Registration Request"
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-3">
                      We'll contact you within 24 hours to discuss your requirements
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyDevelopment;