import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-4">GET IN TOUCH</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, 
            or just having a chat about technology and innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-4 sm:p-8 md:p-12 mx-0"
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:aakashprathipaticore@gmail.com"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm sm:text-base truncate">aakashprathipaticore@gmail.com</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </a>

              <a
                href="tel:+917730901750"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-2 sm:p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 7730901750</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </a>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/50">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Vijayawada, Tadepalli, India</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center items-center text-center">
              <div className="p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 w-full">
                <Linkedin className="h-8 sm:h-12 w-8 sm:w-12 text-primary mx-auto mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Connect on LinkedIn</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
                  Let's expand our professional networks
                </p>
                <Button 
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-6 sm:px-8"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/aakash-prathipati-431616344/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Profile
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
