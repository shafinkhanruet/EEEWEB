import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './components/StyledComponentsRegistry';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import NavbarPremium from './components/NavbarPremium';
import FooterPremium from './components/FooterPremium';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EEEFLIX',
  description: 'EEEFLIX - Movies and Shows',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover',
  themeColor: '#E50914',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#E50914" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={darkTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavbarPremium />
              <main style={{ flex: 1 }}>{children}</main>
              <FooterPremium />
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 