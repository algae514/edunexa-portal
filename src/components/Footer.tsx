import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-background">FutureOS</div>
            <p className="text-background/80 text-sm">
              Empowering faculty and students through structured learning programmes and innovative educational experiences.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-background/60 hover:text-background cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/60 hover:text-background cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/student-programmes" className="text-background/80 hover:text-background transition-colors">
                  Student Programmes
                </Link>
              </li>
              <li>
                <Link to="/faculty-development" className="text-background/80 hover:text-background transition-colors">
                  Faculty Development
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-background/80 hover:text-background transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-background/80 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/80 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-background">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-background/60" />
                <span className="text-background/80">support@futureos.live</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-background/60" />
                <span className="text-background/80">+91 9701961736</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-background/60" />
                <span className="text-background/80">Banglore, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} FutureOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;