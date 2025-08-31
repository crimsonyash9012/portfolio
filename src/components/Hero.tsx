import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-nM45AYjaUCpjamRKehntczJR/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full opacity-60"
          title="3D Background Design"
        />
      </div>
      
      {/* Background mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 z-1"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-15 animate-float-slow z-2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-glow opacity-10 animate-float-slow z-2" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-glow opacity-8 animate-float z-2" style={{ animationDelay: "4s" }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-8">
            <h1 className="font-outlined text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight animate-fade-in-up">
              <span className="bg-gradient-crimson bg-clip-text text-transparent animate-fade-in-up">Yash kumar golA</span>
            </h1>
            
            <p className="font-bytebounce text-lg sm:text-xl md:text-2xl text-muted-foreground font-light animate-fade-in-up stagger-delay-3">
              Android Developer  •  Machine Learning Enthusiast
            </p>
            
            <p className="font-bytebounce text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-delay-4 px-4">
              Passionate B.Tech CSE student at DTU crafting innovative Android applications 
              and exploring the frontiers of Machine Learning
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up stagger-delay-5 px-4">
              <Button variant="hero" size="lg" onClick={scrollToContact} className="hover:shadow-glow">
                Get In Touch
              </Button>
              <Button variant="outline-hero" size="lg" onClick={scrollToAbout} className="hover:shadow-glow">
                Learn More
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 sm:space-x-6 pt-8 animate-fade-in-up stagger-delay-6">
              <a 
                href="https://github.com/crimsonyash9012" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-500 hover:shadow-crimson"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/yash-kumar-gola-480940282" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-500 hover:shadow-crimson"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a 
                href="mailto:yashkrgola9012@gmail.com"
                className="p-2 sm:p-3 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-500 hover:shadow-crimson"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;