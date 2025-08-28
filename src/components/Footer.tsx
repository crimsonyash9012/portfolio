import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/crimsonyash9012",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yash-kumar-gola-480940282",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:yashkrgola9012@gmail.com",
      label: "Email"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-section-bg border-t border-border/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-crimson rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">YKG</span>
                </div>
                <span className="text-xl font-bold text-foreground">Yash Kumar Gola</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Passionate Android Developer and Machine Learning Enthusiast from DTU, 
                crafting innovative mobile applications and AI-powered solutions.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Get In Touch</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a 
                    href="mailto:yashkrgola9012@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    yashkrgola9012@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="text-foreground">Delhi, India</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Availability</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 text-sm">Available for projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border/20">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>© {currentYear} Yash Kumar Gola. Made with</span>
                <Heart className="h-4 w-4 text-primary animate-pulse" />
                <span>and React</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;