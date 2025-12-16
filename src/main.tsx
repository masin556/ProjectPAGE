// DEBUG: Global Error Handler
window.onerror = function (message, source, lineno, colno, error) {
  alert('Global Error:\n' + message + '\nLine: ' + lineno + '\nCol: ' + colno + '\nSource: ' + source + '\nError: ' + error);
};
window.onunhandledrejection = function (event) {
  alert('Unhandled Promise Rejection:\n' + event.reason);
};

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
