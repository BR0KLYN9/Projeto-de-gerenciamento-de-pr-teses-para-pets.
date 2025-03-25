
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-ocean-50 to-blue-100 dark:from-ocean-900 dark:to-blue-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-ocean-300/20 dark:bg-ocean-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-ocean-200/20 dark:bg-ocean-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-3 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-2xl shadow-lg mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">OB</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">OceanBacon</h1>
            <p className="text-muted-foreground mt-2">
              Plataforma de Gestão de Próteses para Pets
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 dark:border-gray-800/50 p-6 mb-8 animate-scale-in">
            <h2 className="text-xl font-semibold mb-6 text-center">
              Acesso Funcionários
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/70"
                  placeholder="seu.email@oceanbacon.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input rounded-lg px-4 py-2.5 text-foreground pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg py-2.5 font-medium flex items-center justify-center space-x-2 transition-colors duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      <span>Entrar</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demonstração: admin@oceanbacon.com / senha123</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 text-center text-xs text-muted-foreground/70 p-4">
        © FunhasInovattion2025
      </div>
    </div>
  );
};

export default Index;
