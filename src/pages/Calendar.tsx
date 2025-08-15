import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Calendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Immediately redirect to login page
    toast({
      title: "Login Required",
      description: "Please log in to access your calendar"
    });
    navigate("/login");
  }, [navigate, toast]);

  // Return null since we're redirecting
  return null;
};

export default Calendar;
