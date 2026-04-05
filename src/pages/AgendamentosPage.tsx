import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Plus, Filter, CheckCircle2, XCircle, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type Status = "Confirmado" | "Pendente" | "Cancelado" | "Concluído";

const mockAppointments = [
  // { id: 1, client: "João Silva", service: "Corte + Barba", barber: "Carlos", date: "13/03/2026", time: "09:00", status: "Confirmado" as Status },
  // { id: 2, client: "Pedro Santos", service: "Corte Degradê", barber: "André", date: "13/03/2026", time: "10:00", status: "Confirmado" as Status },
  // { id: 3, client: "Lucas Oliveira", service: "Barba", barber: "Carlos", date: "13/03/2026", time: "10:30", status: "Pendente" as Status },
  // { id: 4, client: "Felipe Costa", service: "Corte Social", barber: "Marcos", date: "13/03/2026", time: "11:00", status: "Concluído" as Status },
  // { id: 5, client: "Rafael Lima", service: "Corte + Sobrancelha", barber: "André", date: "13/03/2026", time: "11:30", status: "Confirmado" as Status },
  // { id: 6, client: "Marcos Almeida", service: "Corte + Barba", barber: "Carlos", date: "13/03/2026", time: "14:00", status: "Pendente" as Status },
  // { id: 7, client: "André Ferreira", service: "Corte Degradê", barber: "Marcos", date: "13/03/2026", time: "15:00", status: "Cancelado" as Status },
  // { id: 8, client: "Carlos Souza", service: "Barba", barber: "André", date: "13/03/2026", time: "16:00", status: "Confirmado" as Status },
];

const statusConfig: Record<Status, { icon: typeof CheckCircle2; className: string }> = {
  Confirmado: { icon: CheckCircle2, className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  Pendente: { icon: Clock3, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  Cancelado: { icon: XCircle, className: "bg-destructive/20 text-destructive border-destructive/30" },
  Concluído: { icon: CheckCircle2, className: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
};

const AgendamentosPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? mockAppointments : mockAppointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-2xl font-body font-bold text-foreground sm:text-3xl">Agendamentos</h1>
          <p className="mt-1 text-muted-foreground">Gerencie a agenda da sua barbearia.</p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold"><Plus className="h-4 w-4" /> Novo Agendamento</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-body text-foreground">Novo Agendamento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Input placeholder="Nome do cliente" />
                </div>
                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corte">Corte</SelectItem>
                      <SelectItem value="barba">Barba</SelectItem>
                      <SelectItem value="corte-barba">Corte + Barba</SelectItem>
                      <SelectItem value="degrade">Corte Degradê</SelectItem>
                      <SelectItem value="sobrancelha">Sobrancelha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Barbeiro</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Selecione o barbeiro" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos</SelectItem>
                      <SelectItem value="andre">André</SelectItem>
                      <SelectItem value="marcos">Marcos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário</Label>
                    <Input type="time" />
                  </div>
                </div>
                <Button variant="gold" className="w-full">Agendar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="flex flex-wrap gap-2">
        <Button variant={filter === "all" ? "gold" : "outline"} size="sm" onClick={() => setFilter("all")}>
          <Filter className="h-3.5 w-3.5" /> Todos
        </Button>
        {(["Confirmado", "Pendente", "Concluído", "Cancelado"] as Status[]).map((s) => {
          const Icon = statusConfig[s].icon;
          return (
            <Button key={s} variant={filter === s ? "gold" : "outline"} size="sm" onClick={() => setFilter(s)}>
              <Icon className="h-3.5 w-3.5" /> {s}
            </Button>
          );
        })}
      </motion.div>

      {/* Appointments List */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="space-y-3">
        {filtered.map((apt, i) => {
          const StatusIcon = statusConfig[apt.status].icon;
          return (
            <motion.div
              key={apt.id}
              variants={fadeUp}
              custom={i + 4}
              className="glass-card flex flex-col gap-3 p-4 transition-all hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="mt-0.5 text-xs font-semibold text-primary">{apt.time}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{apt.client}</p>
                  <p className="text-sm text-muted-foreground">{apt.service} · {apt.barber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {apt.date}
                </div>
                <Badge variant="outline" className={statusConfig[apt.status].className}>
                  <StatusIcon className="mr-1 h-3 w-3" /> {apt.status}
                </Badge>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="glass-card flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Calendar className="h-10 w-10 mb-2" />
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AgendamentosPage;
