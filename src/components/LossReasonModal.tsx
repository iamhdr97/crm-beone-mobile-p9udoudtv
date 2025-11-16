import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'

interface LossReasonModalProps {
  isOpen: boolean
  onClose: () => void
  leadName: string
}

const lossReasons = [
  'Preço',
  'Concorrência',
  'Timing',
  'Sem interesse',
  'Outro',
]

export const LossReasonModal = ({
  isOpen,
  onClose,
  leadName,
}: LossReasonModalProps) => {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  const handleConfirm = () => {
    if (!reason) {
      toast({
        title: 'Campo obrigatório',
        description: 'Por favor, selecione um motivo da perda.',
        variant: 'destructive',
      })
      return
    }
    console.log(`Lead "${leadName}" lost. Reason: ${reason}, Notes: ${notes}`)
    toast({
      title: 'Lead marcado como perdido.',
      description: `${leadName} foi movido para a lista de perdidos.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Marcar Lead como Perdido</DialogTitle>
          <DialogDescription>
            Selecione o motivo da perda para nos ajudar a melhorar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="loss-reason">Motivo da Perda *</Label>
            <Select onValueChange={setReason} value={reason}>
              <SelectTrigger id="loss-reason">
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                {lossReasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loss-notes">Observações (Opcional)</Label>
            <Textarea
              id="loss-notes"
              placeholder="Adicione mais detalhes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar Perda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
