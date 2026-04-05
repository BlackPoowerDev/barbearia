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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const mockBarbers = [
  { id: 1, name: "Carlos Mendes", specialty: "Corte Degradê, Barba", phone: "(11) 99999-0001", rating: 4.9, clients: 120, status: "Disponível", schedule: "09:00 – 18:00" },
  // { id: 2, name: "André Rocha", specialty: "Corte Social, Sobrancelha", phone: "(11) 99999-0002", rating: 4.8, clients: 95, status: "Disponível", schedule: "10:00 – 19:00" },
  // { id: 3, name: "Marcos Ribeiro", specialty: "Corte + Barba, Pigmentação", phone: "(11) 99999-0003", rating: 4.7, clients: 80, status: "Ocupado", schedule: "08:00 – 17:00" },
  // { id: 4, name: "Thiago Alves", specialty: "Corte Infantil, Degradê", phone: "(11) 99999-0004", rating: 4.6, clients: 60, status: "Folga", schedule: "09:00 – 18:00" },
  // { id: 5, name: "Lucas Pinto", specialty: "Barba, Corte Navalhado", phone: "(11) 99999-0005", rating: 4.5, clients: 45, status: "Disponível", schedule: "11:00 – 20:00" },
  // { id: 6, name: "Fernando Dias", specialty: "Corte Americano, Barba", phone: "(11) 99999-0006", rating: 4.9, clients: 130, status: "Ocupado", schedule: "08:00 – 17:00" },
];

const statusColor: Record<string, string> = {
  Disponível: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Ocupado: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Folga: "bg-muted text-muted-foreground border-border",
};

const BarbeirosPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-2xl font-body font-bold text-foreground sm:text-3xl">Barbeiros</h1>
          <p className="mt-1 text-muted-foreground">Gerencie a equipe da sua barbearia.</p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold"><Plus className="h-4 w-4" /> Novo Barbeiro</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-body text-foreground">Novo Barbeiro</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input placeholder="Nome completo" />
                </div>
                <div className="space-y-2">
                  <Label>Especialidades</Label>
                  <Input placeholder="Ex: Corte Degradê, Barba" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Horário de Trabalho</Label>
                  <Input placeholder="Ex: 09:00 – 18:00" />
                </div>
                <Button variant="gold" className="w-full">Cadastrar Barbeiro</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockBarbers.map((barber, i) => (
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
                  {barber.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground">{barber.name}</p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Star className="h-3 w-3 fill-primary" /> {barber.rating}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={statusColor[barber.status]}>{barber.status}</Badge>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Scissors className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.specialty}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-primary/70" />
                <span>{barber.phone}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">{barber.clients} clientes atendidos</span>
              <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">Ver Perfil</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BarbeirosPage;
