# UI Components Documentation

This document provides an overview of the reusable UI components located in `src/components/ui/`. These components are built using `shadcn-ui` and are highly customizable with Tailwind CSS.

## Component List

Below is a list of all UI components and their primary function:

-   **`accordion.tsx`**: Renders a vertically stacked set of interactive headings that each reveal a content panel when clicked.
-   **`alert-dialog.tsx`**: A modal dialog that interrupts the user's workflow to make sure they are aware of a critical piece of information or to make a decision.
-   **`alert.tsx`**: Displays a short, important message to the user.
-   **`aspect-ratio.tsx`**: Renders a component with a fixed aspect ratio.
-   **`avatar.tsx`**: Displays a user's profile picture, initials, or a fallback icon.
-   **`badge.tsx`**: Small, interactive component used for notifications, or to highlight an item.
-   **`breadcrumb.tsx`**: A navigation component that indicates the current page's location within a hierarchical structure.
-   **`button.tsx`**: A clickable button with various styles and sizes.
-   **`calendar.tsx`**: An interactive calendar component for date selection.
-   **`card.tsx`**: A flexible content container with a header, content, and footer.
-   **`carousel.tsx`**: A flexible and extensible carousel component.
-   **`chart.tsx`**: Components for rendering various types of charts and graphs.
-   **`checkbox.tsx`**: A checkbox input component.
-   **`collapsible.tsx`**: A component that allows content to be expanded and collapsed.
-   **`command.tsx`**: A command palette component for quick navigation and actions.
-   **`context-menu.tsx`**: A menu that appears upon user interaction, typically a right-click.
-   **`dialog.tsx`**: A modal dialog that overlays the main content.
-   **`drawer.tsx`**: A draggable sheet that slides in from the bottom of the screen.
-   **`dropdown-menu.tsx`**: A menu that displays a list of options or commands when triggered.
-   **`form.tsx`**: Components for building accessible forms with validation.
-   **`hover-card.tsx`**: A popover that appears when the user hovers over an element.
-   **`input-otp.tsx`**: An input component for one-time passwords (OTP).
-   **`input.tsx`**: A standard text input field.
-   **`label.tsx`**: A component for associating a label with an input field.
-   **`menubar.tsx`**: A menu bar component, typically found at the top of an application window.
-   **`navigation-menu.tsx`**: A navigation menu for complex navigation structures.
-   **`pagination.tsx`**: Components for navigating through paginated content.
-   **`popover.tsx`**: A small overlay that appears on top of other content.
-   **`progress.tsx`**: A progress bar component to show the completion status of a task.
-   **`radio-group.tsx`**: A set of radio buttons for selecting a single option from a list.
-   **`resizable.tsx`**: Components for creating resizable panels.
-   **`scroll-area.tsx`**: A scrollable area component.
-   **`select.tsx`**: A custom select input component.
-   **`separator.tsx`**: A visual separator for grouping content.
-   **`sheet.tsx`**: A panel that slides in from the side of the screen.
-   **`sidebar.tsx`**: A customizable sidebar component for navigation.
-   **`skeleton.tsx`**: Placeholder components to indicate loading states.
-   **`slider.tsx`**: A slider component for selecting a value from a range.
-   **`sonner.tsx`**: A toast notification system.
-   **`switch.tsx`**: A toggle switch component.
-   **`table.tsx`**: Components for displaying tabular data.
-   **`tabs.tsx`**: A tabbed interface for organizing content.
-   **`textarea.tsx`**: A multi-line text input field.
-   **`toast.tsx`**: Individual toast notification component.
-   **`toaster.tsx`**: The container for displaying toast notifications.
-   **`toggle-group.tsx`**: A group of toggle buttons.
-   **`toggle.tsx`**: A toggle button component.
-   **`tooltip.tsx`**: A small pop-up that displays information when hovering over an element.
## Component Structure

-   **`use-toast.ts`**: A hook for managing toast notifications (re-export from `hooks/use-toast.ts`).

## Component Structure

Many of the UI components in this project follow a similar structure that is based on the conventions used by `shadcn-ui`.

### `forwardRef`

Most of the components use `React.forwardRef` to forward a ref to the underlying DOM element. This allows you to get a direct reference to the DOM element and interact with it if needed.

### `cva`

The `cva` (class-variance-authority) library is used to create component variants. This allows you to define different styles for a component based on the props that are passed to it. For example, the `Button` component has variants for different colors, sizes, and styles.

### Props

The components generally accept all the props of the underlying HTML element, as well as any additional props that are specific to the component. This makes the components highly flexible and customizable.

