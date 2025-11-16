import { NavLink } from 'react-router-dom'
import { Home, Users, CheckSquare, User, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/funil', icon: Filter, label: 'Funil de Vendas' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/tarefas', icon: CheckSquare, label: 'Tarefas' },
  { to: '/perfil', icon: User, label: 'Perfil' },
]

export const SidebarNav = () => {
  return (
    <Sidebar className="hidden md:fixed md:flex md:flex-col md:w-64 border-r h-full">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
            be
          </div>
          <span className="text-xl font-semibold">BeOne CRM</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <NavLink to={item.to} className="w-full">
                {({ isActive }) => (
                  <SidebarMenuButton
                    className={cn('w-full justify-start text-base h-12', {
                      'bg-primary/10 text-primary font-bold': isActive,
                    })}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
