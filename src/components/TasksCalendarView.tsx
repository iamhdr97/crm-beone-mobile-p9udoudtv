import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { NewTaskModal } from '@/components/NewTaskModal'

interface Task {
  id: number
  title: string
  dueDate: Date
  status: 'Pendente' | 'Concluída' | 'Atrasada'
  type: 'whatsapp' | 'email' | 'call' | 'task'
  leadName: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Discutir plano familiar',
    dueDate: new Date(),
    status: 'Pendente',
    type: 'call',
    leadName: 'Maria Silva',
  },
  {
    id: 2,
    title: 'Proposta de R$99,90',
    dueDate: addDays(new Date(), 1),
    status: 'Pendente',
    type: 'email',
    leadName: 'João Pereira',
  },
  {
    id: 3,
    title: 'Verificar se recebeu o e-mail',
    dueDate: subDays(new Date(), 1),
    status: 'Atrasada',
    type: 'whatsapp',
    leadName: 'Ana Costa',
  },
  {
    id: 4,
    title: 'Apresentação de produto',
    dueDate: new Date(),
    status: 'Concluída',
    type: 'task',
    leadName: 'Carlos Souza',
  },
]

const getTypeColor = (type: Task['type']) => {
  switch (type) {
    case 'whatsapp':
      return 'bg-whatsapp text-white'
    case 'email':
      return 'bg-blue-500 text-white'
    case 'call':
      return 'bg-attention text-white'
    case 'task':
      return 'bg-gray-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

export const TasksCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month')
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)

  const handlePrevious = () => {
    if (viewType === 'month') setCurrentDate(subMonths(currentDate, 1))
    if (viewType === 'week') setCurrentDate(subWeeks(currentDate, 1))
    if (viewType === 'day') setCurrentDate(subDays(currentDate, 1))
  }

  const handleNext = () => {
    if (viewType === 'month') setCurrentDate(addMonths(currentDate, 1))
    if (viewType === 'week') setCurrentDate(addWeeks(currentDate, 1))
    if (viewType === 'day') setCurrentDate(addDays(currentDate, 1))
  }

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-bold capitalize w-40 text-center">
          {format(
            currentDate,
            viewType === 'day' ? "dd 'de' MMMM" : 'MMMM yyyy',
            {
              locale: ptBR,
            },
          )}
        </h2>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={viewType}
          onValueChange={(v) => v && setViewType(v as any)}
          className="border rounded-lg p-1"
        >
          <ToggleGroupItem value="month" className="px-3 text-xs">
            Mês
          </ToggleGroupItem>
          <ToggleGroupItem value="week" className="px-3 text-xs">
            Semana
          </ToggleGroupItem>
          <ToggleGroupItem value="day" className="px-3 text-xs">
            Dia
          </ToggleGroupItem>
        </ToggleGroup>
        <Button size="sm" onClick={() => setIsNewTaskModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Nova Tarefa
        </Button>
      </div>
    </div>
  )

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayTasks = mockTasks.filter((task) =>
            isSameDay(task.dueDate, day),
          )
          return (
            <div
              key={day.toString()}
              className={cn(
                'min-h-[100px] border rounded-md p-1 bg-white hover:bg-gray-50 transition-colors',
                !isSameMonth(day, monthStart) &&
                  'bg-gray-50 text-muted-foreground',
              )}
            >
              <div className="text-right text-sm p-1">{format(day, 'd')}</div>
              <div className="space-y-1">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      'text-[10px] p-1 rounded truncate cursor-pointer',
                      getTypeColor(task.type),
                    )}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate)
    const endDate = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-2 h-[600px]">
        {days.map((day) => {
          const dayTasks = mockTasks.filter((task) =>
            isSameDay(task.dueDate, day),
          )
          return (
            <div key={day.toString()} className="flex flex-col h-full">
              <div className="text-center border-b pb-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {format(day, 'EEE', { locale: ptBR })}
                </div>
                <div
                  className={cn(
                    'text-lg font-bold',
                    isSameDay(day, new Date()) &&
                      'bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto',
                  )}
                >
                  {format(day, 'd')}
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-md p-2 space-y-2 overflow-y-auto">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      'text-xs p-2 rounded shadow-sm cursor-pointer',
                      getTypeColor(task.type),
                    )}
                  >
                    <div className="font-bold">
                      {format(task.dueDate, 'HH:mm')}
                    </div>
                    <div className="truncate">{task.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderDayView = () => {
    const dayTasks = mockTasks.filter((task) =>
      isSameDay(task.dueDate, currentDate),
    )

    return (
      <div className="space-y-4">
        {dayTasks.length > 0 ? (
          dayTasks.map((task) => (
            <Card key={task.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn(getTypeColor(task.type))}>
                      {task.type.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(task.dueDate, 'HH:mm')}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-muted-foreground">{task.leadName}</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Nenhuma tarefa para este dia.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 h-full flex flex-col">
      {renderHeader()}
      <div className="flex-1 overflow-y-auto">
        {viewType === 'month' && renderMonthView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'day' && renderDayView()}
      </div>
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        defaultDate={currentDate}
      />
    </div>
  )
}
