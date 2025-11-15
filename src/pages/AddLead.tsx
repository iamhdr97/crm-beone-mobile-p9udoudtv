import { useState, useEffect } from 'react'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Loader2, Check, AlertTriangle, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const leadSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  whatsapp: z.string().min(15, 'WhatsApp inválido. Ex: (11) 98765-4321'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  city: z.string().optional(),
  uf: z.string().optional(),
  origin: z.string({ required_error: 'Origem é obrigatória' }),
  initialStatus: z.string().default('Novo'),
  notes: z.string().optional(),
})

type LeadFormValues = z.infer<typeof leadSchema>

const origins = [
  { label: '📱 WhatsApp', value: 'WhatsApp' },
  { label: '📸 Instagram', value: 'Instagram' },
  { label: '📘 Facebook', value: 'Facebook' },
  { label: '👥 Indicação', value: 'Indicação' },
  { label: '🌐 Site', value: 'Site' },
  { label: '🔗 Outro', value: 'Outro' },
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
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador']

const formatWhatsApp = (value: string) => {
  if (!value) return value
  const digitsOnly = value.replace(/\D/g, '').slice(0, 11)
  if (digitsOnly.length <= 2) return `(${digitsOnly}`
  if (digitsOnly.length <= 7)
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`
  return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`
}

const unformatWhatsApp = (value: string) => value.replace(/\D/g, '')

const FieldFeedback = ({
  isValid,
  message,
}: {
  isValid: boolean
  message: string
}) => (
  <div
    className={cn(
      'flex items-center text-xs mt-1',
      isValid ? 'text-green-600' : 'text-red-600',
    )}
  >
    {isValid ? (
      <Check className="w-3 h-3 mr-1" />
    ) : (
      <AlertTriangle className="w-3 h-3 mr-1" />
    )}
    {message}
  </div>
)

export default function AddLead() {
  const navigate = useNavigate()
  const [formDraft, setFormDraft] = useLocalStorage<Partial<LeadFormValues>>(
    'add-lead-draft',
    {},
  )
  const [progress, setProgress] = useState(0)

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      ...formDraft,
      initialStatus: formDraft.initialStatus || 'Novo',
    },
    mode: 'onTouched',
  })

  const {
    formState: { isSubmitting, isValid, errors, touchedFields },
    watch,
    control,
    getValues,
  } = form

  useEffect(() => {
    const subscription = watch((values) => {
      const totalFields = Object.keys(leadSchema.shape).length
      const filledFields = Object.entries(values).filter(([key, value]) => {
        const fieldSchema =
          leadSchema.shape[key as keyof typeof leadSchema.shape]
        return (
          !fieldSchema.isOptional() &&
          value !== '' &&
          value !== undefined &&
          value !== null
        )
      }).length
      setProgress((filledFields / (totalFields - 5)) * 100) // Adjust total for optional fields
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = getValues()
      if (Object.keys(touchedFields).length > 0) {
        setFormDraft(currentValues)
        toast({
          title: '💾 Rascunho salvo',
          duration: 2000,
        })
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [getValues, setFormDraft, touchedFields])

  const handleSave = async (data: LeadFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newLeadId = Math.floor(Math.random() * 1000) + 10
      console.log('Saving lead:', { ...data, id: newLeadId })
      toast({
        title: '✓ Lead salvo com sucesso!',
        description: `${data.fullName} foi adicionado à sua lista.`,
        className: 'bg-success text-white',
      })
      setFormDraft({})
      navigate(`/leads/${newLeadId}`)
    } catch (error) {
      toast({
        title: '⚠️ Erro ao salvar. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="bg-gray-50 min-h-full"
      >
        <div className="sticky top-16 md:top-0 z-20 bg-white border-b p-4 md:hidden">
          <div className="flex justify-between items-center">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              ← Voltar
            </Button>
            <h1 className="font-bold text-lg">Novo Lead</h1>
            <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Salvar'
              )}
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
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome como aparece no documento"
                        {...field}
                        autoComplete="name"
                        className="h-11"
                      />
                    </FormControl>
                    {touchedFields.fullName &&
                      (errors.fullName ? (
                        <FieldFeedback
                          isValid={false}
                          message={errors.fullName.message!}
                        />
                      ) : (
                        <FieldFeedback isValid={true} message="OK!" />
                      ))}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp *</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 98765-4321"
                          {...field}
                          onChange={(e) =>
                            field.onChange(formatWhatsApp(e.target.value))
                          }
                          autoComplete="tel"
                          inputMode="numeric"
                          className="h-11"
                        />
                      </FormControl>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 flex-shrink-0 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                      >
                        <a
                          href={`https://wa.me/55${unformatWhatsApp(field.value || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </a>
                      </Button>
                    </div>
                    {touchedFields.whatsapp &&
                      (errors.whatsapp ? (
                        <FieldFeedback
                          isValid={false}
                          message={errors.whatsapp.message!}
                        />
                      ) : (
                        <FieldFeedback isValid={true} message="OK!" />
                      ))}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="maria@email.com"
                        {...field}
                        autoComplete="email"
                        inputMode="email"
                        className="h-11"
                      />
                    </FormControl>
                    {field.value &&
                      (errors.email ? (
                        <FieldFeedback
                          isValid={false}
                          message={errors.email.message!}
                        />
                      ) : (
                        <FieldFeedback isValid={true} message="OK!" />
                      ))}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📍 Localização</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="São Paulo"
                        {...field}
                        list="cities-datalist"
                        className="h-11"
                      />
                    </FormControl>
                    <datalist id="cities-datalist">
                      {cities.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
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
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Origem e Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem do Lead *</FormLabel>
                    <div className="grid grid-cols-2 gap-3">
                      {origins.map((origin) => (
                        <Button
                          key={origin.value}
                          type="button"
                          variant={
                            field.value === origin.value ? 'default' : 'outline'
                          }
                          onClick={() => field.onChange(origin.value)}
                          className={cn('h-11 text-sm', {
                            'bg-primary text-white':
                              field.value === origin.value,
                            'bg-white border-gray-300 text-gray-600':
                              field.value !== origin.value,
                          })}
                        >
                          {origin.label}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="initialStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Inicial *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
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
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💬 Anotações</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Cliente demonstrou interesse em plano familiar..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t md:hidden">
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold btn"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              '✓'
            )}
            {isSubmitting ? 'Salvando...' : 'Salvar Lead'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
