import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState("single");
  const [isProcessing, setIsProcessing] = useState(false);

  // Course data mapping
  const coursesData = [
    { id: "1", title: "Generative AI Fundamentals", instructor: "Satish Karri", price: 16999, duration: "8 weeks", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop" },
    { id: "2", title: "Large Language Models (LLMs)", instructor: "Satish Karri", price: 24999, duration: "12 weeks", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop" },
    { id: "3", title: "AI-Powered Content Creation", instructor: "Satish Karri", price: 12999, duration: "6 weeks", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop" },
    { id: "4", title: "AI Chatbot Development", instructor: "Satish Karri", price: 19999, duration: "10 weeks", image: "https://images.unsplash.com/photo-1498050108023-4542c06a5843?w=400&h=250&fit=crop" },
    { id: "5", title: "Prompt Engineering Mastery", instructor: "Satish Karri", price: 8999, duration: "4 weeks", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" },
    { id: "7", title: "AI Ethics & Responsible AI", instructor: "Swathi Uppadi", price: 11999, duration: "6 weeks", image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=400&h=250&fit=crop" },
    { id: "8", title: "Building AI-Powered Applications", instructor: "Kiran Kumar", price: 28999, duration: "16 weeks", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop" },
    { id: "9", title: "AI in Drug Discovery and Development", instructor: "Swathi Uppadi", price: 32999, duration: "12 weeks", image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop" },
  ];

  const course = coursesData.find(c => c.id === courseId) || coursesData[0];

  const paymentOptions = [
    {
      id: "single",
      title: "Single Payment",
      description: "Pay the full amount now",
      amount: course.price,
      savings: "Best Value"
    },
    {
      id: "emi3",
      title: "3 Month EMI",
      description: "Pay in 3 equal installments",
      amount: Math.ceil(course.price / 3),
      totalAmount: Math.ceil(course.price / 3) * 3,
      installments: 3
    },
    {
      id: "emi6",
      title: "6 Month EMI",
      description: "Pay in 6 equal installments",
      amount: Math.ceil(course.price / 6),
      totalAmount: Math.ceil(course.price / 6) * 6,
      installments: 6
    }
  ];

  const selectedOption = paymentOptions.find(option => option.id === selectedPayment);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Payment Successful!",
      description: "You will receive course access details via email within 24 hours.",
    });

    setIsProcessing(false);
    
    // Redirect to payment success page with course details
    navigate("/payment-success", {
      state: {
        courseName: course.title,
        amount: selectedOption?.amount
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Enrollment</h1>
          <p className="text-muted-foreground">Choose your payment option and complete enrollment</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <Badge variant="secondary" className="mt-1">{course.duration}</Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Course Price</span>
                  <span className="text-xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Money Back Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
                <CardDescription>Choose how you'd like to pay for this course</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  {paymentOptions.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{option.title}</span>
                                {option.id === "single" && (
                                  <Badge variant="secondary" className="text-xs">Best Value</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                              {option.installments && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Total: ₹{option.totalAmount?.toLocaleString()}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{option.amount.toLocaleString()}</div>
                              {option.installments && (
                                <div className="text-xs text-muted-foreground">per month</div>
                              )}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-medium">{selectedOption?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedOption?.installments ? "First Payment" : "Total Amount"}</span>
                  <span className="font-medium">₹{selectedOption?.amount.toLocaleString()}</span>
                </div>
                {selectedOption?.installments && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Remaining Payments</span>
                    <span>{selectedOption.installments - 1} × ₹{selectedOption.amount.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Amount to Pay Now</span>
                  <span className="text-primary">₹{selectedOption?.amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Button 
              size="lg" 
              className="w-full" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ₹{selectedOption?.amount.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;