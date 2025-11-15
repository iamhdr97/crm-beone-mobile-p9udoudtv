import { Outlet, useLocation, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BottomNav } from '@/components/BottomNav'
import { SidebarNav } from '@/components/SidebarNav'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'

const noLayoutPaths = ['/login', '/reset-password']
const noFabPaths = ['/leads/novo']

export default function Layout() {
  const location = useLocation()

  if (noLayoutPaths.includes(location.pathname)) {
    return <Outlet />
  }

  const showFab = !noFabPaths.includes(location.pathname)

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
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
  )
}
