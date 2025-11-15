import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeadStatusBadge, type LeadStatus } from '@/components/LeadStatusBadge'

const leadStatuses: LeadStatus[] = [
  'Novos',
  'Qualificados',
  'Negociação',
  'Fechados',
  'Perdidos',
]

const mockLeads = [
  {
    id: 1,
    name: 'Maria Silva',
    phone: '(11) 98765-4321',
    status: 'Novos' as LeadStatus,
  },
  {
    id: 2,
    name: 'João Pereira',
    phone: '(21) 91234-5678',
    status: 'Qualificados' as LeadStatus,
  },
  {
    id: 3,
    name: 'Ana Costa',
    phone: '(31) 95555-4444',
    status: 'Negociação' as LeadStatus,
  },
  {
    id: 4,
    name: 'Carlos Souza',
    phone: '(41) 98888-7777',
    status: 'Novos' as LeadStatus,
  },
  {
    id: 5,
    name: 'Beatriz Lima',
    phone: '(51) 97777-8888',
    status: 'Fechados' as LeadStatus,
  },
  {
    id: 6,
    name: 'Ricardo Alves',
    phone: '(61) 96666-5555',
    status: 'Perdidos' as LeadStatus,
  },
]

export default function Leads() {
  const [activeFilter, setActiveFilter] = useState<LeadStatus | 'Todos'>(
    'Todos',
  )
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeads = mockLeads
    .filter((lead) => activeFilter === 'Todos' || lead.status === activeFilter)
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm),
    )

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-16 md:top-0 bg-white z-20 p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou telefone..."
            className="pl-10 bg-gray-100 focus:bg-white focus:ring-primary focus:border-primary h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 -mb-2">
          <Button
            variant={activeFilter === 'Todos' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full whitespace-nowrap font-bold"
            onClick={() => setActiveFilter('Todos')}
          >
            Todos ({mockLeads.length})
          </Button>
          {leadStatuses.map((status) => (
            <Button
              key={status}
              variant={activeFilter === status ? 'default' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap font-bold"
              onClick={() => setActiveFilter(status)}
            >
              {status} ({mockLeads.filter((l) => l.status === status).length})
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <Link to={`/leads/${lead.id}`} key={lead.id}>
              <Card className="shadow-sm hover:shadow-md transition-shadow w-full">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.phone}
                    </p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">
              Nenhum lead encontrado
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar sua busca ou filtros.
            </p>
            <Button asChild className="mt-6">
              <Link to="/leads/novo">Adicionar Lead</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
