import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import MobileActionBar from "./components/MobileActionBar";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import CGV from "./pages/CGV";
import APropos from "./pages/APropos";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import RealisationsPage from "./pages/RealisationsPage";
import RealisationDetail from "./pages/RealisationDetail";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BlogAdmin from "./pages/admin/Blog";
import BlogEditor from "./pages/admin/BlogEditor";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Devis from "./pages/admin/Devis";
import Realisations from "./pages/admin/Realisations";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function PublicSite() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/realisations/:id" element={<RealisationDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<Confidentialite />} />
          <Route path="/cgv" element={<CGV />} />
        </Routes>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="devis" element={<Devis />} />
            <Route path="realisations" element={<Realisations />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="blog/nouveau" element={<BlogEditor />} />
            <Route path="blog/:id" element={<BlogEditor />} />
          </Route>
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
