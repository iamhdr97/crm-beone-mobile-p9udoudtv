import {
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const vendedorMetrics = [
  { title: 'Novos Leads', value: 12 },
  { title: 'Follow-ups Hoje', value: 8 },
  { title: 'Fechados no Mês', value: 4 },
  { title: 'Tarefas Atrasadas', value: 2 },
]

const todayFollowUps = [
  {
    id: 1,
    leadName: 'Ligar para Maria Silva',
    timeAgo: 'Há 2h',
    description: 'Discutir plano familiar.',
  },
  {
    id: 2,
    leadName: 'Enviar proposta para João Pereira',
    timeAgo: 'Há 4h',
    description: 'Proposta de R$99,90.',
  },
]

const recentLeads = [
  { id: 1, name: 'Carlos Andrade', status: 'Novo', origin: 'Instagram' },
  { id: 2, name: 'Ana Beatriz', status: 'Qualificado', origin: 'Indicação' },
  { id: 3, name: 'Fernanda Lima', status: 'Novo', origin: 'Facebook' },
]

const funnelData = [
  { name: 'Novo', value: 1200, fill: 'hsl(var(--chart-1))' },
  { name: 'Qualificado', value: 900, fill: 'hsl(var(--chart-2))' },
  { name: 'Negociação', value: 500, fill: 'hsl(var(--chart-3))' },
  { name: 'Fechado', value: 200, fill: 'hsl(var(--chart-4))' },
]

const performanceData = [
  { name: 'Ana', fechados: 40 },
  { name: 'Bruno', fechados: 30 },
  { name: 'Carlos', fechados: 20 },
  { name: 'Daniela', fechados: 27 },
  { name: 'Eduardo', fechados: 18 },
]

const allLeadsData = [
  {
    id: 1,
    nome: 'Juliana Paes',
    status: 'Negociação',
    vendedor: 'Ana',
    criadoEm: '2025-11-10',
  },
  {
    id: 2,
    nome: 'Marcos Mion',
    status: 'Qualificado',
    vendedor: 'Bruno',
    criadoEm: '2025-11-11',
  },
]

const userRole = 'coordenador'

const VendedorDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-beone text-white -mx-4 -mt-4 md:hidden p-4 pt-20 rounded-b-3xl">
      <div className="grid grid-cols-2 gap-4 mt-4">
        {vendedorMetrics.map((metric) => (
          <Card
            key={metric.title}
            className="bg-white/20 backdrop-blur-sm border-0 text-white text-center"
          >
            <CardContent className="p-4">
              <p className="text-3xl font-bold">{metric.value}</p>
              <p className="text-xs mt-1">{metric.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <div className="p-4 md:p-0">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">⏰ Follow-ups de Hoje</h2>
        <Link to="/tarefas" className="text-sm text-primary font-semibold">
          Ver todos →
        </Link>
      </div>
      <div className="space-y-3">
        {todayFollowUps.map((task) => (
          <Card key={task.id} className="shadow-sm border-l-4 border-attention">
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="font-bold">{task.leadName}</p>
                <p className="text-xs text-muted-foreground">{task.timeAgo}</p>
              </div>
              <p className="text-sm">{task.description}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-whatsapp hover:bg-whatsapp/90"
                >
                  📱 WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-primary text-primary"
                >
                  ✓ Concluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <div className="p-4 md:p-0">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">👥 Meus Leads Recentes</h2>
        <Link to="/leads" className="text-sm text-primary font-semibold">
          Ver todos →
        </Link>
      </div>
      <div className="space-y-3">
        {recentLeads.map((lead) => (
          <Card key={lead.id} className="shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.origin}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                {lead.status}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
)

const CoordenadorDashboard = () => (
  <div className="space-y-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,234</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">15.8%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Novos Leads (Mês)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">182</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vendas (Mês)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">R$ 25,4k</p>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Funil de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart data={funnelData}>
              <Tooltip />
              <Funnel dataKey="value" nameKey="name" isAnimationActive>
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Performance por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="fechados"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Leads Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allLeadsData.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.nome}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.vendedor}</TableCell>
                <TableCell>{lead.criadoEm}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Reatribuir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
)

export default function Dashboard() {
  return (
    <>
      <div className="md:hidden">
        <VendedorDashboard />
      </div>
      <div className="hidden md:block">
        {userRole === 'coordenador' ? (
          <CoordenadorDashboard />
        ) : (
          <VendedorDashboard />
        )}
      </div>
    </>
  )
}
