import { useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Phone,
  Eye,
  EyeClosed,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";

import api from "../services/api";

const AuthPage = () => {
  const { setUserData } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(
    searchParams.get("tab") !== "register",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);

    if (isLogin) {
      try {
        const response = await api.post("/v1/barberShop/login", {
          ...data,
        });

        if (response.data.status) {
          setLoading(false);
          toast.success("Login realizado com sucesso!", {
            position: "top-center",
            className: "!bg-green-600 !text-white !border-green-700",
            duration: 2000,
          });
          localStorage.setItem("token", response.data.access_token);
          setUserData(response.data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
        toast.error(error.response.data.mensagem || "Erro ao realizar login", {
          className: "!bg-red-600 !text-white !border-red-700",
          duration: 2000,
        });
      }
    } else {
      try {
        const response = await api.post("/v1/barberShop/create", { ...data });

        if (response.data.status) {
          setLoading(false);
          toast.success("Conta criada com sucesso!");
          localStorage.setItem("token", response.data.access_token);
          setUserData(response.data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
        toast.error(error.response.data.error);
      }
    }
  };

  const handleEyeToggle: () => void = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="glass-card p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2">
              <Scissors className="h-7 w-7 text-primary" />
              <span className="text-2xl font-body font-bold text-foreground">
                BarberPro
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Acesse sua barbearia"
                : "Gerencie sua barbearia com facilidadee"}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="mb-8 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm text-foreground">
                    Nome
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      autoComplete="off"
                      name="nome"
                      className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    name="email"
                    autoComplete="off"
                    className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="••••••••"
                    name="senha"
                    className="pr-10 pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                  {showPassword ? (
                    <Eye
                      onClick={handleEyeToggle}
                      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      onClick={handleEyeToggle}
                      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-sm text-foreground">
                    Telefone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="telefone"
                      autoComplete="off"
                      placeholder="Seu Telefone"
                      name="telefone"
                      className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                type="submit"
                disabled={Loading}
              >
                {Loading ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                  </>
                ) : isLogin ? (
                  "Entrar"
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
