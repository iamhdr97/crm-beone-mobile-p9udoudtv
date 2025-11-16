import { useState } from 'react'
import { KanbanColumn } from '@/components/KanbanColumn'
import type { Lead, KanbanStage } from '@/types'
import { toast } from '@/hooks/use-toast'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RegisterLeadModal } from '@/components/RegisterLeadModal'

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ana Clara B2C',
    phone: '(11) 99876-5432',
    email: 'ana.b2c@email.com',
    salesperson: 'Carlos Pereira',
    createdAt: '12/11/2025',
    stage: 'Pré-qualificação',
    status: 'Novos',
    funnel: 'B2C',
    isDelayed: true,
  },
  {
    id: 'lead-2',
    name: 'Tech Solutions B2B',
    phone: '(11) 5555-4444',
    email: 'contato@techsolutions.com',
    company: 'Tech Solutions Inc.',
    salesperson: 'Sofia Almeida',
    createdAt: '11/11/2025',
    stage: 'Qualificação',
    status: 'Qualificados',
    funnel: 'B2B',
  },
  {
    id: 'lead-3',
    name: 'Carla Dias B2C',
    phone: '(21) 98765-1234',
    email: 'carla.dias@email.com',
    salesperson: 'Carlos Pereira',
    createdAt: '10/11/2025',
    stage: 'Qualificação',
    status: 'Qualificados',
    funnel: 'B2C',
    hasNoFollowUp: true,
  },
  {
    id: 'lead-4',
    name: 'Inova Corp B2B',
    phone: '(21) 3333-2222',
    email: 'vendas@inovacorp.com',
    company: 'Inova Corp',
    salesperson: 'Sofia Almeida',
    createdAt: '09/11/2025',
    stage: 'Conversa Agendada',
    status: 'Negociação',
    funnel: 'B2B',
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
  const [activeFunnel, setActiveFunnel] = useState<'B2C' | 'B2B'>('B2C')
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const filteredLeads = leads.filter((lead) => lead.funnel === activeFunnel)

  return (
    <div className="bg-[#F7F8FA] min-h-full flex flex-col">
      <div className="flex justify-between items-center p-4 md:p-6 border-b bg-white">
        <ToggleGroup
          type="single"
          value={activeFunnel}
          onValueChange={(value: 'B2C' | 'B2B') =>
            value && setActiveFunnel(value)
          }
          className="border rounded-lg p-1"
        >
          <ToggleGroupItem value="B2C" className="px-4">
            Funil B2C
          </ToggleGroupItem>
          <ToggleGroupItem value="B2B" className="px-4">
            Funil B2B
          </ToggleGroupItem>
        </ToggleGroup>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Cadastrar Lead
        </Button>
      </div>
      <div className="flex-1 p-4 md:p-6 overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {stages.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              leads={filteredLeads.filter((lead) => lead.stage === stage)}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          ))}
        </div>
      </div>
      <RegisterLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
