import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CompanyProjects } from './pages/CompanyProjects';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* /index route is no longer needed with HashRouter as generic entry is /#/, but kept for safety if user typed it manually handling */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="/company/:companyName" element={<CompanyProjects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
