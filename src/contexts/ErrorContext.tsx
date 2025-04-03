import React, { createContext, useState } from "react";

interface ErrorContextType {
  error: string | null;
  showError: (message: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType>({
  error: null,
  showError: () => {},
  hideError: () => {},
});

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;