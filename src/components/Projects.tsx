import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Calendar, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  useScrollAnimation();
  const projects = [
    {
      title: "Flappy – Fly Above the World",
      description: "A comprehensive social media Android application featuring posts, comments, hashtags, and real-time updates. Built with modern Android architecture and clean design principles.",
      period: "Dec 2024 – Feb 2025",
      status: "Featured",
      technologies: ["Kotlin", "Appwrite", "Jetpack Compose", "MVVM", "Koin"],
      features: [
        "Social media functionality with posts & comments",
        "Real-time hashtag system",
        "Popular users discovery",
        "Personalized feed algorithm",
        "Follower/following system"
      ],
      githubUrl: "https://github.com/crimsonyash9012/Flappy",
      liveUrl: "https://drive.google.com/drive/folders/12PD3qExy46y-QRQaLFUem3z-oqrH_ZL3?usp=sharing",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "EasyCrypto – Safe Crypto Wallet",
      description: "Real-time cryptocurrency tracking and trading simulator with comprehensive portfolio management and live market data integration.",
      period: "Nov – Dec 2024",
      status: "Completed",
      technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "MVVM", "Koin", "CoinCap API"],
      features: [
        "Real-time cryptocurrency prices",
        "Interactive price charts",
        "Portfolio wallet simulation",
        "600+ coin tracking",
        "Market trends analysis"
      ],
      githubUrl: "https://github.com/crimsonyash9012/EasyCrypto",
      liveUrl: "https://drive.google.com/drive/folders/12PD3qExy46y-QRQaLFUem3z-oqrH_ZL3?usp=sharing",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Smart Trip Planner",
      description: "Cross-platform AI-powered travel planning application using advanced language models for intelligent itinerary generation and real-time recommendations.",
      period: "2025",
      status: "In Development",
      technologies: ["Flutter", "Groq LLaMA", "Google Places API", "Isar DB", "Dart"],
      features: [
        "AI-powered itinerary planning",
        "Real-time hotel/restaurant recommendations",
        "Offline storage capability",
        "Interactive maps integration",
        "Cross-platform compatibility",
        "Chat-based planning interface"
      ],
      githubUrl: "https://github.com/crimsonyash9012/smart_trip_planner_flutter",
      liveUrl: "https://drive.google.com/drive/folders/12PD3qExy46y-QRQaLFUem3z-oqrH_ZL3?usp=sharing",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="bg-gradient-crimson bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative applications showcasing my expertise in Android development, 
              cross-platform solutions, and AI integration
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
            <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-500 group hover:shadow-elegant overflow-hidden animate-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Project Info */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-2xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          {project.status === "Featured" && (
                            <Badge variant="default" className="bg-gradient-crimson text-primary-foreground">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {project.status === "In Development" && (
                            <Badge variant="secondary">
                              In Development
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{project.period}</span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button variant="hero" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                        <Button variant="outline-hero" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-section-bg p-8 border-l border-border/30">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gradient-crimson rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Project Highlight */}
                      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm text-muted-foreground italic">
                          "This project demonstrates my ability to create scalable, user-centric applications 
                          using modern development practices and cutting-edge technologies."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* More Projects CTA */}
          <div className="text-center mt-12 animate-on-scroll">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Interested in More Projects?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check out my GitHub profile for additional projects, contributions, and ongoing work.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="https://github.com/crimsonyash9012" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    View All Projects
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;