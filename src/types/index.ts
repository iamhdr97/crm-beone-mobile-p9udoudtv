export type KanbanStage =
  | 'Pré-qualificação'
  | 'Qualificação'
  | 'Conversa Agendada'
  | 'Elaboração de Proposta'
  | 'Negociação'

export interface Lead {
  id: string
  name: string
  contact: string
  salesperson: string
  entryDate: string
  stage: KanbanStage
  hasNoFollowUp?: boolean
  isDelayed?: boolean
}
