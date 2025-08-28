import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  Clock,
  CheckCircle
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // EmailJS credentials (consider moving to environment variables)
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY || "";
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVUCE_ID || "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID || "";

  // Initialize EmailJS once
  // if (!emailjs) {
   
  // }

  useEffect(()=>{
    console.log("key is", EMAILJS_PUBLIC_KEY);
    
    emailjs.init(EMAILJS_PUBLIC_KEY);
    // Mark as initialized to avoid re-init on re-renders
    // @ts-ignore
    emailjs._init = true;
  },[EMAILJS_PUBLIC_KEY])

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "yashkrgola9012@gmail.com",
      href: "mailto:yashkrgola9012@gmail.com"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Delhi, India",
      href: "#"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/crimsonyash9012",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      name: "LinkedIn", 
      href: "https://linkedin.com/in/yash-kumar-gola-480940282",
      color: "hover:text-blue-400"
    },
    {
      icon: Mail,
      name: "Email",
      href: "mailto:yashkrgola9012@gmail.com",
      color: "hover:text-primary"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or email me directly at yashkrgola9012@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="bg-gradient-crimson bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-crimson mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and 
              create something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card border-border/30 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background border-border/30 focus:border-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background border-border/30 focus:border-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-background border-border/30 focus:border-primary"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-background border-border/30 focus:border-primary resize-none"
                      placeholder="Tell me about your project, timeline, and requirements..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-card border-border/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">
                              {info.title}
                            </h4>
                            {info.href !== "#" ? (
                              <a 
                                href={info.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.value}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-card border-border/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Connect With Me
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center p-4 bg-background rounded-lg border border-border/30 hover:bg-card-hover hover:border-primary/30 transition-all duration-300 group"
                        >
                          <Icon className={`h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors ${social.color}`} />
                          <span className="text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                            {social.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="bg-gradient-to-r from-green-500/10 to-primary/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        Available for New Projects
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Currently accepting new client projects and collaborations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;