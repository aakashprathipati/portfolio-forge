import { motion } from "framer-motion";
import { GraduationCap, MapPin, Languages } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-4">ABOUT ME</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Driven by <span className="text-gradient">Innovation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 card-glow transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">B.Tech in Computer Science</h4>
                  <span className="text-primary text-sm font-mono">2022-2026</span>
                </div>
                <p className="text-muted-foreground">KL University (KLEF) - Vijayawada</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Strong focus on practical problem-solving and emerging tech. Actively 
                  exploring AI, Cybersecurity, and working on real-world projects.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 card-glow transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">BBA in Business Administration</h4>
                  <span className="text-primary text-sm font-mono">2023-2026</span>
                </div>
                <p className="text-muted-foreground">KL University (KLEF) - Vijayawada</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Foundation in strategic management, marketing, and financial analysis. 
                  Focused on data-driven decision-making.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Vijayawada, Tadepalli, India</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Languages className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold">Languages</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">English (Fluent)</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">Telugu (Native)</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">Hindi (Fluent)</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
              <p className="text-lg leading-relaxed">
                <span className="text-gradient font-semibold">"</span>
                Passionate about turning ideas into scalable solutions. Known for bridging 
                technical depth with business impact, enabling innovation and real-world problem solving.
                <span className="text-gradient font-semibold">"</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
