import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Landing from './pages/Landing';
import RolePage from './pages/RolePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LegalPage from './pages/LegalPage';
import { LEGAL_SLUGS } from './data/legal';

const VALID_LANGS = ['es', 'en', 'gl', 'ca'];

function LangGate({ children }) {
  const { lang } = useParams();
  if (!VALID_LANGS.includes(lang)) return <Navigate to="/es" replace />;
  return children;
}

// Las URLs antiguas llevaban un segmento "/portfolio" tras el idioma.
function LegacyRedirect() {
  const { lang, '*': rest } = useParams();
  return <Navigate to={`/${lang}${rest ? `/${rest}` : ''}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/es" replace />} />
      <Route path="/:lang" element={<LangGate><Landing /></LangGate>} />
      <Route path={`/:lang/${LEGAL_SLUGS.privacy}`} element={<LangGate><LegalPage kind="privacy" /></LangGate>} />
      <Route path={`/:lang/${LEGAL_SLUGS.legal}`} element={<LangGate><LegalPage kind="legal" /></LangGate>} />
      <Route path="/:lang/portfolio/*" element={<LangGate><LegacyRedirect /></LangGate>} />
      <Route path="/:lang/:role" element={<LangGate><RolePage /></LangGate>} />
      <Route path="/:lang/:role/proyectos/:projectId" element={<LangGate><ProjectDetailPage /></LangGate>} />
      <Route path="/:lang/:role/:tab" element={<LangGate><RolePage /></LangGate>} />
      <Route path="*" element={<Navigate to="/es" replace />} />
    </Routes>
  );
}
