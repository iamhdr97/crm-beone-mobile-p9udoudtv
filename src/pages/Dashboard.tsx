import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { Calendar as CalendarIcon, Download } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const PeriodSelector = ({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) => (
  <ToggleGroup
    type="single"
    size="sm"
    value={value}
    onValueChange={(v) => v && onValueChange(v)}
    className="border rounded-lg p-0.5"
  >
    {['Semana', 'Mês', 'Trimestre', 'Semestre', 'Ano'].map((period) => (
      <ToggleGroupItem
        key={period}
        value={period}
        className="text-xs px-2 data-[state=on]:bg-primary data-[state=on]:text-white"
      >
        {period}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
)

const lossReasonsData = [
  { name: 'Preço', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Concorrência', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Timing', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Sem interesse', value: 200, fill: 'hsl(var(--chart-4))' },
]

const salesByValueData = [
  { name: 'Jan', Vendas: 4000 },
  { name: 'Fev', Vendas: 3000 },
  { name: 'Mar', Vendas: 2000 },
]
const salesByQuantityData = [
  { name: 'Jan', Vendas: 25 },
  { name: 'Fev', Vendas: 18 },
  { name: 'Mar', Vendas: 12 },
]

const opportunitiesData = [
  {
    name: 'Jan',
    Aberto: 40,
    Ganha: 24,
    Perdido: 10,
  },
  {
    name: 'Fev',
    Aberto: 30,
    Ganha: 13,
    Perdido: 5,
  },
]

const performanceData = [
  { name: 'Ana', Vendas: 40 },
  { name: 'Bruno', Vendas: 30 },
  { name: 'Carlos', Vendas: 27 },
]

const leadsByStageData = [
  { name: 'Pré-qualificação', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Qualificação', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Negociação', value: 15, fill: 'hsl(var(--chart-3))' },
  { name: 'Proposta', value: 10, fill: 'hsl(var(--chart-4))' },
  { name: 'Agendamento', value: 5, fill: 'hsl(var(--chart-5))' },
]

const sellerOptions: Option[] = [
  { value: 'ana', label: 'Ana' },
  { value: 'bruno', label: 'Bruno' },
  { value: 'carlos', label: 'Carlos' },
  { value: 'sofia', label: 'Sofia' },
]

const funnelTableData = [
  { stage: 'Pré-qualificação', quantity: 45, percentage: '45%' },
  { stage: 'Qualificação', quantity: 25, percentage: '25%' },
  { stage: 'Negociação', quantity: 15, percentage: '15%' },
  { stage: 'Proposta', quantity: 10, percentage: '10%' },
  { stage: 'Agendamento', quantity: 5, percentage: '5%' },
]

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  })
  const [period, setPeriod] = useState('Mês')
  const [selectedSellers, setSelectedSellers] = useState<string[]>([])

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <MultiSelect
            options={sellerOptions}
            selected={selectedSellers}
            onChange={setSelectedSellers}
            placeholder="Filtrar por Vendedor"
            className="w-full md:w-[250px]"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full md:w-[260px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total de Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Novos Leads (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">182</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Vendas (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 25,4k</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tempo Médio de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 dias</p>
            <p className="text-xs text-muted-foreground">
              Criação do lead até o ganho.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Motivos de Perda</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={lossReasonsData} dataKey="value" nameKey="name" />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Oportunidades Abertas, Ganhas ou Perdidas</CardTitle>
            <PeriodSelector value={period} onValueChange={setPeriod} />
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={opportunitiesData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="Aberto" fill="#3b82f6" radius={4} />
                  <Bar dataKey="Ganha" fill="#22c55e" radius={4} />
                  <Bar dataKey="Perdido" fill="#ef4444" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Vendas em Valor</CardTitle>
            <PeriodSelector value={period} onValueChange={setPeriod} />
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={salesByValueData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) =>
                      `R$${new Intl.NumberFormat('pt-BR').format(value)}`
                    }
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      `R$${new Intl.NumberFormat('pt-BR').format(value)}`
                    }
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="Vendas" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Vendas em Quantidade</CardTitle>
            <PeriodSelector value={period} onValueChange={setPeriod} />
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={salesByQuantityData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="Vendas" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Performance por Vendedor</CardTitle>
            <PeriodSelector value={period} onValueChange={setPeriod} />
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={performanceData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="Vendas" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>% de Leads por Etapa do Funil</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={leadsByStageData} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={4}>
                    {leadsByStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabela do Funil de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Porcentagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funnelTableData.map((row) => (
                <TableRow key={row.stage}>
                  <TableCell className="font-medium">{row.stage}</TableCell>
                  <TableCell className="text-right">{row.quantity}</TableCell>
                  <TableCell className="text-right">{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
