import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-beone p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
          <CardDescription>
            Não se preocupe! Insira seu e-mail abaixo para receber um link de
            redefinição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white">
              Enviar Link de Redefinição
            </Button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                Voltar para o Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
