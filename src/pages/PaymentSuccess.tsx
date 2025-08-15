import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const { courseName, amount } = location.state || {};

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Congratulations on your enrollment!
            </h3>
            {courseName && (
              <div className="p-4 bg-accent/50 rounded-lg">
                <p className="font-medium text-foreground">{courseName}</p>
                {amount && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Amount Paid: ₹{amount.toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <span className="font-medium">What's Next?</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You will receive course access details and joining instructions via email within 24 hours. 
              Please check your inbox and spam folder.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/student-programmes">
                <ArrowRight className="h-4 w-4 mr-2" />
                Browse More Courses
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            <p>
              Need help? Contact us at{" "}
              <a href="mailto:support@futureos.live" className="text-primary hover:underline">
                support@futureos.live
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;