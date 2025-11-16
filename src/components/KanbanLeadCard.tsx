import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, AlertTriangle, User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Lead } from '@/types'
import { LossReasonModal } from '@/components/LossReasonModal'
import { toast } from '@/hooks/use-toast'

interface KanbanLeadCardProps {
  lead: Lead
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: string) => void
}

export const KanbanLeadCard = ({ lead, onDragStart }: KanbanLeadCardProps) => {
  const [isLossModalOpen, setIsLossModalOpen] = useState(false)

  const handleMarkAsWon = () => {
    console.log(`Lead ${lead.id} won!`)
    toast({
      title: '🎉 Lead Ganho!',
      description: `${lead.name} foi marcado como ganho.`,
      className: 'bg-success text-white',
    })
  }

  return (
    <>
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, lead.id)}
        className={cn(
          'mb-4 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-grab active:cursor-grabbing',
          {
            'border-2 border-red-500': lead.isDelayed,
          },
        )}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-sm pr-2">{lead.name}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar Lead</DropdownMenuItem>
                <DropdownMenuItem>Agendar Follow-up</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{lead.contact}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <User className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <span>{lead.salesperson}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <span>{lead.entryDate}</span>
          </div>
          {lead.hasNoFollowUp && (
            <div className="flex items-center text-xs text-yellow-700 mt-2 bg-yellow-100 p-1.5 rounded-md">
              <AlertTriangle className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="font-medium">Sem follow-up</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2 bg-gray-50 flex justify-end gap-2">
          <Button
            size="sm"
            className="h-7 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs px-2"
            onClick={() => setIsLossModalOpen(true)}
          >
            Perdido
          </Button>
          <Button
            size="sm"
            className="h-7 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs px-2"
            onClick={handleMarkAsWon}
          >
            Ganho
          </Button>
        </CardFooter>
      </Card>
      <LossReasonModal
        isOpen={isLossModalOpen}
        onClose={() => setIsLossModalOpen(false)}
        leadName={lead.name}
      />
    </>
  )
}
