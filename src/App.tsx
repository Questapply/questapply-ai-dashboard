
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Favorites from "@/pages/Favorites";
import Professors from "@/pages/Professors";
import Applications from "@/pages/Applications";
import Documents from "@/pages/Documents";
import Support from "@/pages/Support";
import Rewards from "@/pages/Rewards";
import Payments from "@/pages/Payments";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/support" element={<Support />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
