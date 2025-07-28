# Project Architecture

## Overview

This is a **Next.js 15** portfolio/marketing website built with **TypeScript**, **Tailwind CSS**, and **SCSS**. The project follows a simple, clean architecture focused on showcasing content through blog posts and portfolio items.

## Folder Structure

```
src/
├── app/                                # Next.js App Router (pages)
│   ├── layout.tsx                      # Root layout with fonts and metadata
│   ├── fonts.ts                        # Font configurations (DM Sans, EB Garamond, Hanken Grotesk)
│   ├── error.tsx                       # Global error boundary
│   ├── (landing)/                      # Landing page route group
│   │   └── page.tsx                    # Home/landing page
│   ├── about/                          # About page
│   │   └── page.tsx
│   ├── services/                       # Services page
│   │   └── page.tsx
│   ├── blog/                           # Blog section
│   │   ├── page.tsx                    # Blog listing page
│   │   └── [slug]/                     # Dynamic blog post pages
│   │       └── page.tsx
│   ├── portfolio/                      # Portfolio section
│   │   ├── page.tsx                    # Portfolio listing page
│   │   └── [slug]/                     # Dynamic portfolio item pages
│   │       └── page.tsx
│   └── contact/                        # Contact page
│       └── page.tsx
├── components/                         # React components
│   ├── ui/                             # Base UI components (shadcn/ui)
│   │   ├── popover.tsx                 # Popover component
│   │   └── sonner.tsx                  # Toast notifications
│   ├── icons/                          # Custom icon components
│   │   ├── Cloud.tsx                   # Cloud icon
│   │   ├── Logo.tsx                    # Logo component
│   │   ├── Pattern.tsx                 # Pattern/decoration icon
│   │   └── WorldMap.tsx                # World map icon
│   ├── forms/                          # Form-specific components
│   │   └── common/                     # Reusable form components
│   │       └── FormFields.tsx          # Common form field components
│   ├── layout/                         # Layout components
│   │   ├── Header/                     # Header components
│   │   │   └── index.tsx               # Main header component
│   │   ├── Footer/                     # Footer components
│   │   │   └── FounderFooter.tsx       # Founder-specific footer
│   │   ├── Hero/                       # Hero section components
│   │   │   ├── index.tsx               # Main hero component
│   │   │   ├── AdminScreen.tsx         # Admin screen showcase
│   │   │   └── HeroBackground.tsx      # Hero background component
│   │   └── common/                     # Common layout components
│   │       ├── Button.tsx              # Custom button component
│   │       ├── SectionSeparator.tsx    # Section separator component
│   │       ├── TextUnderline.tsx       # Text underline decoration
│   │       └── ThemeSwitcher.tsx       # Theme toggle component
│   └── common/                         # Shared/common components
│       └── loading/                    # Loading states
│           └── LoadingSpinner.tsx      # Loading spinner component
├── lib/                                # Utilities and configurations
│   ├── constants/                      # Application constants
│   │   ├── api.ts                      # API-related constants
│   │   ├── routes.ts                   # Application routes
│   │   └── index.ts                    # Main constants export (APP_NAME, VERSION)
│   ├── utils/                          # Utility functions
│   │   ├── date.ts                     # Date formatting utilities
│   │   ├── file.ts                     # File handling utilities
│   │   └── string.ts                   # String manipulation utilities
│   ├── validations/                    # Validation schemas (empty - planned)
│   └── helper.ts                       # General helper functions

├── types/                              # TypeScript type definitions
│   ├── button.ts                       # Button component types
│   ├── global.ts                       # Global types and interfaces
│   ├── separator.ts                    # Separator component types
│   └── ui.ts                           # UI component types
├── styles/                             # SCSS styling
│   ├── global.scss                     # Global styles and Tailwind imports
│   ├── themes.scss                     # Theme configurations (light/dark mode)
│   ├── utilities.scss                  # Utility classes
│   ├── components.scss                 # Component-specific styles
│   └── animations.scss                 # Animation styles
├── providers/                          # React context providers
│   ├── ThemeProvider.tsx               # Theme context (light/dark mode)
│   └── index.tsx                       # Combined providers wrapper
└── store/                              # State management (planned structure)
    ├── apis/                           # API layer (empty - planned)
    ├── hooks/                          # Custom hooks (empty - planned)
    ├── middleware/                     # Redux middleware (empty - planned)
    ├── reducers/                       # Redux reducers (empty - planned)
    ├── selectors/                      # State selectors (empty - planned)
    └── index.ts                        # Store configuration
```

## Key Technologies

- **Next.js 15.4.4** - React framework with App Router
- **TypeScript 5.8.3** - Type safety and development experience
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **SCSS** - Enhanced CSS with variables and mixins
- **shadcn/ui** - High-quality UI component library
- **Lucide React** - Icon library
- **pnpm** - Package manager

## Architecture Principles

### 1. **Simple and Clean Structure**
- Focused on content presentation (blog, portfolio)
- Minimal complexity for easy maintenance
- Clear separation of concerns

### 2. **Component Organization**
- **UI Components**: Reusable base components from shadcn/ui
- **Layout Components**: Page structure and navigation
- **Common Components**: Shared functionality across pages
- **Icons**: Custom SVG icon components

### 3. **Styling Strategy**
- **Tailwind CSS**: Primary styling approach
- **SCSS**: Custom styles and theme management
- **CSS Variables**: Theme switching support
- **Component-scoped styles**: When needed

### 4. **Type Safety**
- Comprehensive TypeScript coverage
- Typed component props and interfaces
- Strict type checking enabled

## Current State vs. Planned Features

### ✅ **Currently Implemented**
- Basic Next.js App Router structure
- Simple page routing (landing, about, services, blog, portfolio, contact)
- Basic component library with layout components
- Theme switching functionality
- SCSS styling system
- TypeScript configuration

### 🚧 **Planned/Empty Directories**
- **Store management**: Redux/state management structure exists but is empty
- **API integration**: Store APIs directory prepared but not implemented
- **Validation schemas**: Directory exists but no schemas defined
- **Advanced features**: Authentication, user management, analytics (not currently needed)

## Development Workflow

### **Code Quality**
- ESLint with Next.js configuration
- Prettier for code formatting
- TypeScript strict mode
- Automated formatting on save

### **Build Process**
- Next.js optimized builds
- Automatic code splitting
- Image optimization
- Performance optimizations

## Significant Changes from Previous Documentation

The previous architecture documentation described a complex multi-user platform with:
- Authentication and user management systems
- Admin dashboards and role-based access control
- Complex Redux store with multiple slices and API layers
- GraphQL integration
- Extensive validation schemas
- Marketing and analytics features

**Current Reality**: This is a **simple portfolio/marketing website** focused on content presentation. The complex features were planned but not implemented, making this a much simpler and more maintainable codebase.

This architecture supports the current needs of a portfolio/marketing website while providing a foundation for future enhancements if needed.
