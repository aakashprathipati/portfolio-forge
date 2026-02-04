import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    title: "AI Associate",
    issuer: "Salesforce Certified",
    date: "Oct 2024",
    description: "Certified in Salesforce AI technologies",
    link: "https://www.salesforce.com/trailblazer/aakashprathipati",
  },
  {
    title: "Multicloud Network Associate",
    issuer: "Aviatrix",
    date: "Jan 2025",
    description: "Multi-cloud networking and orchestration",
    link: "https://www.credly.com/badges/1f28e2bb-edba-4d86-9fc9-f23eb65a772b/linked_in",
  },
  {
    title: "Essential Automation Professional",
    issuer: "Automation Anywhere",
    date: "Jul 2025",
    description: "Enterprise automation and RPA certification",
    link: "https://certificates.automationanywhere.com/37aae1ab-3b31-4d4d-b6d1-f7220b1a0792#acc.JzOA8UNd",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-4">CREDENTIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Global <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-border rounded-xl p-6 card-glow transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full opacity-50" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {cert.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-1">{cert.title}</h3>
                <p className="text-primary text-sm mb-2">{cert.issuer}</p>
                <p className="text-muted-foreground text-sm mb-3">{cert.description}</p>
                
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
