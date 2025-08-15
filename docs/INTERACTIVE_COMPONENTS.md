# Interactive Components Documentation

This document provides a detailed explanation of how some of the more complex, interactive components in the application work.

## `Payment` Component

The `Payment` component, located at `src/pages/Payment.tsx`, is responsible for handling the course enrollment payment process. It simulates a payment flow, allowing users to choose between a single payment or an EMI (Equated Monthly Installment) plan.

### Key Functionalities

-   **State Management**: The component uses the `useState` hook to manage the selected payment option (`paymentType`), the processing state (`isProcessing`), and the EMI option (`emiOption`).
-   **Payment Simulation**: When the user clicks the "Proceed to Pay" button, the `handlePayment` function is called. This function simulates a payment processing delay of 2 seconds using `setTimeout`.
-   **Toast Notifications**: The component utilizes the `useToast` hook to provide feedback to the user. It displays a toast notification to indicate that the payment is being processed.
-   **Navigation**: Upon successful payment simulation, the user is redirected to the `PaymentSuccess` page. The `useNavigate` hook from `react-router-dom` is used for this purpose.
-   **Data Transfer**: The component passes the `courseName` and `amount` to the `PaymentSuccess` page via the location state.

### EMI Options

The component dynamically calculates and displays EMI options based on the course price. The EMI options are hardcoded in this version, but in a real-world application, this data would likely come from a financial service provider.

### User Experience

-   The "Proceed to Pay" button is disabled during payment processing to prevent multiple submissions.
-   The component provides clear visual feedback to the user through toast notifications and the processing state of the button.

## `CourseView` Component

The `CourseView` component, located at `src/pages/CourseView.tsx`, is responsible for displaying detailed information about a specific course. It dynamically fetches course data, manages the user's enrollment status, and conditionally renders content based on whether the user is enrolled in the course.

### Key Functionalities

-   **Data Fetching**: The component fetches course data based on the `courseId` from the URL parameters. In this version, the data is fetched from a local `courses` array, but in a real-world application, this would be an API call.
-   **Enrollment Status**: The component checks if the user is enrolled in the course by looking for enrollment data in the browser's `localStorage`. This is a mock implementation for demonstration purposes.
-   **Conditional Rendering**: The component uses the `isEnrolled` state to conditionally render different content. If the user is enrolled, they will see the course curriculum, instructor details, and an option to join live sessions. If they are not enrolled, they will see a call-to-action to enroll in the course.
-   **Tabs**: The component uses a tabbed interface to organize the course content into different sections, such as "Curriculum," "Instructor," and "Live Sessions."
-   **Toast Notifications**: The component uses the `useToast` hook to display a toast notification if the course is not found.

## `FacultyDevelopment` Component

The `FacultyDevelopment` component, located at `src/pages/FacultyDevelopment.tsx`, is designed to showcase Faculty Development Programs (FDPs) and allow institutions to request an FDP at their college. It features a dialog-based form for submitting FDP requests.

### Key Functionalities

-   **Dialog Form**: The component uses a dialog from `src/components/ui/dialog` to present the FDP request form. This provides a clean and focused user experience for filling out the form.
-   **Form Submission**: The form submission is handled by the `handleSubmit` function. This function constructs a `mailto` link with the form data and opens the user's default email client with a pre-filled email.
-   **Data Encoding**: The form data is URL-encoded to ensure that it is correctly formatted for the `mailto` link.
-   **User Experience**: The use of a dialog for the form submission keeps the user on the same page while providing a clear call to action. The pre-filled email saves the user time and effort.
