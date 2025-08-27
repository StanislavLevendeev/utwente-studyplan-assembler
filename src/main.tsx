import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UTwenteDSTPlanner from './components/DSTStudyPlanner.tsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <UTwenteDSTPlanner />
    </StrictMode>,
  );
}
