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
  onEdit?: (lead: Lead) => void
}

export const KanbanLeadCard = ({
  lead,
  onDragStart,
  onEdit,
}: KanbanLeadCardProps) => {
  const [isLossModalOpen, setIsLossModalOpen] = useState(false)

  const handleMarkAsWon = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log(`Lead ${lead.id} won!`)
    toast({
      title: '🎉 Lead Ganho!',
      description: `${lead.name} foi marcado como ganho.`,
      className: 'bg-success text-white',
    })
  }

  const handleLossClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLossModalOpen(true)
  }

  return (
    <>
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, lead.id)}
        onClick={() => onEdit?.(lead)}
        className={cn(
          'mb-4 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer active:cursor-grabbing',
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
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(lead)}>
                  Editar Lead
                </DropdownMenuItem>
                <DropdownMenuItem>Agendar Follow-up</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{lead.phone}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <User className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <span>{lead.salesperson}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <span>{lead.createdAt}</span>
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
            onClick={handleLossClick}
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
