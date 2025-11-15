import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'

const leadSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  city: z.string().optional(),
  uf: z.string().optional(),
  origin: z.string({ required_error: 'Origem é obrigatória' }),
  initialStatus: z.string({ required_error: 'Status é obrigatório' }),
  notes: z.string().optional(),
})

type LeadFormValues = z.infer<typeof leadSchema>

const origins = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'Indicação',
  'Site',
  'Outro',
]
const ufs = [
  'SP',
  'RJ',
  'MG',
  'BA',
  'PR',
  'RS',
  'SC',
  'ES',
  'GO',
  'MT',
  'MS',
  'DF',
]

export default function AddLead() {
  const navigate = useNavigate()
  const [formDraft, setFormDraft] = useLocalStorage<Partial<LeadFormValues>>(
    'add-lead-draft',
    {},
  )

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: formDraft,
  })

  const [progress, setProgress] = useState(0)

  const handleSave = (data: LeadFormValues) => {
    console.log('Saving lead:', data)
    toast({
      title: '✓ Lead salvo com sucesso!',
      description: 'O novo lead foi adicionado à sua lista.',
    })
    setFormDraft({}) // Clear draft
    navigate('/leads')
  }

  const handleFormChange = () => {
    const values = form.getValues()
    const totalFields = Object.keys(leadSchema.shape).length
    const filledFields = Object.values(values).filter(
      (v) => v !== '' && v !== undefined,
    ).length
    setProgress((filledFields / totalFields) * 100)
    setFormDraft(values)
  }

  return (
    <Form {...form}>
      <form
        onChange={handleFormChange}
        onSubmit={form.handleSubmit(handleSave)}
        className="bg-gray-50 min-h-full"
      >
        <div className="sticky top-0 z-20 bg-white border-b p-4 md:hidden">
          <div className="flex justify-between items-center">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              ← Voltar
            </Button>
            <h1 className="font-bold text-lg">Novo Lead</h1>
            <Button type="submit" size="sm">
              Salvar
            </Button>
          </div>
          <Progress value={progress} className="w-full h-1 mt-3" />
        </div>

        <div className="p-4 space-y-6 pb-24">
          <Card>
            <CardHeader>
              <CardTitle>📝 Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Maria Silva Santos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(11) 98765-4321"
                        {...field}
                      />
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
                    <FormLabel>E-mail (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="maria@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📍 Onde mora?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ufs.map((uf) => (
                          <SelectItem key={uf} value={uf}>
                            {uf}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Como chegou até nós?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem do Lead *</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {origins.map((origin) => (
                        <Button
                          key={origin}
                          type="button"
                          variant={
                            field.value === origin ? 'default' : 'outline'
                          }
                          onClick={() => field.onChange(origin)}
                        >
                          {origin}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="initialStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Inicial *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Novo">🆕 Novo</SelectItem>
                        <SelectItem value="Qualificado">
                          🎯 Qualificado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📝 Anotações</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Qualquer informação relevante sobre o lead..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t md:hidden">
          <Button type="submit" className="w-full h-12 text-lg">
            ✓ Salvar Lead
          </Button>
        </div>
      </form>
    </Form>
  )
}
