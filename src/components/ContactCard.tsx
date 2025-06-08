import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
export const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/nodiry",
    color: "hover:text-slate-700",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/nodirbek-bokiev",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/NodirbekBokiev",
    color: "hover:text-blue-400",
  },
];
const ContactCard = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Connect With Me</CardTitle>
        <CardDescription>Find me on these platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </Button>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
