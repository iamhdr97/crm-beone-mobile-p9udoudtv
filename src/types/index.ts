import type { LeadStatus } from '@/components/LeadStatusBadge'

export type KanbanStage =
  | 'Pré-qualificação'
  | 'Qualificação'
  | 'Conversa Agendada'
  | 'Elaboração de Proposta'
  | 'Negociação'

export type LeadTag =
  | 'Prospecção ativa'
  | 'Indicação'
  | 'Influenciadores'
  | 'Campanha de marketing'
  | 'Contato de cliente'
  | 'Eventos e workshops'
  | 'Portal do cliente'

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  company?: string
  salesperson: string
  createdAt: string
  status: LeadStatus
  stage: KanbanStage
  funnel: 'B2B' | 'B2C'
  cpfCnpj?: string
  tags?: LeadTag[]
  hasNoFollowUp?: boolean
  isDelayed?: boolean
}
