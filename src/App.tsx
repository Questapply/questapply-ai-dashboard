
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
import Ranking from "@/pages/Ranking";
import Pro from "@/pages/Pro";
import HelpCenter from "@/pages/HelpCenter";
import PaymentCheckout from "@/pages/PaymentCheckout";
import CompareSchools from "@/pages/CompareSchools";
import SchoolDetails from "@/pages/SchoolDetails";
import ProgramDetails from "@/pages/ProgramDetails";
import Devices from "@/pages/Devices";
import Feedback from "@/pages/Feedback";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Notifications from "@/pages/Notifications";
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
        <Route path="/payment-checkout" element={<PaymentCheckout />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/compare-schools/:schoolIds" element={<CompareSchools />} />
        <Route path="/school/:schoolId" element={<SchoolDetails />} />
        <Route path="/program/:programId" element={<ProgramDetails />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
