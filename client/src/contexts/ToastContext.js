// components/ToastProvider.jsx
import React, { createContext, useContext } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastStyles.css'; // we'll create this next

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const showToast = (message, type = 'default') => {
    toast(message, {
      type,
      className: isDark ? 'toast-dark' : 'toast-light',
      bodyClassName: 'toast-body',
      progressClassName: 'toast-progress',
      transition: Slide,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
