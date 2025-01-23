import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/styles.css";
import "./styles/theme.css";
import "./styles/progress.css";
import "./styles/question.css";
import "./styles/result.css";
import "./styles/summary.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
