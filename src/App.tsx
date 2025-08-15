import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StudentProgrammes from "./pages/StudentProgrammes";
import FacultyDevelopment from "./pages/FacultyDevelopment";
import CourseView from "./pages/CourseView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./pages/Calendar";
import Payment from "./pages/Payment";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Enroll from "./pages/Enroll";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student-programmes" element={<StudentProgrammes />} />
              <Route path="/faculty-development" element={<FacultyDevelopment />} />
              <Route path="/course/:id" element={<CourseView />} />
              <Route path="/course/:id/enroll" element={<Enroll />} />
              <Route path="/payment/:courseId" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/calendar" element={<Calendar />} />
              
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
