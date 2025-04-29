import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './components/StyledComponentsRegistry';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import NavbarPremium from './components/NavbarPremium';
import Footer from './components/Footer';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EEEFLIX',
  description: 'EEEFLIX - Movies and Shows',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={darkTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavbarPremium />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 