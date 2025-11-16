import { Outlet, useLocation, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'
import { SidebarNav } from '@/components/SidebarNav'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'

const noFabPaths = ['/leads/novo', '/funil']

export default function Layout() {
  const location = useLocation()

  const showFab = !noFabPaths.includes(location.pathname)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:flex">
          <SidebarNav />
        </div>
        <div className="flex-1 flex flex-col md:ml-64">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">
            <Outlet />
          </main>
          <BottomNav />
          {showFab && (
            <Button
              asChild
              className="fixed bottom-20 right-4 h-16 w-16 rounded-full bg-primary shadow-2xl z-40 md:hidden active:scale-90 transition-transform"
            >
              <Link to="/leads/novo">
                <Plus className="h-8 w-8" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}
