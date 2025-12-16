// DEBUG: Global Error Handler
window.onerror = function (message, source, lineno, colno, error) {
  // Use console.error for visibility in devtools, alert for verified visibility
  console.error('Global Error', message, source, lineno, colno, error);
  alert('Global Error:\n' + message + '\nLine: ' + lineno + '\nCol: ' + colno + '\nSource: ' + source + '\nError: ' + error);
};
window.onunhandledrejection = function (event) {
  console.error('Unhandled Rejection', event.reason);
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
