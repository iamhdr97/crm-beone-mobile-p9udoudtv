import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Copy,
  MessageSquare,
  Check,
  Plus,
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const mockLead = {
  id: '1',
  name: 'Maria Silva Santos',
  createdAt: '15 de Nov, 2025',
  status: 'Qualificado',
  whatsapp: '(11) 98765-4321',
  email: 'maria.santos@example.com',
  location: 'São Paulo, SP',
  notes:
    'Cliente demonstrou interesse em plano familiar. Agendar follow-up para discutir opções e valores. Mencionou que o filho pratica esportes e precisa de cobertura para lesões.',
  nextAction: {
    title: 'Ligar para apresentar proposta',
    description:
      'Apresentar os detalhes do plano familiar e os benefícios para atletas.',
    dueDate: 'Amanhã, 10:00',
  },
  history: [
    {
      type: 'status',
      title: 'Status alterado para Qualificado',
      content: 'Lead demonstrou forte interesse.',
      timestamp: 'Hoje às 14:30',
      icon: Check,
    },
    {
      type: 'message',
      title: 'Conversa no WhatsApp',
      content: 'Primeiro contato realizado, agendado call.',
      timestamp: 'Hoje às 11:15',
      icon: MessageSquare,
    },
  ],
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toast({
    title: 'Copiado!',
    description: 'Informação copiada para a área de transferência.',
  })
}

export default function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-16 md:top-0 bg-white border-b p-4 z-10">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="md:hidden"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 md:hidden" />
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary"
          >
            <Edit className="h-4 w-4 mr-2" /> Editar
          </Button>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{mockLead.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
            <span>Criado em {mockLead.createdAt}</span>
            <span>•</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
              {mockLead.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button className="bg-whatsapp hover:bg-whatsapp/90 h-12">
            <a
              href={`https://wa.me/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              📱 WhatsApp
            </a>
          </Button>
          <Button className="bg-primary h-12">
            <a
              href={`tel:${mockLead.whatsapp}`}
              className="flex items-center justify-center"
            >
              📞 Ligar
            </a>
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-4 pb-24">
        <Card>
          <CardHeader>
            <CardTitle>📇 Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{mockLead.whatsapp}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(mockLead.whatsapp)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{mockLead.email}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(mockLead.email)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>{mockLead.location}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>💬 Histórico</CardTitle>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary"
                >
                  <Plus className="w-4 h-4 mr-2" /> Adicionar
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader>
                  <SheetTitle>Adicionar Interação</SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-4">
                  <Label htmlFor="interaction">Descrição</Label>
                  <Textarea
                    id="interaction"
                    placeholder="Descreva a interação..."
                  />
                  <Button className="w-full">Salvar</Button>
                </div>
              </SheetContent>
            </Sheet>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-border" />
              {mockLead.history.map((item, index) => (
                <div key={index} className="relative mb-6">
                  <div className="absolute -left-2 top-1.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="pl-8">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-attention bg-yellow-50">
          <CardHeader>
            <CardTitle>⏰ Próxima Ação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">{mockLead.nextAction.title}</p>
            <p className="text-sm text-muted-foreground">
              {mockLead.nextAction.description}
            </p>
            <p className="text-sm font-semibold mt-2">
              📅 {mockLead.nextAction.dueDate}
            </p>
            <Button className="w-full mt-4 bg-attention hover:bg-attention/90">
              ✓ Concluir Ação
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📝 Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{mockLead.notes}</p>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t grid grid-cols-2 gap-3 md:hidden">
        <Button
          variant="outline"
          className="border-destructive text-destructive h-12"
        >
          ❌ Marcar como Perdido
        </Button>
        <Button className="bg-success hover:bg-success/90 h-12">
          ✅ Marcar como Fechado
        </Button>
      </div>
    </div>
  )
}
