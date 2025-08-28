import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Database, Brain } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  useScrollAnimation();
  const achievements = [
    {
      icon: Database,
      title: "Large-scale Data Analysis",
      description: "Conducted EDA on 100,000+ histopathology images and single-cell RNA sequencing datasets"
    },
    {
      icon: Brain,
      title: "Advanced Deep Learning",
      description: "Applied cutting-edge techniques including GELU activation, dropout, and gradient clipping"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Boosted model accuracy from 74.8% → 85.7%, outperforming established benchmarks"
    }
  ];

  const technologies = [
    "Deep Learning", "PyTorch", "TensorFlow", "Data Analysis", 
    "Computer Vision", "Bioinformatics", "Python", "Jupyter"
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="bg-gradient-crimson bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
          </div>

          {/* Main Experience Card */}
          <div className="mb-12 animate-on-scroll">
            <Card className="bg-card border-border/30 hover:bg-card-hover transition-all duration-300 group shadow-elegant">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-crimson rounded-xl flex items-center justify-center shadow-crimson">
                      <Briefcase className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Artificial Intelligence Research Intern
                        </h3>
                        <h4 className="text-xl text-primary font-semibold">
                          Delhi Technological University
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground font-medium">June - July 2024</p>
                        <Badge variant="secondary" className="mt-2">Research Internship</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Conducted cutting-edge research in artificial intelligence, focusing on deep learning 
                      applications for biological data analysis. Worked with massive datasets to develop 
                      and optimize machine learning models for real-world applications.
                    </p>

                    {/* Technologies Used */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-foreground mb-3">Technologies & Tools</h5>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">Key Achievements</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-300 group hover:shadow-card">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;