import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type LeadStatus =
  | 'Novos'
  | 'Qualificados'
  | 'Negociação'
  | 'Fechados'
  | 'Perdidos'

interface LeadStatusBadgeProps {
  status: LeadStatus
  className?: string
}

const statusStyles: Record<LeadStatus, string> = {
  Novos:
    'bg-status-novos text-status-novos-foreground hover:bg-status-novos/80',
  Qualificados:
    'bg-status-qualificados text-status-qualificados-foreground hover:bg-status-qualificados/80',
  Negociação:
    'bg-status-negociacao text-status-negociacao-foreground hover:bg-status-negociacao/80',
  Fechados:
    'bg-status-fechados text-status-fechados-foreground hover:bg-status-fechados/80',
  Perdidos:
    'bg-status-perdidos text-status-perdidos-foreground hover:bg-status-perdidos/80',
}

export const LeadStatusBadge = ({
  status,
  className,
}: LeadStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        'font-bold py-1 px-3 rounded-full text-xs',
        statusStyles[status],
        className,
      )}
    >
      {status}
    </Badge>
  )
}
