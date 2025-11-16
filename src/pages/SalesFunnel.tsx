import { useState } from 'react'
import { KanbanColumn } from '@/components/KanbanColumn'
import type { Lead, KanbanStage } from '@/types'
import { toast } from '@/hooks/use-toast'

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ana Clara',
    contact: '(11) 99876-5432',
    salesperson: 'Carlos Pereira',
    entryDate: '12/11/2025',
    stage: 'Pré-qualificação',
    isDelayed: true,
  },
  {
    id: 'lead-2',
    name: 'Bruno Martins',
    contact: 'bruno.m@email.com',
    salesperson: 'Sofia Almeida',
    entryDate: '11/11/2025',
    stage: 'Pré-qualificação',
  },
  {
    id: 'lead-3',
    name: 'Carla Dias',
    contact: '(21) 98765-1234',
    salesperson: 'Carlos Pereira',
    entryDate: '10/11/2025',
    stage: 'Qualificação',
    hasNoFollowUp: true,
  },
  {
    id: 'lead-4',
    name: 'Daniel Fogaça',
    contact: 'daniel.f@email.com',
    salesperson: 'Sofia Almeida',
    entryDate: '09/11/2025',
    stage: 'Conversa Agendada',
  },
  {
    id: 'lead-5',
    name: 'Eduarda Costa',
    contact: '(31) 91234-5678',
    salesperson: 'Carlos Pereira',
    entryDate: '08/11/2025',
    stage: 'Elaboração de Proposta',
  },
  {
    id: 'lead-6',
    name: 'Fábio Gusmão',
    contact: 'fabio.g@email.com',
    salesperson: 'Sofia Almeida',
    entryDate: '07/11/2025',
    stage: 'Negociação',
  },
  {
    id: 'lead-7',
    name: 'Gabriela Alves',
    contact: '(41) 95678-1234',
    salesperson: 'Carlos Pereira',
    entryDate: '13/11/2025',
    stage: 'Pré-qualificação',
  },
]

const stages: KanbanStage[] = [
  'Pré-qualificação',
  'Qualificação',
  'Conversa Agendada',
  'Elaboração de Proposta',
  'Negociação',
]

export default function SalesFunnel() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null)

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    leadId: string,
  ) => {
    setDraggedLeadId(leadId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetStage: KanbanStage,
  ) => {
    e.preventDefault()
    if (!draggedLeadId) return

    const leadToMove = leads.find((lead) => lead.id === draggedLeadId)

    if (leadToMove && leadToMove.stage !== targetStage) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === draggedLeadId ? { ...lead, stage: targetStage } : lead,
        ),
      )
      toast({
        title: 'Lead movido!',
        description: `${leadToMove.name} foi movido para ${targetStage}.`,
      })
    }
    setDraggedLeadId(null)
  }

  return (
    <div className="bg-[#F7F8FA] min-h-full p-4 md:p-6">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            leads={leads.filter((lead) => lead.stage === stage)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  )
}
