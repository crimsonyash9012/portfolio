import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Shield, 
  Code, 
  Palette, 
  Database, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  useScrollAnimation();
  const services = [
    {
      icon: Smartphone,
      title: "Android App Development",
      description: "Full-stack Android applications with modern UI/UX design, secure authentication, and seamless user experience.",
      features: [
        "Native Android development with Kotlin",
        "Jetpack Compose for modern UI",
        "MVVM architecture implementation",
        "Material Design 3 guidelines",
        "Performance optimization"
      ],
      technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Material Design"],
    },
    {
      icon: Code,
      title: "Cross-Platform Development",
      description: "Build once, run everywhere. Flutter applications that work seamlessly across Android, iOS, Web, and Desktop.",
      features: [
        "Single codebase for multiple platforms",
        "Beautiful, responsive UI design",
        "Native performance optimization",
        "Platform-specific features integration",
        "Offline-first architecture"
      ],
      technologies: ["Flutter", "Dart", "Firebase", "REST APIs"],
    },
    {
      icon: Database,
      title: "Backend & API Integration",
      description: "Robust backend solutions with secure APIs, real-time features, and scalable database architecture.",
      features: [
        "RESTful API development",
        "Real-time data synchronization",
        "Secure authentication systems",
        "Database design & optimization",
        "Cloud integration (Firebase/Appwrite)"
      ],
      technologies: ["Firebase", "Appwrite", "REST APIs", "NoSQL"],
    },
    {
      icon: Shield,
      title: "App Security & Testing",
      description: "Comprehensive security auditing, testing, and implementation of best practices for mobile applications.",
      features: [
        "Security vulnerability assessment",
        "Data encryption implementation",
        "Authentication security review",
        "API security testing",
        "Performance testing"
      ],
      technologies: ["Security Testing", "Encryption", "OAuth", "JWT"],
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="bg-gradient-crimson bg-clip-text text-transparent">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional app development services with a focus on quality, 
              performance, and user experience
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-card border-border/30 hover:bg-card-hover transition-all duration-300 group hover:shadow-elegant">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-crimson rounded-xl flex items-center justify-center shadow-crimson/50">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline-hero" className="w-full group" onClick={scrollToContact}>
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss your ideas and create something amazing together. 
                  I'm committed to delivering high-quality solutions that exceed your expectations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" onClick={scrollToContact}>
                    <Zap className="h-5 w-5 mr-2" />
                    Start Your Project
                  </Button>
                  <Button variant="outline-hero" size="lg" asChild>
                    <a href="mailto:yashkrgola9012@gmail.com">
                      Schedule a Call
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;