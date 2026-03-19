import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    details: ["Kampala, Uganda"],
    description: "Visit us for in-person consultations",
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    details: ["+256 700 000 000"],
    description: "Call or WhatsApp for quick responses",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@enidpath.com"],
    description: "For detailed enquiries and documentation",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
    description: "We're here to help",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your enquiry! We will get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Ready to start your educational journey? Get in touch with our team for personalised guidance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+256 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your educational goals and how we can assist you..."
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of the following channels. We're here to help!
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div 
                    key={info.title}
                    className="flex gap-4 p-6 bg-muted rounded-lg"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="text-foreground font-medium">{detail}</p>
                      ))}
                      <p className="text-muted-foreground text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <MessageCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quick Response via WhatsApp</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      For faster responses, reach out to us on WhatsApp. We typically respond within minutes during office hours.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <p className="text-muted-foreground max-w-2xl">
              <span className="font-semibold text-foreground">EnidPath International</span> is an authorised recruitment and student support partner of Online Business School (UK). We provide guidance and support services—all academic programmes are delivered by OBS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
