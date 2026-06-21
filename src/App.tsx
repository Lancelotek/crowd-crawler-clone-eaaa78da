import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { LanguageRedirect } from "@/i18n/LanguageRedirect";
import SEOHead from "@/components/SEOHead";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Index = lazy(() => import("./pages/Index"));
import MailerLiteLoader from "./components/MailerLiteLoader";

const BookCall = lazy(() => import("./pages/BookCall"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Process = lazy(() => import("./pages/Process"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Leads = lazy(() => import("./pages/Leads"));
const SeoDashboard = lazy(() => import("./pages/SeoDashboard"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Report = lazy(() => import("./pages/Report"));
const Packages = lazy(() => import("./pages/Packages"));
const Quiz = lazy(() => import("./pages/Quiz"));
const LP = lazy(() => import("./pages/LP"));
const FounderInfluencer = lazy(() => import("./pages/FounderInfluencer"));
const Gamefound = lazy(() => import("./pages/Gamefound"));
const SaasPrelaunch = lazy(() => import("./pages/SaasPrelaunch"));
const EcommercePrelaunch = lazy(() => import("./pages/EcommercePrelaunch"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const ContactRedirect = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const safeLang = lang === "pl" ? "pl" : "en";
  const target = `/${safeLang}/book`;
  const title = safeLang === "pl"
    ? "Kontakt — Umów rozmowę strategiczną | JAY-23"
    : "Contact — Book a Strategy Call | JAY-23";
  const description = safeLang === "pl"
    ? "Najlepszy sposób kontaktu z JAY-23 to bezpłatna 30-minutowa rozmowa strategiczna. Przekierowujemy do formularza rezerwacji."
    : "The best way to reach JAY-23 is a free 30-minute strategy call. Redirecting you to the booking page.";

  useEffect(() => {
    const id = window.setTimeout(() => navigate(target, { replace: true }), 0);
    return () => window.clearTimeout(id);
  }, [navigate, target]);

  return (
    <SEOHead
      title={title}
      description={description}
      canonical={target}
      lang={safeLang}
      hreflangOverrides={{ en: "/en/book", pl: "/pl/book" }}
      schemaJson={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: `https://jay23.com${target}`,
        inLanguage: safeLang,
        mainEntityOfPage: `https://jay23.com${target}`,
        isPartOf: { "@id": "https://jay23.com/#website" },
        publisher: { "@id": "https://jay23.com/#organization" },
       potentialAction: {
          "@type": "ReserveAction",
          target: `https://jay23.com${target}`,
          name: safeLang === "pl" ? "Umów rozmowę" : "Book a call",
        },
      }}
    />
  );
};

/** Wraps children with LanguageProvider (reads :lang from URL) */
const LangRoutes = () => (
  <LanguageProvider>
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route index element={<Index />} />
        <Route path="book" element={<BookCall />} />
        <Route path="process" element={<Process />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="report" element={<Report />} />
        <Route path="packages" element={<Packages />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="lp" element={<LP />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactRedirect />} />
        <Route path="founder-influencer" element={<FounderInfluencer />} />
        <Route path="gamefound" element={<Gamefound />} />
        <Route path="saas-prelaunch-marketing-agency" element={<SaasPrelaunch />} />
        <Route path="ecommerce-prelaunch-agency" element={<EcommercePrelaunch />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  </LanguageProvider>
);

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MailerLiteLoader />
        <Routes>
          {/* Language-prefixed routes */}
          <Route path="/:lang/*" element={<LangRoutes />} />
          {/* Bare paths → redirect to detected language */}
          <Route path="/" element={<LanguageRedirect />} />
          <Route path="/book" element={<LanguageRedirect />} />
          <Route path="/process" element={<LanguageRedirect />} />
          <Route path="/thank-you" element={<LanguageRedirect />} />
          <Route path="/blog" element={<LanguageRedirect />} />
          <Route path="/blog/:slug" element={<LanguageRedirect />} />
          <Route path="/packages" element={<LanguageRedirect />} />
          <Route path="/quiz" element={<LanguageRedirect />} />
          <Route path="/lp" element={<LanguageRedirect />} />
          <Route path="/privacy-policy" element={<LanguageRedirect />} />
          <Route path="/impressum" element={<LanguageRedirect />} />
          <Route path="/terms-of-service" element={<LanguageRedirect />} />
          <Route path="/faq" element={<LanguageRedirect />} />
          <Route path="/about" element={<LanguageRedirect />} />
          <Route path="/contact" element={<LanguageRedirect />} />
          <Route path="/founder-influencer" element={<LanguageRedirect />} />

          <Route path="/leads" element={<Suspense fallback={<PageFallback />}><Leads /></Suspense>} />
          <Route path="/seo" element={<Suspense fallback={<PageFallback />}><SeoDashboard /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
