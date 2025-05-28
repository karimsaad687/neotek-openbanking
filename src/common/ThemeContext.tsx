// ThemeContext.tsx
import React, { createContext } from 'react';

// Define types for better TypeScript support
type FontConfig = {
  regular: string;
  bold: string;
  medium?: string;
  semiBold?: string;
};

type ThemeConfig = {
  primaryColor: string;
  primaryButtonTextColor: string;
  secondaryColor: string;
  secondaryButtonTextColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  white: string;
  gray: string;
};

type ThemeContextType = {
  themeMain: ThemeConfig;
  fontMain: FontConfig;
};

// Default font configuration
const defaultFonts: FontConfig = {
  regular: 'sfprodisplayregular',
  bold: 'sfprodisplaybold',
  semiBold: 'sfprodisplaysemibold',
  medium: 'sfprodisplaymedium'
};

// Default theme configuration
const defaultTheme: ThemeConfig = {
  primaryColor: '#0CBAB7',
  primaryButtonTextColor: '#ffffff',
  secondaryColor: '#D8ECEB',
  secondaryButtonTextColor: '#0CBAB4',
  textPrimaryColor: '#000000',
  textSecondaryColor: '#72788E',
  white: '#fff',
  gray: '#F7F8FA'
};

// Create context with defaults
export const ThemeContext = createContext<ThemeContextType>({
  themeMain: defaultTheme,
  fontMain: defaultFonts
});

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: {
    themeMain?: Partial<ThemeConfig>;
    fontMain?: Partial<FontConfig>;
  };
};

export const ThemeProvider = ({ children, theme = {} }: ThemeProviderProps) => {
  // Merge provided theme with defaults
  const themeMain = { ...defaultTheme, ...theme.themeMain };
  const fontMain = { ...defaultFonts, ...theme.fontMain };

  return (
    <ThemeContext.Provider value={{ themeMain, fontMain }}>
      {children}
    </ThemeContext.Provider>
  );
};