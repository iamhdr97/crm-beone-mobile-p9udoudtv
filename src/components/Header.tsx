import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const getHeaderConfig = (pathname: string) => {
  const baseConfig = {
    showBackButton: false,
    title: '',
    isGradient: false,
    actions: null,
  }

  if (pathname.startsWith('/dashboard')) {
    return {
      ...baseConfig,
      title: 'Olá, Vendedor',
      isGradient: false,
      actions: (
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={() => (window.location.href = '/perfil')}
        >
          <Settings className="h-6 w-6" />
        </Button>
      ),
    }
  }
  if (pathname.startsWith('/funil')) {
    return { ...baseConfig, title: 'Funil de Vendas' }
  }
  if (pathname.startsWith('/leads/novo')) {
    return { ...baseConfig, title: 'Novo Lead', showBackButton: true }
  }
  if (pathname.match(/^\/leads\/\w+$/)) {
    return { ...baseConfig, title: '', showBackButton: true }
  }
  if (pathname.startsWith('/leads')) {
    return { ...baseConfig, title: 'Meus Leads' }
  }
  if (pathname.startsWith('/tarefas')) {
    return { ...baseConfig, title: 'Minhas Tarefas' }
  }
  if (pathname.startsWith('/perfil')) {
    return { ...baseConfig, title: 'Meu Perfil', showBackButton: true }
  }

  return baseConfig
}

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const config = getHeaderConfig(location.pathname)

  const headerClasses = cn(
    'sticky top-0 z-30 flex items-center justify-between p-4 h-16 md:hidden',
    {
      'bg-white text-foreground border-b': true,
    },
  )

  return (
    <header className={headerClasses}>
      <div className="flex items-center">
        {config.showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className={cn({ 'text-white': config.isGradient })}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-xl font-bold ml-2">{config.title}</h1>
      </div>
      <div>{config.actions}</div>
    </header>
  )
}
