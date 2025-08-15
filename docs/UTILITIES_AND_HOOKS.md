# Utilities and Hooks Documentation

This document provides an overview of the utility functions and custom React hooks used across the application. These are located in `src/lib/` and `src/hooks/` respectively.

## Utility Functions

### `src/lib/utils.ts`

-   **`cn(...inputs: ClassValue[]): string`**
    -   **Description**: A utility function that intelligently merges Tailwind CSS classes. It combines `clsx` for conditional class joining and `tailwind-merge` for resolving conflicting Tailwind classes.
    -   **Parameters**:
        -   `inputs`: An array of `ClassValue` (which can be strings, objects, or arrays of `ClassValue`).
    -   **Returns**: A single string containing merged and optimized CSS class names.
    -   **Usage**: Primarily used in React components to dynamically apply CSS classes based on props or state, ensuring correct Tailwind CSS application.
    -   **Example**:
        ```typescript
        import { cn } from "@/lib/utils";

        <div className={cn("text-red-500", isActive && "font-bold")} />
        ```

## Custom Hooks

### `src/hooks/use-mobile.tsx`

-   **`useIsMobile(): boolean`**
    -   **Description**: A custom React hook that determines if the current viewport width corresponds to a mobile device. It listens for window resize events and updates its state accordingly.
    -   **Parameters**: None.
    -   **Returns**: A boolean value indicating whether the device is considered mobile (viewport width less than `MOBILE_BREAKPOINT`, which is 768px).
    -   **Usage**: Useful for rendering different UI elements or applying different logic based on the device type (mobile vs. desktop).
    -   **Example**:
        ```typescript
        import { useIsMobile } from "@/hooks/use-mobile";

        const MyComponent = () => {
          const isMobile = useIsMobile();

          return (
            <div>
              {isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}
            </div>
          );
        };
        ```

### `src/hooks/use-toast.ts`

-   **`useToast(): { toasts: ToasterToast[]; toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void; }; dismiss: (toastId?: string) => void; }`**
    -   **Description**: A custom React hook for managing and displaying toast notifications across the application. It provides functions to add, update, and dismiss toasts.
    -   **Parameters**: None.
    -   **Returns**: An object containing:
        -   `toasts`: An array of active toast objects.
        -   `toast`: A function to create and display a new toast notification.
        -   `dismiss`: A function to dismiss a specific toast by ID or all toasts if no ID is provided.
    -   **Usage**: Used in conjunction with `src/components/ui/toaster.tsx` and `src/components/ui/toast.tsx` to provide a consistent notification system.
    -   **Example**:
        ```typescript
        import { useToast } from "@/hooks/use-toast";

        const MyComponent = () => {
          const { toast } = useToast();

          const handleClick = () => {
            toast({
              title: "Event Scheduled",
              description: "Your event has been successfully scheduled.",
              variant: "success",
            });
          };

          return (
            <button onClick={handleClick}>Show Toast</button>
          );
        };
        ```

## React Query

React Query is a powerful library for data fetching and state management in React applications. It provides a simple and declarative API for fetching, caching, and updating data from a server.

While there are no explicit uses of React Query in the current file structure, the project is set up to use it for data fetching. In a real-world application, you would use React Query to fetch data from the backend API and manage the state of that data in the frontend.

### Key Features

-   **Declarative Data Fetching**: React Query allows you to fetch data from a server using a simple and declarative API.
-   **Caching**: React Query automatically caches data from the server, which can improve the performance of your application.
-   **Automatic Refetching**: React Query can automatically refetch data from the server when it becomes stale.
-   **State Management**: React Query can be used to manage the state of your data in the frontend.
        ```

## Custom Hooks

### `src/hooks/use-mobile.tsx`

-   **`useIsMobile(): boolean`**
    -   **Description**: A custom React hook that determines if the current viewport width corresponds to a mobile device. It listens for window resize events and updates its state accordingly.
    -   **Parameters**: None.
    -   **Returns**: A boolean value indicating whether the device is considered mobile (viewport width less than `MOBILE_BREAKPOINT`, which is 768px).
    -   **Usage**: Useful for rendering different UI elements or applying different logic based on the device type (mobile vs. desktop).
    -   **Example**:
        ```typescript
        import { useIsMobile } from "@/hooks/use-mobile";

        const MyComponent = () => {
          const isMobile = useIsMobile();

          return (
            <div>
              {isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}
            </div>
          );
        };
        ```

### `src/hooks/use-toast.ts`

-   **`useToast(): { toasts: ToasterToast[]; toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void; }; dismiss: (toastId?: string) => void; }`**
    -   **Description**: A custom React hook for managing and displaying toast notifications across the application. It provides functions to add, update, and dismiss toasts.
    -   **Parameters**: None.
    -   **Returns**: An object containing:
        -   `toasts`: An array of active toast objects.
        -   `toast`: A function to create and display a new toast notification.
        -   `dismiss`: A function to dismiss a specific toast by ID or all toasts if no ID is provided.
    -   **Usage**: Used in conjunction with `src/components/ui/toaster.tsx` and `src/components/ui/toast.tsx` to provide a consistent notification system.
    -   **Example**:
        ```typescript
        import { useToast } from "@/hooks/use-toast";

        const MyComponent = () => {
          const { toast } = useToast();

          const handleClick = () => {
            toast({
              title: "Event Scheduled",
              description: "Your event has been successfully scheduled.",
              variant: "success",
            });
          };

          return (
            <button onClick={handleClick}>Show Toast</button>
          );
        };
        ```
