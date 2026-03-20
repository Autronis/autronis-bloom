import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import { LanguageProvider } from "./i18n/context";

const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// Eagerly load the homepage for fastest LCP
import Index from "./pages/Index";

// Lazy-load all other routes
const Services = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Demo = lazy(() => import("./pages/Demo"));
const Book = lazy(() => import("./pages/Book"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Process = lazy(() => import("./pages/Process"));
const Team = lazy(() => import("./pages/Team"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ImpactROI = lazy(() => import("./pages/ImpactROI"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="w-10 h-10 border-2 border-primary/20 rounded-full" />
      <div className="absolute inset-0 w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <div className="h-3 w-48 bg-muted rounded-full" />
      <div className="h-2 w-32 bg-muted/60 rounded-full" />
    </div>
  </div>
);

const App = () => (
  <LanguageProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Suspense fallback={null}><Toaster /></Suspense>
          <Suspense fallback={null}><Sonner /></Suspense>
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/book" element={<Book />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/:slug" element={<ResourceDetail />} />
                  <Route path="/impact-roi" element={<ImpactROI />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;
