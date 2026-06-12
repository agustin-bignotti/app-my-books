import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">MyBooks</h1>
          <p className="text-sm text-gray-500">
            Ingresa tu correo y te mandamos un enlace para entrar.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
