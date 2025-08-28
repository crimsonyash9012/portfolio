import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  useScrollAnimation();
  const education = [
    {
      institution: "Delhi Technological University",
      degree: "B.Tech in Computer Science Engineering",
      period: "2023 - 2027",
      status: "Pursuing",
      icon: GraduationCap
    },
    {
      institution: "Chhauni Children's Academy",
      degree: "Class 12 (Science)",
      period: "2022",
      status: "86%",
      icon: GraduationCap
    },
    {
      institution: "Chhauni Children's Academy",
      degree: "Class 10",
      period: "2020",
      status: "92.83%",
      icon: GraduationCap
    }
  ];

  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-crimson bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio Section */}
            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Passionate Developer & AI Enthusiast
              </h3>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I am a 3rd-year B.Tech CSE student at Delhi Technological University with a strong passion for 
                  <span className="text-primary font-medium"> Android Development</span> and 
                  <span className="text-primary font-medium"> Machine Learning</span>.
                </p>
                
                <p>
                  My journey in technology has led me to develop innovative mobile applications, contribute to 
                  AI-powered solutions, and gain hands-on experience as an 
                  <span className="text-primary font-medium"> Artificial Intelligence Research Intern at DTU</span>, 
                  where I worked with deep learning, clustering, and exploratory data analysis on large-scale biological datasets.
                </p>
                
                <p>
                  Beyond the technical realm, I have a deep interest in 
                  <span className="text-primary font-medium"> human psychology</span> and enjoy exploring the intersection 
                  of technology and human behavior. When I'm not coding, you'll find me reading, swimming, journaling, 
                  or enjoying movies.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Delhi, India</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Class of 2027</span>
                </div>
              </div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu, index) => {
                  const Icon = edu.icon;
                  return (
                    <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-500 group hover:shadow-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-foreground">
                              {edu.institution}
                            </h4>
                            <p className="text-muted-foreground">
                              {edu.degree}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-primary font-medium">
                                {edu.period}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {edu.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;