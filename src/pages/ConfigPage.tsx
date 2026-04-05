import { motion } from "framer-motion";
import { Settings, Store, Clock, DollarSign, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ConfigPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible">
        <motion.h1 variants={fadeUp} custom={0} className="text-2xl font-body font-bold text-foreground sm:text-3xl">
          Configurações
        </motion.h1>
        <motion.p variants={fadeUp} custom={1} className="mt-1 text-muted-foreground">
          Personalize as preferências da sua barbearia.
        </motion.p>
      </motion.div>

      <div className="space-y-6">
        {/* Informações da Barbearia */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-body text-lg font-semibold text-foreground">Informações da Barbearia</h3>
              <p className="text-sm text-muted-foreground">Dados gerais do seu estabelecimento.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nome da Barbearia</Label>
              <Input defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input defaultValue="" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Endereço</Label>
              <Input defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label>Email de Contato</Label>
              <Input defaultValue="" />
            </div>
          </div>
        </motion.div>

        {/* Horário de Funcionamento */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-body text-lg font-semibold text-foreground">Horário de Funcionamento</h3>
              <p className="text-sm text-muted-foreground">Defina os horários de abertura e fechamento.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Abertura</Label>
              <Input type="time" defaultValue="08:00" />
            </div>
            <div className="space-y-2">
              <Label>Fechamento</Label>
              <Input type="time" defaultValue="20:00" />
            </div>
            <div className="space-y-2">
              <Label>Intervalo entre Agendamentos (min)</Label>
              <Input type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label>Dias de Funcionamento</Label>
              <Input defaultValue="Segunda a Sábado" />
            </div>
          </div>
        </motion.div>

        {/* Serviços e Preços */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-body text-lg font-semibold text-foreground">Serviços e Preços</h3>
              <p className="text-sm text-muted-foreground">Configure seus serviços oferecidos.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { service: "Corte Social", price: "R$ 15,00", duration: "30 min" },
              { service: "Corte Degradê", price: "R$ 20,00", duration: "40 min" },
              { service: "Barba", price: "R$ 10,00", duration: "20 min" },
              { service: "Corte + Barba", price: "R$ 25,00", duration: "50 min" },
              { service: "Sobrancelha", price: "R$ 5,00", duration: "5 min" },
            ].map((item) => (
              <div key={item.service} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium text-foreground">{item.service}</span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.duration}</span>
                  <span className="font-semibold text-primary">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notificações */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-body text-lg font-semibold text-foreground">Notificações</h3>
              <p className="text-sm text-muted-foreground">Controle como e quando você recebe alertas.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Novos agendamentos", desc: "Receber alerta quando um cliente agendar" },
              { label: "Cancelamentos", desc: "Ser notificado sobre cancelamentos" },
              { label: "Lembrete diário", desc: "Resumo dos agendamentos do dia pela manhã" },
              { label: "Relatórios semanais", desc: "Receber relatório semanal por email" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Salvar */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="flex justify-end">
          <Button variant="gold" size="lg">Salvar Configurações</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfigPage;
