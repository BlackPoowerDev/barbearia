import { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { UserCheck, Plus, Star, Scissors, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthContext } from "./AuthContext";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const statusColor: Record<string, string> = {
  false: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  true: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const BarbeirosPage = () => {
  const [barbers, setBarbers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadBarbers() {
      if (!user?.id) return;

      try {
        const response = await api.get(`/v1/barber`);
        if (response.data) {
          setBarbers(response.data?.barber);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadBarbers();
  });

  async function createBarber(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data) return false;

    try {
      const res = await api.post(`/v1/barber/create/${user?.id}`, data);

      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-2xl font-body font-bold text-foreground sm:text-3xl">
            Barbeiros
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie a equipe da sua barbearia.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="h-4 w-4" /> Novo Barbeiro
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-body text-foreground">
                  Novo Barbeiro
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4 pt-2" onSubmit={createBarber}>
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input placeholder="Nome completo" name="nome" />
                </div>
                <div className="space-y-2">
                  <Label>Especialidades</Label>
                  <Input
                    placeholder="Ex: Corte Degradê, Barba"
                    name="especialidades"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" name="telefone" />
                </div>
                <div className="space-y-2">
                  <Label>Horário de Trabalho</Label>
                  <div>
                    <Label>Inicio</Label>
                    <Input name="horario_inicio" type="time" required />
                    <Label>Final</Label>
                    <Input name="horario_fim" type="time" required />
                  </div>
                </div>
                <Button variant="gold" className="w-full">
                  Cadastrar Barbeiro
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={i + 2}
            className="glass-card p-5 transition-all duration-300 hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {barber.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground">{barber.nome}</p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    {/* <Star className="h-3 w-3 fill-primary" /> {barber.rating} */}
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={statusColor[barber.bloqueado]}
              >
                {barber.bloqueado ? "Inativo" : "Ativo"}
              </Badge>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Scissors className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.especialidades}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.horario_inicio}</span>
                <span>{barber.horario_fim}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.telefone}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                {/* {barber.clients} clientes atendidos */}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary hover:text-primary"
              >
                Ver Perfil
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BarbeirosPage;
