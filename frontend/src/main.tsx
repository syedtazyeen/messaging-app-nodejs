// Import necessary modules from React and React-DOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import styles and providers
import './index.css';
import { ChatProvider } from './providers/ChatProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { AuthProvider } from './providers/AuthProvider';
import App from './App';

// Ensure the root element exists before attempting to render
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create the root and render the app wrapped in context providers
  createRoot(rootElement).render(
    <StrictMode>
      <ScreenProvider>
        <AuthProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </AuthProvider>
      </ScreenProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
