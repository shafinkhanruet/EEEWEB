'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import NavbarProvider from './contexts/NavbarContext';
import StyledComponentsRegistry from './lib/registry';
import { theme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <title>EEEFLIX</title>
        <meta name="description" content="A platform for students to connect and learn" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <NavbarProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </NavbarProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 