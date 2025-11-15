import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Login from './pages/Index' // Renamed Index to Login
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import AddLead from './pages/AddLead'
import LeadDetails from './pages/LeadDetails'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/novo" element={<AddLead />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/tarefas" element={<Tasks />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
