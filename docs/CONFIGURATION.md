# Configuration Files Documentation

This document outlines the purpose and key configurations of the main configuration files in the project.

## 1. `components.json`

-   **Purpose**: Configuration file for `shadcn-ui` components. It defines the styling, component aliases, and paths for the UI components.
-   **Key Configurations**:
    -   `$schema`: Reference to the shadcn-ui schema for validation.
    -   `style`: Defines the base style for components (e.g., `"default"`).
    -   `rsc`: Indicates if React Server Components are used (set to `false`).
    -   `tsx`: Specifies if TypeScript with JSX is used (set to `true`).
    -   `tailwind`:
        -   `config`: Path to the Tailwind CSS configuration file (`tailwind.config.ts`).
        -   `css`: Path to the main CSS file (`src/index.css`).
        -   `baseColor`: Base color for shadcn-ui components (e.g., `"slate"`).
        -   `cssVariables`: Enables CSS variables for theming.
        -   `prefix`: Tailwind CSS prefix (empty string, meaning no prefix).
    -   `aliases`: Defines path aliases for easier imports (e.g., `@/components`, `@/lib/utils`).

## 2. `eslint.config.js`

-   **Purpose**: ESLint configuration for linting JavaScript and TypeScript files. It ensures code quality and adherence to coding standards.
-   **Key Configurations**:
    -   `ignores`: Specifies files/directories to ignore during linting (e.g., `"dist"`).
    -   `extends`: Extends recommended ESLint and TypeScript ESLint configurations.
    -   `files`: Specifies which files to apply the configuration to (e.g., `"**/*.{ts,tsx}"`).
    -   `languageOptions`:
        -   `ecmaVersion`: ECMAScript version (e.g., `2020`).
        -   `globals`: Defines global variables (e.g., `globals.browser`).
    -   `plugins`: Includes ESLint plugins for React Hooks and React Refresh.
    -   `rules`: Custom ESLint rules, including those from `react-hooks` and `react-refresh`, and disabling `@typescript-eslint/no-unused-vars`.

## 3. `postcss.config.js`

-   **Purpose**: PostCSS configuration for processing CSS. It integrates Tailwind CSS and Autoprefixer.
-   **Key Configurations**:
    -   `plugins`:
        -   `tailwindcss`: Enables Tailwind CSS processing.
        -   `autoprefixer`: Adds vendor prefixes to CSS rules.

## 4. `tailwind.config.ts`

-   **Purpose**: Tailwind CSS configuration file. It defines custom themes, colors, fonts, and extends Tailwind's default utility classes.
-   **Key Configurations**:
    -   `darkMode`: Configures dark mode (e.g., `"class"`).
    -   `content`: Specifies files to scan for Tailwind classes to optimize output size.
    -   `prefix`: Custom prefix for Tailwind classes (empty string).
    -   `theme`:
        -   `container`: Defines container styles.
        -   `extend`: Extends default Tailwind theme with custom colors (e.g., `primary`, `secondary`, `sidebar`), border radii, keyframes, and animations.
    -   `plugins`: Includes Tailwind CSS plugins (e.g., `tailwindcss-animate`).

## 5. `tsconfig.json`

-   **Purpose**: Base TypeScript configuration for the entire project. It references other `tsconfig` files for specific contexts (e.g., application, Node.js).
-   **Key Configurations**:
    -   `files`: Empty array, as specific files are handled by other `tsconfig` files.
    -   `references`: Links to `tsconfig.app.json` and `tsconfig.node.json`.
    -   `compilerOptions`:
        -   `baseUrl`: Base directory for resolving non-relative module names.
        -   `paths`: Defines path aliases (e.g., `@/*` maps to `./src/*`).
        -   `noImplicitAny`, `noUnusedParameters`, `skipLibCheck`, `allowJs`, `noUnusedLocals`, `strictNullChecks`: Various TypeScript strictness and behavior options.

## 6. `tsconfig.app.json`

-   **Purpose**: TypeScript configuration specifically for the client-side application code.
-   **Key Configurations**:
    -   `extends`: Extends the base `tsconfig.json`.
    -   `compilerOptions`:
        -   `target`: ECMAScript target version for compilation (e.g., `ES2020`).
        -   `lib`: Libraries to include in the compilation (e.g., `ES2020`, `DOM`).
        -   `module`: Module system for the output (e.g., `ESNext`).
        -   `jsx`: JSX factory to use (e.g., `react-jsx`).
        -   `noEmit`: Prevents TypeScript from emitting JavaScript files (handled by Vite).
        -   `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitAny`, `noFallthroughCasesInSwitch`: Strictness flags.
    -   `include`: Specifies files to include in this compilation (e.g., `"src"`).

## 7. `tsconfig.node.json`

-   **Purpose**: TypeScript configuration specifically for Node.js environment files, such as `vite.config.ts`.
-   **Key Configurations**:
    -   `compilerOptions`:
        -   `target`: ECMAScript target version for Node.js (e.g., `ES2022`).
        -   `lib`: Libraries to include (e.g., `ES2023`).
        -   `module`: Module system (e.g., `ESNext`).
        -   `noEmit`: Prevents TypeScript from emitting JavaScript files.
        -   `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`: Strictness flags.
    -   `include`: Specifies files to include (e.g., `"vite.config.ts"`).

## 8. `vite.config.ts`

-   **Purpose**: Vite build tool configuration. It defines how the project is built, served, and optimized.
-   **Key Configurations**:
    -   `server`:
        -   `host`: Host address for the development server (e.g., `"::"`).
        -   `port`: Port for the development server (e.g., `8080`).
    -   `plugins`: Includes Vite plugins, such as `@vitejs/plugin-react-swc` for React support and `lovable-tagger` for development mode.
    -   `resolve`:
        -   `alias`: Configures path aliases for module imports (e.g., `@` maps to `src`).

## Vite Configuration

The `vite.config.ts` file is the main configuration file for Vite. It allows you to customize the behavior of the Vite development server and build process.

### Server Configuration

The `server` object in the Vite configuration allows you to configure the development server. You can specify the host, port, and other options.

### Plugins

The `plugins` array allows you to add Vite plugins to your project. Vite plugins can add new features and functionality to your project.

### Resolve Aliases

The `resolve.alias` object allows you to create aliases for module imports. This can make it easier to import modules from common directories.
