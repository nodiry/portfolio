import { Mail, Phone, MapPin, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactCard from "@/components/ContactCard";
import { handleGoBack } from "@/lib/utils";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "worknadir95@gmail.com",
      href: "mailto:worknadir95@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+82 (10) 8173 7778",
      href: "tel:+821081737778",
    },
    {
      icon: MapPin,
      label: "Sasang, Busan, South Korea",
      value: "Remote / Available Worldwide",
      href: null,
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Usually within 24 hours",
      href: null,
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 mt-16">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="flex items-center gap-2 ml-16 top-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Work Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to build something amazing? Drop me a message and let's
              discuss your next project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Here's how you can reach me directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </CardContent>
            </Card>
            <div className="space-y-8">
              <ContactCard />

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Tech Stack</CardTitle>
                  <CardDescription>Technologies I work with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "TypeScript",
                      "Rust",
                      "Bun.js",
                      "React",
                      "MongoDB",
                      "PostgreSQL",
                      "Memcached",
                      "Ubuntu",
                      "Debian",
                    ].map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
