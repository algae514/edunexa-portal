# Pages Documentation

This document provides an overview of the main application pages located in `src/pages/`. Each page is a React component responsible for rendering a specific view or section of the application.

## Page List

Below is a list of all pages and their primary function:

-   **`Calendar.tsx`**: Displays a user's personalized calendar, showing upcoming and completed sessions for enrolled courses. It allows users to track their learning schedule and join live sessions.

-   **`Contact.tsx`**: Provides contact information for the organization, including email, phone, and address. It also features a contact form for users to submit inquiries and a FAQ section.

-   **`CourseView.tsx`**: Presents detailed information about a specific course. This includes the course curriculum, instructor details, pricing, and options to enroll or join live sessions if already enrolled. It dynamically fetches course data based on the URL parameter.

-   **`Enroll.tsx`**: Displays a summary of a selected course and guides the user through the enrollment process. It outlines what's included in the course, curriculum highlights, prerequisites, and pricing details.

-   **`FacultyDevelopment.tsx`**: Dedicated page for faculty development programs. It showcases past and upcoming FDPs, their topics, and provides a form for institutions to request an FDP at their college.

-   **`Home.tsx`**: The main landing page of the application. It features a hero section, highlights key features of the platform, introduces industry experts, and includes calls to action for exploring courses or faculty programs.

-   **`Index.tsx`**: A placeholder or fallback page. In a fully developed application, this might be replaced by a more specific landing page or redirect to `/`.

-   **`Login.tsx`**: The user authentication page where existing users can sign in using their email and password or through social login options (Google, LinkedIn).

-   **`NotFound.tsx`**: A generic 404 error page displayed when a user navigates to a non-existent route within the application.

-   **`Payment.tsx`**: Handles the payment process for course enrollment. Users can choose between a single payment or EMI options. It integrates with local storage for mock enrollment tracking.

-   **`Profile.tsx`**: The user's personal profile page. It displays user information, lists all purchased courses (completed and in-progress), shows learning progress, upcoming sessions, and achievements.

-   **`Signup.tsx`**: The user registration page where new users can create an account by providing their personal details, institution information, and setting up a password.

-   **`StudentProgrammes.tsx`**: Lists all available courses for students. It includes filtering options by level and category, and a search bar to find specific courses. Each course card provides a brief overview and links to detailed views or enrollment.

-   **`Testimonials.tsx`**: Features testimonials from past students and faculty, showcasing their positive experiences with the platform. It also includes a form for users to submit their own testimonials.

-   **`PaymentSuccess.tsx`**: Displays a confirmation message after a user successfully completes a payment. It shows the course name, the amount paid, and provides instructions on what to expect next. It also includes links to browse more courses or return to the home page.

## Routing

Routing in the application is handled by the `react-router-dom` library. The main routing configuration is located in the `src/App.tsx` file. The following code block shows the main routing configuration:

```typescript
import { Routes, Route } from "react-router-dom";

// ...import components

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-programmes" element={<StudentProgrammes />} />
      <Route path="/faculty-development" element={<FacultyDevelopment />} />
      <Route path="/course/:courseId" element={<CourseView />} />
      <Route path="/enroll/:courseId" element={<Enroll />} />
      <Route path="/payment/:courseId" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```
