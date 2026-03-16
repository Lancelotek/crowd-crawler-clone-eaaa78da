import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { LanguageRedirect } from "@/i18n/LanguageRedirect";
import Index from "./pages/Index";
import BookCall from "./pages/BookCall";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impressum from "./pages/Impressum";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import Process from "./pages/Process";
import ThankYou from "./pages/ThankYou";
import Leads from "./pages/Leads";

const queryClient = new QueryClient();

/** Wraps children with LanguageProvider (reads :lang from URL) */
const LangRoutes = () => (
  <LanguageProvider>
    <Routes>
      <Route index element={<Index />} />
      <Route path="book" element={<BookCall />} />
      <Route path="process" element={<Process />} />
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="impressum" element={<Impressum />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/privacy-policy" element={<LanguageRedirect />} />
          <Route path="/impressum" element={<LanguageRedirect />} />
          <Route path="/terms-of-service" element={<LanguageRedirect />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
