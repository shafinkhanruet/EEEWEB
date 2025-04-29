# Migration Guide: From Create React App to Next.js

This document provides instructions for migrating the actual EEEFLIX project from Create React App to Next.js using the temporary structure we've created.

## Step 1: Create a New Next.js Project

Start by creating a new Next.js project:

```bash
npx create-next-app@latest eeeflix-next
# or
yarn create next-app eeeflix-next
```

## Step 2: Copy Configuration Files

Copy the following files from `temp_next` to your new project:

1. `next.config.js` - Next.js configuration
2. `package.json` - Update your dependencies based on this file
3. `README.md` - Project documentation

## Step 3: Install Dependencies

Install all the dependencies listed in the package.json:

```bash
npm install
# or
yarn install
```

## Step 4: Set Up Project Structure

Copy the following directories and files from `temp_next` to your new project:

1. `app/` directory with all its contents
2. `public/` directory with all static assets

## Step 5: Migrate Styles

1. Copy the `styles` folder from `temp_next/app/styles` to your project's `app` directory
2. Ensure the theme configuration is properly set up

## Step 6: Migrate Components

1. Copy the components from `temp_next/app/components` to your project's `app/components` directory
2. Make any necessary adjustments for your specific requirements

## Step 7: Migrate Pages

1. Copy the page files from `temp_next/app` to your project's `app` directory
2. Adjust routes as needed to match your existing CRA routes

## Step 8: Update API Integration

1. Create an `app/api` directory if you have API routes
2. Migrate any API logic from your CRA project to Next.js API routes

## Step 9: Test the Migration

1. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Test all pages and functionality
3. Check for any console errors or warnings

## Step 10: Update Firebase/Vercel Configuration

If you're using Firebase or Vercel:

1. Update your Firebase configuration files
2. Update your Vercel configuration for deployment

## Step 11: Deploy

Once everything is working properly, deploy your Next.js app:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Important Differences to Note

1. **Routing**:
   - Next.js uses file-based routing (App Router) instead of React Router
   - Dynamic routes use the `[param]` syntax in folder names

2. **Styling**:
   - Styled Components need the special registry for SSR
   - Global styles are imported in the root layout

3. **Data Fetching**:
   - Next.js offers server-side data fetching options
   - Consider moving API calls to server components where appropriate

4. **Images**:
   - Use Next.js's Image component for optimized images
   - Configure domains in next.config.js

5. **Environment Variables**:
   - Next.js has its own way of handling environment variables
   - Client-side variables must be prefixed with `NEXT_PUBLIC_`

## Troubleshooting

- If you encounter hydration errors, make sure client components are properly marked with 'use client'
- For styled-components issues, ensure the registry is set up correctly
- Check Next.js documentation for specific feature migrations 