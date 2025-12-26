import React from 'react';
import { Linkedin, Github, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <p>© 2025 Designed & Developed by <strong>Aswanth Allu</strong></p>
      
      <div className="social-icons">
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/jaya-aswanth-allu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>

        {/* GitHub */}
        <a href="https://github.com/AswanthAllu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={20} />
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/qr/SYBINZD7FXYKB1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <MessageCircle size={20} />
        </a>

        {/* Mail */}
        <a href="mailto:aswanthallu23@gmail.com" aria-label="Mail">
          <Mail size={20} />
        </a>
      </div>
    </footer>
  );
}