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
import { Search, MoreHorizontal, Plus } from 'lucide-react'
import { RegisterCompanyModal } from '@/components/RegisterCompanyModal'

const mockCompanies = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 3333-4444',
    email: 'contato@techsolutions.com',
    cityState: 'São Paulo / SP',
    contactPerson: 'Carlos Silva',
  },
  {
    id: '2',
    name: 'Inova Corp',
    cnpj: '98.765.432/0001-10',
    phone: '(21) 2222-5555',
    email: 'vendas@inovacorp.com',
    cityState: 'Rio de Janeiro / RJ',
    contactPerson: 'Ana Souza',
  },
  {
    id: '3',
    name: 'Global Services',
    cnpj: '45.678.901/0001-23',
    phone: '(31) 3333-1111',
    email: 'info@globalservices.com',
    cityState: 'Belo Horizonte / MG',
    contactPerson: 'Roberto Lima',
  },
]

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cnpj.includes(searchTerm) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="sticky top-16 md:top-0 bg-white z-20 p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CNPJ, e-mail..."
            className="pl-10 bg-gray-100 focus:bg-white focus:ring-primary focus:border-primary h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Nova Empresa
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead className="hidden md:table-cell">Telefone</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead className="hidden lg:table-cell">
                Cidade / Estado
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Contato Principal
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {company.phone}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {company.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {company.cityState}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {company.contactPerson || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
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
      <RegisterCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
