import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

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
      certificateLink: null,
    }
  },
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
          <p className="text-primary font-mono text-sm tracking-wider mb-4">CAREER</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Interactive Timeline dot */}
              <motion.button
                onClick={() => toggleExpand(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full md:-translate-x-1/2 -translate-x-2 mt-6 cursor-pointer transition-all duration-300 z-10 ${
                  expandedIndex === index 
                    ? "bg-accent glow scale-125" 
                    : "bg-primary glow hover:bg-accent"
                }`}
                title="Click to see more details"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-primary/30"
                />
              </motion.button>

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="bg-card border border-border rounded-xl p-6 card-glow transition-all duration-300 hover:border-primary/50">
                  <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-primary font-mono text-sm">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  
                  <div className={`flex items-center gap-4 text-muted-foreground text-sm mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </span>
                    <span>{exp.location}</span>
                  </div>
                  
                  <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className={`text-primary ${index % 2 === 0 ? "md:order-2" : ""}`}>▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className={`mt-4 flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <span>{expandedIndex === index ? "Show less" : "Show more details"}</span>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-4 pt-4 border-t border-border ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          {/* Technologies */}
                          <div className="mb-4">
                            <p className="text-xs text-muted-foreground mb-2">Technologies Used:</p>
                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                              {exp.extraInfo.technologies.map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Key Achievements:</p>
                            <ul className={`space-y-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                              {exp.extraInfo.achievements.map((achievement, i) => (
                                <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                                  <span className={`text-accent ${index % 2 === 0 ? "md:order-2" : ""}`}>★</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {exp.extraInfo.certificateLink && (
                            <a
                              href={exp.extraInfo.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 mt-4 text-xs text-primary hover:text-accent transition-colors ${
                                index % 2 === 0 ? "md:ml-auto" : ""
                              }`}
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Certificate
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
