"use client";

import Navbar from "@/components/Navber";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from "antd";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../../utils/store";
import "./globals.css";


// Create Theme Context with more functionality
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => { },
  setTheme: (mode) => { },
});

export default function ClientLayout({ children }) {


  useEffect(() => {
    document.title = "Mehor";
  }, []);


  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  // Theme state management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Always default to light mode instead of checking system preference
      setIsDarkMode(false);
      document.documentElement.classList.toggle('dark', false);
      // Save light mode as the default preference
      localStorage.setItem('theme', 'light');
    }

    // Apply color scheme to root
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  // Direct theme setter (light/dark)
  const setTheme = (mode) => {
    const newTheme = mode === 'dark';
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  // Light theme tokens
  const lightThemeTokens = {
    colorPrimary: '#0001FB',
    colorBorder: '#E5E4E2',
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextPlaceholder: '#bfbfbf',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgElevated: '#ffffff',
    controlOutline: 'rgba(232, 80, 91, 0.1)',
    borderRadius: 6,
  };

  // Dark theme tokens
  const darkThemeTokens = {
    colorPrimary: '#0001FB',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextPlaceholder: '#737373',
    colorBgContainer: '#1a1a1a',
    colorBgLayout: '#000000',
    colorBgElevated: '#1f1f1f',
    borderRadius: 6,
  };

  // Component-specific overrides with fixed hover states
  const componentOverrides = {
    Layout: {
      headerBg: isDarkMode ? '#141414' : '#ffffff',
      bodyBg: isDarkMode ? '#1a1a1a' : '#ffffff',
      siderBg: isDarkMode ? '#141414' : '#ffffff',
    },
    Menu: {
      itemBg: isDarkMode ? '#141414' : '#ffffff',
      itemSelectedBg: isDarkMode ? '#4E4EFB' : '#0001FB',
      itemSelectedColor: isDarkMode ? '#ffffff' : '#ffffff',
      itemHoverBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      itemHoverColor: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
      itemActiveBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    },
    Table: {
      headerBg: isDarkMode ? '#1f1f1f' : '#fafafa',
      headerColor: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    },
    Card: {
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorBorderSecondary: isDarkMode ? '#333333' : '#f0f0f0',
    },
    Select: {
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
      optionSelectedBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      optionHoverBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      optionHoverColor: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
    },
    Modal: {
      contentBg: isDarkMode ? '#1f1f1f' : '#ffffff',
      headerBg: isDarkMode ? '#1f1f1f' : '#ffffff',
      footerBg: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
    Drawer: {
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
    Dropdown: {
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
      // colorBgTextHover: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    },
    Popover: {
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
    },

    Avatar: {
      colorBgContainer: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    },
    Badge: {
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
    Switch: {
      handleBg: '#ffffff',
      colorPrimary: isDarkMode ? '#4E4EFB' : '#0001FB',
    },
    Tabs: {
      inkBarColor: isDarkMode ? '#4E4EFB' : '#0001FB',
      itemHoverColor: isDarkMode ? '#6464FF' : '#2626FF',
      itemSelectedColor: isDarkMode ? '#4E4EFB' : '#0001FB',
    },
    Timeline: {
      itemColor: isDarkMode ? '#424242' : '#f0f0f0',
    },
  };

  // Define CSS variables for custom components
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty('--background-color', '#1a1a1a');
      root.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.85)');
      root.style.setProperty('--card-bg', '#1f1f1f');
      root.style.setProperty('--hover-bg', '#2a2a2a');
      root.style.setProperty('--secondary-bg', '#141414');
    } else {
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.88)');
      root.style.setProperty('--border-color', '#E5E4E2');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--hover-bg', '#f5f5f5');
      root.style.setProperty('--secondary-bg', '#f9fafb');
    }
  }, [isDarkMode, mounted]);

  // Always return HTML structure, even when not mounted
  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <Head>
        <title>Your Website Title</title> {/* Title tag */}
      </Head>
      <body
        className={`antialiased ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-gray-900'}`}
        cz-shortcut-listen="true"
      >
        <AntdRegistry>
          <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
            <ConfigProvider
              theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: isDarkMode ? darkThemeTokens : lightThemeTokens,
                components: componentOverrides,
              }}
            >
              <Provider store={store}>
                {mounted && (
                  <>
                    {!isAuthPage && <Navbar />}
                    <main className="theme-transition">
                      {children}
                    </main>
                    <Toaster
                      position="top-center"
                      reverseOrder={false}
                      toastOptions={{
                        className: isDarkMode
                          ? 'dark-toast bg-gray-800 text-white'
                          : 'light-toast bg-white text-gray-900',
                      }}
                    />
                  </>
                )}
              </Provider>
            </ConfigProvider>
          </ThemeContext.Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
