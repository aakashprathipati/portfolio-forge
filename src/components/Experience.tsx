import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import { useRef } from "react";
import internshipCert from "@/assets/internship-cert.png";

const experiences = [
  {
    title: "AI Research Programmer - Intern",
    company: "GoldLighT Technologies Pvt. Ltd.",
    location: "Bengaluru",
    period: "Jul 2025 - Nov 2025",
    description: [
      "Engineered and developed an end-to-end AI system for flood assessment",
      "Designed a hypothetical cancer detection system transforming raw imagery into actionable intelligence",
      "Contributed to AI/ML research, model experimentation, and implementation tasks",
    ],
    extraInfo: {
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],
      achievements: [
        "Achieved 94% accuracy in flood damage classification",
        "Reduced processing time by 60% through model optimization",
        "Published internal research paper on semantic segmentation techniques"
      ],
      certificateImage: internshipCert,
    }
  },
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to control timeline indicator position
  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-primary font-mono text-sm tracking-wider">CAREER</p>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30"
            >
              AI/ML
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Timeline track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 md:-translate-x-1/2 rounded-full overflow-hidden">
            {/* Scroll progress fill */}
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-gradient-to-b from-primary to-accent rounded-full"
            />
          </div>

          {/* Scroll indicator node */}
          <motion.div
            style={{ top: indicatorY }}
            className="absolute left-4 md:left-1/2 w-4 h-4 md:-translate-x-1/2 -translate-x-1/2 z-20"
          >
            <div className="w-full h-full rounded-full bg-accent glow animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
          </motion.div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex flex-col md:flex-row gap-8 mb-16"
            >
              {/* Static timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2 -translate-x-1 mt-8 z-10 border-2 border-background" />

              {/* Content */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-16">
                <motion.div
                  whileInView={{ 
                    boxShadow: "0 0 30px -10px hsl(200 100% 60% / 0.4)"
                  }}
                  viewport={{ once: false, margin: "-200px" }}
                  className="bg-card border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-primary font-mono text-sm">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </span>
                    <span>{exp.location}</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extra info - always visible with scroll reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="pt-4 border-t border-border"
                  >
                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.extraInfo.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Key Achievements:</p>
                      <ul className="space-y-1">
                        {exp.extraInfo.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-xs text-foreground/80 flex items-start gap-2"
                          >
                            <span className="text-accent">★</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Certificate Image */}
                    {exp.extraInfo.certificateImage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-4"
                      >
                        <p className="text-xs text-muted-foreground mb-2">Certificate of Completion:</p>
                        <div className="rounded-lg overflow-hidden border border-border bg-white">
                          <img
                            src={exp.extraInfo.certificateImage}
                            alt="Internship Certificate"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
