import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  Cloud, 
  Database, 
  Code2, 
  Layers, 
  TrendingUp 
} from "lucide-react";

const skills = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Deep learning frameworks, semantic modeling, adaptive NLP systems",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Threat intelligence, adversarial testing, secure infrastructure design",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Layers,
    title: "Blockchain & Web3",
    description: "Smart contract ecosystems, decentralized frameworks, cryptographic protocols",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Multi-cloud orchestration, containerized environments, serverless deployments",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Database,
    title: "Data Science",
    description: "Predictive intelligence, large-scale data processing, decision-driven insights",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Code2,
    title: "Systems Engineering",
    description: "Scalable architectures, distributed systems, cross-platform solutions",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Techno-Business Strategy",
    description: "Digital transformation roadmaps, innovation frameworks, product lifecycle",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-4">EXPERTISE</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-border rounded-xl p-6 card-glow transition-all duration-300 hover:border-primary/50"
            >
              <div className={`inline-flex p-3 rounded-xl ${skill.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                <skill.icon className={`h-6 w-6 ${skill.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
