import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    // Mock API call
    setTimeout(() => {
      const email = (
        event.currentTarget.elements.namedItem('email') as HTMLInputElement
      ).value
      if (email === 'error@beone.com') {
        setError('Credenciais inválidas. Por favor, tente novamente.')
        setIsLoading(false)
      } else {
        navigate('/dashboard')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-beone p-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-6xl font-bold flex items-center justify-center">
          be
          <div className="w-10 h-10 border-2 border-white rounded-full mx-1" />
          ne
        </h1>
        <p className="text-lg text-white/90 mt-2">CRM Mobile</p>
      </div>

      <Card className="w-full max-w-sm shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                autoFocus
                autoComplete="email"
                inputMode="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="text-center">
              <Link
                to="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
