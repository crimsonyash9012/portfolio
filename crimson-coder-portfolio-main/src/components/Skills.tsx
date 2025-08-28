import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Users, 
  MessageCircle,
  Presentation,
  Target
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  useScrollAnimation();
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["C", "C++", "Python", "Java", "Kotlin", "Dart"],
      color: "text-blue-500"
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: ["Flutter", "Jetpack Compose", "Android SDK", "Firebase", "Appwrite"],
      color: "text-green-500"
    },
    {
      title: "Machine Learning",
      icon: Brain,
      skills: ["NLP", "Reinforcement Learning", "Classification", "Clustering", "Regression"],
      color: "text-purple-500"
    },
    {
      title: "Data & Backend",
      icon: Database,
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "REST API", "Room DB"],
      color: "text-orange-500"
    },
    {
      title: "Development Tools",
      icon: Target,
      skills: ["Dagger-Hilt", "Koin", "Retrofit", "Git", "MVVM", "OOP"],
      color: "text-red-500"
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: ["Leadership", "Communication", "Public Speaking", "Team Collaboration"],
      color: "text-cyan-500"
    }
  ];

  const expertise = [
    {
      title: "Android Development",
      level: 90,
      description: "Expert in Kotlin, Jetpack Compose, and modern Android architecture"
    },
    {
      title: "Machine Learning",
      level: 85,
      description: "Strong foundation in ML algorithms, deep learning, and data analysis"
    },
    {
      title: "Flutter Development",
      level: 80,
      description: "Cross-platform app development with beautiful UIs"
    },
    {
      title: "Python Programming",
      level: 88,
      description: "Proficient in Python for ML, data analysis, and backend development"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Skills & <span className="bg-gradient-crimson bg-clip-text text-transparent">Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building innovative Android applications and AI-powered solutions
            </p>
          </div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-500 group hover:shadow-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-sm hover:bg-primary/10 hover:text-primary transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Expertise Levels */}
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold text-center mb-8">Core Expertise</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {expertise.map((item, index) => (
                <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-500 animate-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <span className="text-primary font-bold text-lg">
                        {item.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3 mb-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-crimson rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Highlighted Skills */}
          <div className="mt-16 text-center animate-on-scroll">
            <div className="bg-gradient-crimson/10 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Specialized In
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {["Android Development", "Machine Learning", "Cross-platform Apps", "AI Research"].map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-lg px-6 py-2 border-primary/30 text-primary hover:bg-primary/10">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;