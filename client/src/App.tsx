import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/AppSidebar";
import { ScanEffect } from "@/components/ScanEffect";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import VirtualLab from "@/pages/VirtualLab";
import Knowledge from "@/pages/Knowledge";
import Assistant from "@/pages/Assistant";
import Threats from "@/pages/Threats";
import Datasets from "@/pages/Datasets";
import Analytics from "@/pages/Analytics";
import AdvancedAnalytics from "@/pages/AdvancedAnalytics";
import AttackDetectionAnalytics from "@/pages/AttackDetectionAnalytics";
import ScalabilityTools from "@/pages/ScalabilityTools";
import DataPipeline from "@/pages/DataPipeline";
import RealTimeOptimization from "@/pages/RealTimeOptimization";
import Documentation from "@/pages/Documentation";
import Profile from "@/pages/Profile";
import DataManagement from "@/pages/DataManagement";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-muted-foreground text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/api/login";
    return null;
  }

  return (
    <AuthenticatedLayout>
      <Component />
    </AuthenticatedLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/virtual-lab">
        {() => <ProtectedRoute component={VirtualLab} />}
      </Route>
      <Route path="/knowledge">
        {() => <ProtectedRoute component={Knowledge} />}
      </Route>
      <Route path="/assistant">
        {() => <ProtectedRoute component={Assistant} />}
      </Route>
      <Route path="/threats">
        {() => <ProtectedRoute component={Threats} />}
      </Route>
      <Route path="/datasets">
        {() => <ProtectedRoute component={Datasets} />}
      </Route>
      <Route path="/analytics">
        {() => <ProtectedRoute component={Analytics} />}
      </Route>
      <Route path="/advanced-analytics">
        {() => <ProtectedRoute component={AdvancedAnalytics} />}
      </Route>
      <Route path="/attack-analytics">
        {() => <ProtectedRoute component={AttackDetectionAnalytics} />}
      </Route>
      <Route path="/scalability-tools">
        {() => <ProtectedRoute component={ScalabilityTools} />}
      </Route>
      <Route path="/data-pipeline">
        {() => <ProtectedRoute component={DataPipeline} />}
      </Route>
      <Route path="/realtime-optimization">
        {() => <ProtectedRoute component={RealTimeOptimization} />}
      </Route>
      <Route path="/documentation">
        {() => <ProtectedRoute component={Documentation} />}
      </Route>
      <Route path="/data-management">
        {() => <ProtectedRoute component={DataManagement} />}
      </Route>
      <Route path="/profile">
        {() => <ProtectedRoute component={Profile} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <ScanEffect />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
