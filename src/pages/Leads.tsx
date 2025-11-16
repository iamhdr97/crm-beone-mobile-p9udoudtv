import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeadStatusBadge, type LeadStatus } from '@/components/LeadStatusBadge'

const mockLeads = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '(11) 98765-4321',
    email: 'maria.silva@example.com',
    company: 'Silva & Filhos',
    status: 'Novos' as LeadStatus,
    salesperson: 'João Alves',
    createdAt: '2025-11-15',
  },
  {
    id: '2',
    name: 'João Pereira',
    phone: '(21) 91234-5678',
    email: 'joao.p@company.com',
    company: 'Pereira Corp',
    status: 'Qualificados' as LeadStatus,
    salesperson: 'Ana Lima',
    createdAt: '2025-11-14',
  },
  {
    id: '3',
    name: 'Ana Costa',
    phone: '(31) 95555-4444',
    email: 'ana.costa@email.com',
    company: 'Costa Construções',
    status: 'Negociação' as LeadStatus,
    salesperson: 'João Alves',
    createdAt: '2025-11-13',
  },
]

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="sticky top-16 md:top-0 bg-white z-20 p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, telefone, e-mail, empresa..."
            className="pl-10 bg-gray-100 focus:bg-white focus:ring-primary focus:border-primary h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead className="hidden md:table-cell">Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Vendedor</TableHead>
              <TableHead className="hidden lg:table-cell">Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <Link to={`/leads/${lead.id}`} className="hover:underline">
                    {lead.name}
                  </Link>
                </TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {lead.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {lead.company}
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {lead.salesperson}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {lead.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/leads/${lead.id}`}>Ver Detalhes</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
