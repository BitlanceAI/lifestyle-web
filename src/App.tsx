import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { PROJECTS, ProjectConfig, BRAND_CONFIG } from './data/projects';
import { ProjectNavbar } from './components/ProjectNavbar';
import { BrandHomePage } from './components/BrandHomePage';
import { ProjectPage } from './components/ProjectPage';
import { BlogListingPage } from './components/BlogListingPage';
import { BlogGeneratorModal } from './components/BlogGeneratorModal';
import { BlogArticleModal } from './components/BlogArticleModal';
import { EnquiryModal } from './components/EnquiryModal';
import { AuthOtpModal } from './components/AuthOtpModal';
import { BrandBlogPost } from './data/projects';
import { VerifiedUser } from './types/auth';
import { Chatbot } from './Chatbot';


// Dynamic Project Route Component
function ProjectRoute({ onOpenEnquiry }: { onOpenEnquiry: (pref?: string) => void }) {
  const { slug, section } = useParams<{ slug: string; section?: string }>();
  const navigate = useNavigate();
  const project = slug ? PROJECTS[slug] : null;

  useEffect(() => {
    if (project) {
      // Dynamic SEO Title & Description
      document.title = project.slug === 'aura'
        ? 'Aura by Lifestyle | Premium 2 & 3 BHK Homes & Commercial Spaces in Amravati'
        : 'Lifestyle Home Spaces | 2 & 3 BHK Residences on DPS Road, Amravati';

      // Dynamic Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${project.projectName} — ${project.tagline}. Located at ${project.location.address}. Explore configurations, CAD floor plans & amenities.`);
      }

      // Dynamic OpenGraph Title & Image
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', document.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', `${project.projectName} by Lifestyle Home Spaces`);
    } else {
      // Fallback redirect to home if unknown slug
      navigate('/', { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <ProjectPage
      project={project}
      initialSection={section}
      onSelectProject={(newSlug) => navigate(`/projects/${newSlug}`)}
      onOpenEnquiry={onOpenEnquiry}
    />
  );
}

// Main App Shell
function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPreference, setEnquiryPreference] = useState('2 BHK Residence');

  // Verified User State (persistent in localStorage)
  const [currentUser, setCurrentUser] = useState<VerifiedUser | null>(() => {
    try {
      const saved = localStorage.getItem('lifestyle_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Never opens automatically on page visit or refresh. Opens ONLY when explicitly clicking Sign In.
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBlogGeneratorOpen, setIsBlogGeneratorOpen] = useState(false);
  const [activeGeneratedBlog, setActiveGeneratedBlog] = useState<BrandBlogPost | null>(null);

  // Determine active project based on URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSlug = pathParts[0] === 'projects' && pathParts[1] ? pathParts[1] : null;
  const currentProject = currentSlug ? PROJECTS[currentSlug] : null;

  // Reset generic brand SEO if on homepage
  useEffect(() => {
    if (!currentProject && location.pathname !== '/blogs') {
      document.title = 'Lifestyle Home Spaces | Master Developers in Amravati, Maharashtra';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Explore landmark residential & commercial developments by Lifestyle Home Spaces in Amravati, including Aura by Lifestyle and Lifestyle Homes.');
      }
    }
  }, [currentProject, location.pathname]);

  const handleOpenEnquiry = (pref = '2 BHK Residence') => {
    setEnquiryPreference(pref);
    setIsEnquiryOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'blogs' || sectionId === 'brand-insights') {
      if (location.pathname !== '/blogs') {
        navigate('/blogs');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on /blogs or cross-navigating to homepage sections
    if (location.pathname === '/blogs') {
      navigate('/');
      setTimeout(() => {
        const targetId = sectionId === 'developer' ? 'brand-contact' : sectionId;
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -75;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // If section is not on the current page, navigate home and scroll to it
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const targetId = sectionId === 'developer' ? 'brand-contact' : sectionId;
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const yOffset = -75;
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 120);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('lifestyle_user');
    sessionStorage.removeItem('lifestyle_guest_browsing');
    setCurrentUser(null);
  };

  return (
    <div className="font-sans min-h-screen selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Universal Luxury Navigation */}
      <ProjectNavbar
        currentProject={currentProject}
        onNavigateHome={() => navigate('/')}
        onSelectProject={(slug) => navigate(`/projects/${slug}`)}
        onScrollToSection={handleScrollToSection}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
        onOpenBlogGenerator={currentUser?.isAdmin ? () => setIsBlogGeneratorOpen(true) : undefined}
        onNavigateBlogs={() => navigate('/blogs')}
      />

      {/* Main Routed Content */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <BrandHomePage
                onSelectProject={(slug) => navigate(`/projects/${slug}`)}
                onOpenEnquiry={() => handleOpenEnquiry()}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/blogs"
            element={
              <BlogListingPage
                onSelectProject={(slug) => navigate(`/projects/${slug}`)}
                onOpenEnquiry={() => handleOpenEnquiry()}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <BrandHomePage
                onSelectProject={(slug) => navigate(`/projects/${slug}`)}
                onOpenEnquiry={() => handleOpenEnquiry()}
                currentUser={currentUser}
              />
            }
          />

          <Route
            path="/projects/:slug"
            element={<ProjectRoute onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/projects/:slug/:section"
            element={<ProjectRoute onOpenEnquiry={handleOpenEnquiry} />}
          />
          {/* Catch-all */}
          <Route
            path="*"
            element={
              <BrandHomePage
                onSelectProject={(slug) => navigate(`/projects/${slug}`)}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            }
          />
        </Routes>
      </main>


      {/* Portfolio Concierge Chatbot */}
      <Chatbot />

      {/* Site Visit Booking / Dedicated Priority Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        project={currentProject}
        defaultPreference={enquiryPreference}
        defaultName={currentUser?.name || ''}
        defaultPhone={currentUser?.phone || ''}
        currentUser={currentUser}
        onUserVerified={(user) => setCurrentUser(user)}
      />

      {/* WhatsApp OTP Verification / First Landing Gate */}
      <AuthOtpModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
        currentUser={currentUser}
      />

      {/* Bitlance AI Blog Generator Modal (Global Access) */}
      <BlogGeneratorModal
        isOpen={isBlogGeneratorOpen}
        onClose={() => setIsBlogGeneratorOpen(false)}
        onBlogGenerated={(newBlog) => {
          setActiveGeneratedBlog(newBlog);
        }}
      />

      {/* Reader for Global AI Generated Blog */}
      <BlogArticleModal
        blog={activeGeneratedBlog}
        onClose={() => setActiveGeneratedBlog(null)}
        onOpenEnquiry={handleOpenEnquiry}
      />
    </div>
  );

}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
