import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/home";
import Vietnam from "./pages/vietnam";
import Thailand from "./pages/thailand";
import Nepal from "./pages/nepal";
import Ghana from "./pages/ghana";
import Peru from "./pages/peru";
import IVHQ from "./pages/ivhq";
import ProjectsAbroad from "./pages/projects-abroad";
import GVI from "./pages/gvi";
import WorldVolunteers from "./pages/world-volunteers";
import LoveVolunteers from "./pages/love-volunteers";
import Countries from "./pages/countries";
import Providers from "./pages/providers";
import CostGuide from "./pages/cost-guide";
import About from "./pages/about";
import CompareIVHQvsLoveVolunteers from "./pages/compare-ivhq-vs-love-volunteers";
import CompareIVHQvsProjectsAbroad from "./pages/compare-ivhq-vs-projects-abroad";
import CompareIVHQvsGVI from "./pages/compare-ivhq-vs-gvi";
import NoTeflRequired from "./pages/no-tefl-required";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Homepage */}
      <Route path="/" component={Home} />

      {/* Country pages — SEO URLs */}
      <Route path="/volunteer-teach-english-vietnam" component={Vietnam} />
      <Route path="/volunteer-teach-english-thailand" component={Thailand} />
      <Route path="/volunteer-teach-english-nepal" component={Nepal} />
      <Route path="/volunteer-teach-english-ghana" component={Ghana} />
      <Route path="/volunteer-teach-english-peru" component={Peru} />

      {/* Provider pages — SEO URLs */}
      <Route path="/program/international-volunteer-hq" component={IVHQ} />
      <Route path="/program/projects-abroad" component={ProjectsAbroad} />
      <Route path="/program/gvi" component={GVI} />
      <Route path="/program/world-volunteers" component={WorldVolunteers} />
      <Route path="/program/love-volunteers" component={LoveVolunteers} />

      {/* Section index pages */}
      <Route path="/countries" component={Countries} />
      <Route path="/providers" component={Providers} />
      <Route path="/cost-guide" component={CostGuide} />
      <Route path="/about" component={About} />

      {/* Provider comparison pages */}
      <Route path="/compare/ivhq-vs-love-volunteers" component={CompareIVHQvsLoveVolunteers} />
      <Route path="/compare/ivhq-vs-projects-abroad" component={CompareIVHQvsProjectsAbroad} />
      <Route path="/compare/ivhq-vs-gvi" component={CompareIVHQvsGVI} />

      {/* Standalone SEO pages */}
      <Route path="/no-tefl-required" component={NoTeflRequired} />

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
