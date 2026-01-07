
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WeirdAirtableIdeas from "./pages/WeirdAirtableIdeas";
import November2025 from "./pages/November2025";
import March2026 from "./pages/March2026";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/weird-ideas" element={<WeirdAirtableIdeas />} />
          <Route path="/november-2025" element={<November2025 />} />
          <Route path="/march-2026" element={<March2026 />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
