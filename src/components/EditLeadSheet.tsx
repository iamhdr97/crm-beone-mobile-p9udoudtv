import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { toast } from '@/hooks/use-toast'
import type { Lead, KanbanStage } from '@/types'

const leadSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('E-mail inválido'),
  company: z.string().optional(),
  stage: z.string(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

type LeadFormValues = z.infer<typeof leadSchema>

interface EditLeadSheetProps {
  isOpen: boolean
  onClose: () => void
  lead: Lead | null
  onSave: (updatedLead: Lead) => void
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

const stages: KanbanStage[] = [
  'Pré-qualificação',
  'Qualificação',
  'Conversa Agendada',
  'Elaboração de Proposta',
  'Negociação',
]

export function EditLeadSheet({
  isOpen,
  onClose,
  lead,
  onSave,
}: EditLeadSheetProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      stage: '',
      tags: [],
      notes: '',
    },
  })

  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        company: lead.company || '',
        stage: lead.stage,
        tags: lead.tags || [],
        notes: '', // Assuming notes are not in the Lead type for list view, but we add it here
      })
    }
  }, [lead, form])

  const onSubmit = (data: LeadFormValues) => {
    if (!lead) return
    const updatedLead = { ...lead, ...data, stage: data.stage as KanbanStage }
    onSave(updatedLead)
    toast({
      title: 'Lead atualizado',
      description: 'As informações foram salvas com sucesso.',
      className: 'bg-success text-white',
    })
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Editar Oportunidade</SheetTitle>
          <SheetDescription>Atualize os dados do lead abaixo.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etapa</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a etapa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={tagOptions}
                      selected={field.value || []}
                      onChange={field.onChange}
                      placeholder="Selecione etiquetas..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
