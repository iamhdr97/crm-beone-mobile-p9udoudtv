import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const mockUser = {
  name: 'Vendedor Exemplo',
  role: 'Vendedor',
  email: 'vendedor@beone.com',
  whatsapp: '(11) 91234-5678',
  avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
}

export default function Profile() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Here you would clear the user session/token
    console.log('User logged out')
    toast({
      title: 'Você saiu da sua conta.',
    })
    navigate('/login')
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
          <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-center">{mockUser.name}</h1>
          <p className="text-muted-foreground text-center">{mockUser.role}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-primary text-primary">
              <Edit className="w-4 h-4 mr-2" /> Editar Perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue={mockUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" defaultValue={mockUser.whatsapp} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">E-mail</p>
            <p>{mockUser.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              WhatsApp
            </p>
            <p>{mockUser.whatsapp}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
