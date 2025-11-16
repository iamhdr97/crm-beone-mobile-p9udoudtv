import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Task {
  id: number
  title: string
  dueDate: Date
  status: 'Pendente' | 'Concluída' | 'Atrasada'
  leadName: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Discutir plano familiar',
    dueDate: new Date(),
    status: 'Pendente',
    leadName: 'Maria Silva',
  },
  {
    id: 2,
    title: 'Proposta de R$99,90',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    status: 'Pendente',
    leadName: 'João Pereira',
  },
  {
    id: 3,
    title: 'Verificar se recebeu o e-mail',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'Atrasada',
    leadName: 'Ana Costa',
  },
  {
    id: 4,
    title: 'Apresentação de produto',
    dueDate: new Date(),
    status: 'Concluída',
    leadName: 'Carlos Souza',
  },
]

export const TasksCalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const tasksForSelectedDay = date
    ? mockTasks.filter(
        (task) =>
          format(task.dueDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
      )
    : []

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            locale={ptBR}
          />
        </CardContent>
      </Card>
      {date && (
        <Card>
          <CardHeader>
            <CardTitle>
              Tarefas para {format(date, "dd 'de' MMMM", { locale: ptBR })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksForSelectedDay.length > 0 ? (
              <ul className="space-y-3">
                {tasksForSelectedDay.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.leadName}
                      </p>
                    </div>
                    <Badge
                      variant={
                        task.status === 'Concluída'
                          ? 'default'
                          : task.status === 'Atrasada'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {task.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">
                Nenhuma tarefa para este dia.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
