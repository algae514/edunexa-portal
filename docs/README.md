# Project Documentation

## 1. Project Overview

This project is an educational portal built with React, TypeScript, and Tailwind CSS. It provides features for student programs, faculty development, course enrollment, and user management.

## 2. Technology Stack

- **Frontend**: React.js, TypeScript
- **Styling**: Tailwind CSS, shadcn-ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management/Data Fetching**: React Query

## 3. Getting Started

To set up and run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <YOUR_GIT_URL>
    cd edunexa-portal-main
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:8080`.

## 4. Project Structure

-   `public/`: Static assets.
-   `src/`: Main application source code.
    -   `assets/`: Images and other media.
    -   `components/`: Reusable React components.
        -   `ui/`: shadcn-ui components.
    -   `hooks/`: Custom React hooks.
    -   `lib/`: Utility functions.
    -   `pages/`: Main application pages/views.
-   `App.tsx`: Main application component, sets up routing and global providers.
-   `main.tsx`: Entry point of the React application.
-   `index.css`: Global CSS styles, including Tailwind CSS imports.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `vite.config.ts`: Vite build tool configuration.
-   `package.json`: Project dependencies and scripts.

## 5. Components

### `src/components/Header.tsx`

-   **Description**: The main navigation header for the application. It includes links to various sections, a brand logo, and user authentication/profile actions.
-   **Props**: None.
-   **Dependencies**: `react-router-dom`, `lucide-react`, `Button`, `DropdownMenu` (from `src/components/ui`).

### `src/components/Footer.tsx`

-   **Description**: The application footer, containing quick links, contact information, and social media links.
-   **Props**: None.
-   **Dependencies**: `react-router-dom`, `lucide-react`.

### `src/components/ui/*`

-   **Description**: These are UI components from `shadcn-ui`, customized and integrated into the project. Each file typically exports a React component and related types/variants.
-   **Key Components**: `Button`, `Card`, `Input`, `Label`, `Select`, `Badge`, `Tabs`, `Avatar`, `Progress`, `Calendar`, `Toaster`, `Sonner`, `Tooltip`.

## 6. Pages

### `src/pages/Home.tsx`

-   **Description**: The landing page of the application, featuring a hero section, key features, expert profiles, and a call to action.
-   **Dependencies**: `react-router-dom`, `Button`, `Card`, `Badge`, `lucide-react`.

### `src/pages/StudentProgrammes.tsx`

-   **Description**: Displays a list of available courses for students, with filtering and search functionalities.
-   **Dependencies**: `react-router-dom`, `Button`, `Card`, `Badge`, `Input`, `Select`, `lucide-react`.

### `src/pages/FacultyDevelopment.tsx`

-   **Description**: Provides information about faculty development programs, including scheduled events and a registration form.
-   **Dependencies**: `Button`, `Card`, `Badge`, `Separator`, `Input`, `Label`, `Textarea`, `lucide-react`, `Dialog`.

### `src/pages/CourseView.tsx`

-   **Description**: Displays detailed information about a specific course, including curriculum, instructor details, and enrollment options.
-   **Dependencies**: `react-router-dom`, `Button`, `Card`, `Badge`, `Tabs`, `Avatar`, `Separator`, `lucide-react`, `useToast`.

### `src/pages/Enroll.tsx`

-   **Description**: Provides a summary of the selected course and options for enrollment, including pricing and prerequisites.
-   **Dependencies**: `react-router-dom`, `Card`, `Button`, `Badge`, `Separator`, `lucide-react`.

### `src/pages/Payment.tsx`

-   **Description**: Handles the payment process for course enrollment, offering single payment and EMI options.
-   **Dependencies**: `react-router-dom`, `Card`, `Button`, `Badge`, `RadioGroup`, `Label`, `Separator`, `lucide-react`, `useToast`.

### `src/pages/Login.tsx`

-   **Description**: User login page with options for email/password and social logins.
-   **Dependencies**: `react-router-dom`, `Button`, `Input`, `Label`, `Card`, `Separator`.

### `src/pages/Signup.tsx`

-   **Description**: User registration page for creating a new account.
-   **Dependencies**: `react-router-dom`, `Button`, `Input`, `Label`, `Card`, `Separator`, `Select`.

### `src/pages/Profile.tsx`

-   **Description**: User profile page displaying personal information, enrolled courses, progress, and achievements.
-   **Dependencies**: `Card`, `Button`, `Input`, `Label`, `Badge`, `Avatar`, `Tabs`, `Progress`, `lucide-react`.

### `src/pages/Calendar.tsx`

-   **Description**: Displays a calendar of upcoming and completed sessions for enrolled courses.
-   **Dependencies**: `Card`, `Badge`, `Button`, `lucide-react`.

### `src/pages/Testimonials.tsx`

-   **Description**: Showcases testimonials from students and faculty, and provides a form for submitting new testimonials.
-   **Dependencies**: `Card`, `Button`, `Input`, `Label`, `Textarea`, `Select`, `Star`, `Quote`, `Badge`.

### `src/pages/Contact.tsx`

-   **Description**: Provides contact information, business hours, and a contact form for general inquiries.
-   **Dependencies**: `Card`, `Button`, `Input`, `Label`, `Textarea`, `Select`, `lucide-react`.

### `src/pages/NotFound.tsx`

-   **Description**: A generic 404 error page for routes that do not exist.
-   **Dependencies**: `react-router-dom`.

## 7. Utilities and Hooks

### `src/lib/utils.ts`

-   **Description**: Contains utility functions, primarily `cn` for conditionally joining Tailwind CSS classes.
-   **Dependencies**: `clsx`, `tailwind-merge`.

### `src/hooks/use-mobile.tsx`

-   **Description**: A custom React hook to detect if the current viewport width corresponds to a mobile device.
-   **Dependencies**: `react`.

### `src/hooks/use-toast.ts`

-   **Description**: A custom React hook for managing and displaying toast notifications across the application.
-   **Dependencies**: `react`, `Toast` components from `src/components/ui/toast`.

## 8. Deployment

This section provides instructions on how to deploy the application, including the frontend and backend.

### Frontend

The frontend of the application can be deployed to any static site hosting service, such as Netlify, Vercel, or GitHub Pages. To deploy the frontend, you will need to build the application for production and then upload the contents of the `dist` directory to your hosting provider.

```bash
npm run build
```

### Backend

The backend of the application is a Node.js/Express server that provides an API for sending emails. To deploy the backend, you will need to deploy it to a hosting service that supports Node.js, such as Heroku, Render, or AWS.

#### Backend Email Service

The backend email service is responsible for sending emails for the contact form, testimonial form, and FDP registration form. To set up the email service, you will need to do the following:

1.  **Choose an email service provider**: You can use any email service provider that provides an API for sending emails, such as SendGrid, AWS SES, or Mailgun.
2.  **Get API keys**: You will need to get API keys from your email service provider.
3.  **Set environment variables**: You will need to set the following environment variables on your backend server:
    -   `SENDGRID_API_KEY` (or the API key for your chosen provider)
    -   `FROM_EMAIL`
    -   `TO_EMAIL`
4.  **Configure the email service**: You will need to configure the email service in the backend code to use your API keys and email addresses.

## 9. API Endpoints

This section provides a summary of the available API endpoints in the backend.

| Endpoint                      | Method | Description                                         |
| ----------------------------- | ------ | --------------------------------------------------- |
| `/api/send-email/fdp-registration` | POST   | Sends an email for FDP (Faculty Development Program) registration requests. |
| `/api/send-email/testimonial`   | POST   | Sends an email with a new testimonial submission.     |
| `/api/send-email/contact`       | POST   | Sends an email from the contact form.               |

## 10. Contributing

We welcome contributions to the EduNexa Portal! If you would like to contribute, please follow these guidelines:

### Reporting Bugs

If you find a bug, please open an issue on GitHub. Please include a clear and concise description of the bug, as well as steps to reproduce it.

### Suggesting Features

If you have an idea for a new feature, please open an issue on GitHub. Please include a clear and concise description of the feature, as well as any potential use cases.

### Submitting Pull Requests

If you would like to submit a pull request, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your changes.
3.  Make your changes and commit them to your branch.
4.  Push your branch to your fork.
5.  Open a pull request on the main repository.

Please make sure that your pull request includes a clear and concise description of the changes you have made.
