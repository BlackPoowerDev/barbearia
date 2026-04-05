import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, BarChart3, Scissors, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-barbershop.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const benefits = [
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Cadastre e acompanhe seus clientes com histórico completo de serviços e preferências.",
  },
  {
    icon: Calendar,
    title: "Agendamentos",
    description: "Sistema inteligente de agendamento online para seus clientes e barbeiros.",
  },
  {
    icon: BarChart3,
    title: "Controle Total",
    description: "Relatórios e estatísticas detalhadas para gerenciar sua barbearia com eficiência.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-body font-bold text-foreground">BarberPro</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              Login
            </Button>
            <Button variant="gold" size="sm" onClick={() => navigate("/auth?tab=register")}>
              Criar Conta
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Barbearia moderna" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Star className="h-4 w-4" />
              Sistema #1 para Barbearias
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="mb-6 font-body text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Gerencie sua{" "}
              <span className="text-gradient-gold">Barbearia</span>{" "}
              como um profissional
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground font-body">
              A plataforma completa para gerenciar clientes, agendamentos e toda a operação da sua barbearia em um só lugar.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="xl" onClick={() => navigate("/auth?tab=register")}>
                Começar Agora
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button variant="gold-outline" size="xl" onClick={() => navigate("/auth")}>
                Fazer Login
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <motion.h2 variants={fadeUp} custom={0} className="mb-4 font-body text-3xl font-bold text-foreground sm:text-4xl">
              Tudo que você precisa para sua{" "}
              <span className="text-gradient-gold">barbearia</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mx-auto max-w-lg text-muted-foreground">
              Ferramentas poderosas e fáceis de usar para transformar a gestão do seu negócio.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="glass-card group p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-gold"
              >
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-body text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Scissors className="h-4 w-4 text-primary" />
            <span className="text-sm font-body">BarberPro © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
