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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { toast } from '@/hooks/use-toast'
import type { LeadTag } from '@/types'

interface RegisterLeadModalProps {
  isOpen: boolean
  onClose: () => void
}

const tagOptions: Option[] = [
  { value: 'Prospecção ativa', label: 'Prospecção ativa' },
  { value: 'Indicação', label: 'Indicação' },
  { value: 'Influenciadores', label: 'Influenciadores' },
  { value: 'Campanha de marketing', label: 'Campanha de marketing' },
  { value: 'Contato de cliente', label: 'Contato de cliente' },
  { value: 'Eventos e workshops', label: 'Eventos e workshops' },
  { value: 'Portal do cliente', label: 'Portal do cliente' },
]

export const RegisterLeadModal = ({
  isOpen,
  onClose,
}: RegisterLeadModalProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log({ ...data, tags: selectedTags })
    toast({
      title: 'Lead Cadastrado!',
      description: `${data.contactPerson} foi adicionado ao funil.`,
      className: 'bg-success text-white',
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Lead</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar um novo lead ao funil.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Pessoa de contato</Label>
              <Input id="contactPerson" name="contactPerson" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
              <Input id="cpfCnpj" name="cpfCnpj" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Etiquetas</Label>
              <MultiSelect
                options={tagOptions}
                selected={selectedTags}
                onChange={setSelectedTags}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
