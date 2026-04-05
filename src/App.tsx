import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ClientesPage from "./pages/ClientesPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import BarbeirosPage from "./pages/BarbeirosPage";
import ConfigPage from "./pages/ConfigPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./pages/AuthContext";
import {ProtectedRoute} from "./pages/ProtectRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider> 
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="clientes" element={<ClientesPage />} />
              <Route path="agendamentos" element={<AgendamentosPage />} />
              <Route path="barbeiros" element={<BarbeirosPage />} />
              <Route path="config" element={<ConfigPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
