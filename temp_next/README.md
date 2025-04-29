# EEEFLIX - Next.js Version

This is a Next.js version of the EEEFLIX project, migrated from Create React App.

## Features

- Server-side rendering with Next.js
- Styled Components for styling
- Responsive design for all device sizes
- Smooth animations with Framer Motion
- Dynamic routing for student profiles

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - The main application folder (Next.js App Router)
  - `components/` - Reusable UI components
  - `styles/` - Global styles and theme configuration
  - `page.js` - The homepage
  - `students/` - Students listing page
  - `student/[id]/` - Dynamic student profile pages
  - `contact/` - Contact page
  - `layout.js` - Root layout with navigation and footer
- `public/` - Static assets like images and fonts

## Key Dependencies

- Next.js - React framework for server-side rendering
- Styled Components - CSS-in-JS styling
- Framer Motion - Animation library
- React Icons - Icon set

## Deployment

This application can be deployed to platforms like Vercel or Netlify with minimal configuration.

For production builds:

```bash
npm run build
# or
yarn build
```

## Migration Notes

This project has been migrated from Create React App to Next.js. The following changes were made:

1. Restructured the project to use Next.js App Router
2. Converted React Router routes to Next.js routes
3. Added server-side rendering capabilities
4. Configured styled-components for Next.js
5. Updated navigation to use Next.js Link component

## Next Steps

- Add more pages (About, Resources, etc.)
- Implement a real backend API
- Add authentication
- Enhance SEO with Next.js metadata 