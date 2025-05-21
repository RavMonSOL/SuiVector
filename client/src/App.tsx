import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SuiProvider } from "@/lib/suiContext";

import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import MarketplacePage from "@/pages/marketplace";
import CreatePage from "@/pages/create";
import ExplorePage from "@/pages/explore";
import GroupsPage from "@/pages/groups";
import WalletPage from "@/pages/wallet";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { useState } from "react";

function Router() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile menu toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="text-foreground hover:text-primary transition-colors p-2 rounded-full bg-muted"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 h-full overflow-y-auto pt-16 md:pt-0">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/marketplace" component={MarketplacePage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/groups" component={GroupsPage} />
          <Route path="/wallet" component={WalletPage} />
          <Route component={NotFound} />
        </Switch>
        <MobileNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <SuiProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SuiProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
