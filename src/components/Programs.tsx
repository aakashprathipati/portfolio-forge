import { motion } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";
import quantumCertificate from "@/assets/quantum-certificate.png";

const programs = [
  {
    title: "Quantum Fundamentals Program",
    issuer: "WISER, Qubitech & Amaravati Quantum Valley",
    date: "2025–2026",
    description: "4-week program on quantum computing fundamentals, equivalent to 1 academic credit.",
    image: quantumCertificate,
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-4">PROGRAMS</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Academic <span className="text-gradient">Programs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-border rounded-xl overflow-hidden card-glow transition-all duration-300 hover:border-primary/50"
            >
              {/* Certificate Image */}
              <div className="relative overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} Certificate`}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{program.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{program.title}</h3>
                <p className="text-primary text-sm mb-2">{program.issuer}</p>
                <p className="text-muted-foreground text-sm">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
