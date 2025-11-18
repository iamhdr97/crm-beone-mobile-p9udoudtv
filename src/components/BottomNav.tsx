import { NavLink } from 'react-router-dom'
import { Home, Users, CheckSquare, User, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Início' },
  { to: '/leads', icon: Users, label: 'Contatos' },
  { to: '/funil', icon: Filter, label: 'Funil' },
  { to: '/tarefas', icon: CheckSquare, label: 'Tarefas' },
  { to: '/perfil', icon: User, label: 'Perfil' },
]

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'inline-flex flex-col items-center justify-center px-2 font-medium group transition-transform duration-200 active:scale-95',
                {
                  'text-primary': isActive,
                  'text-gray-500 hover:text-primary': !isActive,
                },
              )
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
