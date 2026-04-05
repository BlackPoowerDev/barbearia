import { motion } from "framer-motion";
import { Users, Calendar, Scissors, TrendingUp, Clock, DollarSign } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stats = [
  { title: "Total de Clientes", value: "248", icon: Users, change: "+12%" },
  { title: "Agendamentos Hoje", value: "18", icon: Calendar, change: "+5%" },
  { title: "Barbeiros Ativos", value: "6", icon: Scissors, change: "" },
  { title: "Receita Mensal", value: "R$ 15.420", icon: DollarSign, change: "+8%" },
];

const recentAppointments = [
  // { client: "João Silva", service: "Corte + Barba", time: "09:00", barber: "Carlos" },
  // { client: "Pedro Santos", service: "Corte Degradê", time: "10:00", barber: "André" },
  // { client: "Lucas Oliveira", service: "Barba", time: "10:30", barber: "Carlos" },
  // { client: "Felipe Costa", service: "Corte Social", time: "11:00", barber: "Marcos" },
  // { client: "Rafael Lima", service: "Corte + Sobrancelha", time: "11:30", barber: "André" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible">
        <motion.h1 variants={fadeUp} custom={0} className="text-2xl font-body font-bold text-foreground sm:text-3xl">
          Bem-vindo ao <span className="text-gradient-gold">BarberPro</span>
        </motion.h1>
        <motion.p variants={fadeUp} custom={1} className="mt-1 text-muted-foreground">
          Aqui está o resumo da sua barbearia hoje.
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={i + 2}
            className="glass-card p-5 transition-all duration-300 hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              {stat.change && (
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground font-body">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={6}
        className="glass-card overflow-hidden"
      >
        <div className="border-b border-border p-5">
          <h3 className="font-body text-lg font-semibold text-foreground">Agendamentos de Hoje</h3>
        </div>
        <div className="divide-y divide-border">
          {recentAppointments.map((apt) => (
            <div key={apt.time + apt.client} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  <img 
        src={`https://api.dicebear.com/9.x/dylan/svg?seed=${apt.client}&backgroundColor=transparent&radius=50&hair=flatTop,spiky,plain,wavy,shortCurls&mood=superHappy`} 
        
        alt="Avatar"
      />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{apt.client}</p>
                  <p className="text-xs text-muted-foreground">{apt.service}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-foreground">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {apt.time}
                </div>
                <p className="text-xs text-muted-foreground">{apt.barber}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
