import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service_interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await base44.entities.ContactSubmission.create({
      ...form,
      status: 'new',
    });

    // Also send email notification
    await base44.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `New Contact Form: ${form.name} - ${form.company || 'No company'}`,
      from_name: 'Fahrenheit Website',
      body: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Company:</strong> ${form.company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${form.service_interest || 'General'}</p>
        <p><strong>Message:</strong></p>
        <p>${form.message || 'No message provided'}</p>
      `,
    });

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-normal mb-4">Thank You</h1>
          <p className="text-muted-foreground leading-relaxed">
            We've received your message and will be in touch within 24 hours. In the meantime, feel free to chat with our AI assistant for immediate answers.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Info */}
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Get In Touch
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8">
              Let's Discuss Your <span className="italic text-accent">Growth</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-xl font-body">
              No sales pitch. No pressure. Just an honest conversation about your business goals and how AI-powered marketing can help you achieve them. Month-to-month, starting at $1,500.
            </p>
            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Based In</p>
                  <p className="text-muted-foreground text-sm">Austin, Texas — Serving Clients Globally</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Call Us</p>
                  <a href="tel:512-206-4220" className="text-muted-foreground text-sm hover:text-foreground transition-colors">512-206-4220</a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <img
                src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
                alt=""
                aria-hidden="true"
                className="w-72 opacity-90 select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <div className="lg:hidden mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-normal leading-[1.05] mb-3">
                Let's Discuss Your <span className="italic text-accent">Growth</span>
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                No sales pitch. Just an honest conversation about your goals.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name *</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Company</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Service Interest</label>
                <Select
                  value={form.service_interest}
                  onValueChange={(v) => setForm({ ...form, service_interest: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What are you interested in?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-development">Software Development</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="sem">SEM / PPC</SelectItem>
                    <SelectItem value="smm">Social Media Marketing</SelectItem>
                    <SelectItem value="cro">Conversion Rate Optimization</SelectItem>
                    <SelectItem value="strategy">Strategic Planning</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your goals..."
                  className="min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full font-body gap-2"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}