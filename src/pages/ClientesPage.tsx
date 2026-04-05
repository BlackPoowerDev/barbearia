import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MoreHorizontal,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { AuthContext } from "./AuthContext";
import api from "@/services/api";
import multiavatar from "@multiavatar/multiavatar/esm";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const mockClients = [];

const statusColor: Record<string, string> = {
  Ativo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  VIP: "bg-primary/20 text-primary border-primary/30",
  Novo: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Inativo: "bg-muted text-muted-foreground border-border",
};

const ClientesPage = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState(mockClients);

  useEffect(() => {
    async function loadClients() {
      if (!user?.id) return;

      try {
        const response = await api.get(`/v1/users/${user.id}`);
        if (response.data && response.data.user) {
          setClients(response.data.user);
        }
      } catch (error) {
        toast.error(error.response.data.mensagem || "Erro ao buscar clientes");
      }
    }

    loadClients();
  }, [user?.id]);

  const [search, setSearch] = useState("");
  const filtered = clients.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const create = await api.post(`/v1/users/create/${user?.id}`, data);

      if (create.data.status) {
        const response = await api.get(`/v1/users/${user.id}`);
        if (response.data && response.data.user) {
          setClients(response.data.user);
          setOpen(false);
          toast.success("Cliente adicionado com sucesso!");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.error || "Erro ao adicionar cliente");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-2xl font-body font-bold text-foreground sm:text-3xl">
            Clientes
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie seus clientes e histórico de visitas.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="gold" size="default">
                <Plus className="h-4 w-4" /> Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-body text-foreground">
                  Novo Cliente
                </DialogTitle>
              </DialogHeader>
              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="space-y-4 pt-2"
              >
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    name="nome"
                    placeholder="Nome completo"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Input name="idade" placeholder="20" autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    autoComplete="off"
                  />
                </div>
                <Button variant="gold" className="w-full">
                  Cadastrar Cliente
                </Button>
              </motion.form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-body text-foreground">
              Novo Cliente
            </DialogTitle>
          </DialogHeader>
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-4 pt-2"
          >
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                name="nome"
                placeholder="Nome completo"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                autoComplete="off"
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Idade</Label>
              <Input name="idade" placeholder="20" autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                name="telefone"
                placeholder="(00) 00000-0000"
                autoComplete="off"
              />
            </div>
            <Button variant="gold" className="w-full">
              Cadastrar Cliente
            </Button>
          </motion.form>
        </DialogContent>
      </Dialog>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
        className="glass-card overflow-hidden"
      >
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Contato
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Idade
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Cortes
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Data/Hora
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((client) => (
                <tr
                  key={client.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar com Multiavatar */}
                      <div className="h-10 w-10 shrink-0 rounded-full border-2 border-border overflow-hidden">
                        <img
                          src={`https://api.dicebear.com/9.x/dylan/svg?seed=${client.id}&backgroundColor=transparent&radius=50&hair=flatTop,spiky,plain,wavy,shortCurls&mood=superHappy`}
                          alt="Avatar"
                        />
                      </div>
                      <span className="font-medium text-foreground">
                        {client.nome}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-muted-foreground w-full">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {client.telefone}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-foreground">{client.idade}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={statusColor[client.status]}
                    >
                      {client.cortes_finalizados}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-foreground">
                      {new Date(client.data_cadastro).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <td className="px-5 py-4">
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </td>

                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="font-body text-foreground">
                          Editar Cliente
                        </DialogTitle>
                      </DialogHeader>
                      <motion.form
                        variants={fadeUp}
                        onSubmit={handleSubmit}
                        className="space-y-4 pt-2"
                      >
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input
                            name="nome"
                            placeholder="Nome completo"
                            autoComplete="off"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            name="email"
                            type="email"
                            autoComplete="off"
                            placeholder="email@exemplo.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Idade</Label>
                          <Input
                            name="idade"
                            placeholder="20"
                            autoComplete="off"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <Input
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            autoComplete="off"
                          />
                        </div>
                        <Button variant="gold" className="w-full">
                          Cadastrar Cliente
                        </Button>
                      </motion.form>
                    </DialogContent>
                  </Dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {filtered.map((client) => (
            <div key={client.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    <img
                      src={`https://api.dicebear.com/9.x/dylan/svg?seed=${client.id}&backgroundColor=transparent&radius=50&hair=flatTop,spiky,plain,wavy,shortCurls&mood=superHappy`}
                      alt="Avatar"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{client.nome}</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {client.telefone}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {client.idade}
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      Cortes: {client.cortes_finalizados}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      Data/Hora:{" "}
                      {new Date(client.data_cadastro).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              {/* <div className="flex flex-col text-xs text-muted-foreground">
                
              </div> */}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Users className="h-10 w-10 mb-2" />
            <p>Nenhum cliente encontrado.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ClientesPage;
