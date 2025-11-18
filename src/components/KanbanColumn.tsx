import type { Lead, KanbanStage } from '@/types'
import { KanbanLeadCard } from '@/components/KanbanLeadCard'

interface KanbanColumnProps {
  stage: KanbanStage
  leads: Lead[]
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: string) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, stage: KanbanStage) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onLeadClick?: (lead: Lead) => void
}

export const KanbanColumn = ({
  stage,
  leads,
  onDragStart,
  onDrop,
  onDragOver,
  onLeadClick,
}: KanbanColumnProps) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm p-4 w-full md:w-80 flex-shrink-0 flex flex-col"
      onDrop={(e) => onDrop(e, stage)}
      onDragOver={onDragOver}
    >
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h3 className="font-bold text-md text-gray-800">{stage}</h3>
        <span className="text-sm font-bold text-muted-foreground bg-gray-100 rounded-full px-2.5 py-1">
          {leads.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <KanbanLeadCard
              key={lead.id}
              lead={lead}
              onDragStart={onDragStart}
              onEdit={onLeadClick}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground italic">
            Nenhum lead nesta etapa.
          </div>
        )}
      </div>
    </div>
  )
}
