import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const backendUrl = 'http://localhost:8080';
    const loginUrl = `${backendUrl}/auth/login`;

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('Login bem-sucedido! O cookie foi recebido pelo navegador.');
        navigate('/dashboard');
      } else {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || 'Usuário ou senha inválidos.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      console.error('Erro de rede:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in bg-background">
      <div className="login-card animate-slide-up">
        {/* Logo e Branding */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 text-shadow">
            TecnoTooling
          </h1>
          <p className="text-muted-foreground text-base">
            Sistema de Gestão Industrial
          </p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="block text-base font-semibold text-foreground mb-2"
            >
              Usuário
            </label>
            <div className="relative">
              <div className="input-icon">
                <User className="w-5 h-5" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-industrial pl-12"
                placeholder="Digite seu usuário"
                required
                autoComplete="username"
                aria-describedby="username-help"
              />
            </div>
            <p id="username-help" className="text-sm text-muted-foreground mt-1">
              Use seu nome de usuário do sistema
            </p>
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-base font-semibold text-foreground mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <div className="input-icon">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-industrial pl-12 pr-12"
                placeholder="Digite sua senha"
                required
                autoComplete="current-password"
                aria-describedby="password-help"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm p-1"
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p id="password-help" className="text-sm text-muted-foreground mt-1">
              Sua senha é confidencial e segura
            </p>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md animate-fade-in text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="btn-primary mt-8 relative overflow-hidden group"
          >
            <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Entrar no Sistema
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>

        {/* Informações de Ajuda */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Problemas para acessar?
            </p>
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-hover transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-2 py-1"
            >
              Contate o suporte técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

