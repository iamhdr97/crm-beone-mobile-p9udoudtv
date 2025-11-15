import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const taskFilters = ['Pendente', 'Concluída', 'Atrasada']

const mockTasks = [
  {
    id: 1,
    leadName: 'Ligar para Maria Silva',
    title: 'Discutir plano familiar',
    dueDate: 'Hoje, 16:00',
    status: 'Pendente',
  },
  {
    id: 2,
    leadName: 'Enviar proposta para João Pereira',
    title: 'Proposta de R$99,90',
    dueDate: 'Amanhã, 10:00',
    status: 'Pendente',
  },
  {
    id: 3,
    leadName: 'Follow-up com Ana Costa',
    title: 'Verificar se recebeu o e-mail',
    dueDate: 'Ontem, 14:00',
    status: 'Atrasada',
  },
  {
    id: 4,
    leadName: 'Reunião com Carlos Souza',
    title: 'Apresentação de produto',
    dueDate: '20/11/2025, 11:00',
    status: 'Concluída',
  },
]

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState('Pendente')

  const filteredTasks = mockTasks.filter((task) => task.status === activeFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'border-attention'
      case 'Atrasada':
        return 'border-destructive'
      case 'Concluída':
        return 'border-success'
      default:
        return 'border-gray-300'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-16 md:top-0 bg-white z-20 p-4 border-b">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
          {taskFilters.map((status) => (
            <Button
              key={status}
              variant={activeFilter === status ? 'default' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap font-bold"
              onClick={() => setActiveFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={cn(
                'shadow-sm border-l-4 w-full',
                getStatusColor(task.status),
              )}
            >
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="font-bold">{task.leadName}</p>
                  <p className="text-sm text-muted-foreground">{task.title}</p>
                  <p
                    className={cn('text-xs font-semibold mt-1', {
                      'text-destructive': task.status === 'Atrasada',
                    })}
                  >
                    Prazo: {task.dueDate}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-whatsapp hover:bg-whatsapp/90 min-w-[120px]"
                  >
                    📱 WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary text-primary min-w-[120px]"
                  >
                    📞 Ligar
                  </Button>
                  {task.status !== 'Concluída' && (
                    <Button size="sm" className="flex-1 min-w-[120px]">
                      ✓ Concluir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <h3 className="mt-2 text-lg font-semibold">
              Nenhuma tarefa aqui! 🎉
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Você não tem tarefas com este status.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
