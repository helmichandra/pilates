import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
export const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-black mb-4 text-red-500">Fixclub.</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A boutique wellness studio focused on posture correction and physical empowerment through specialized movement.
              </p>
              <div className="mt-6">
                <a href="#" className="inline-block hover:opacity-80 transition">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-red-500 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
                <li><a href="#facility" className="text-gray-400 hover:text-white transition">Facility</a></li>
                <li><a href="#booking" className="text-gray-400 hover:text-white transition">Booking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-red-500 text-sm uppercase tracking-wide">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="flex-shrink-0 mt-0.5 text-red-500" />
                  <span className="text-gray-400">Sudirman District, Jakarta Selatan 12190, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-red-500" />
                  <span className="text-gray-400">+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-red-500" />
                  <span className="text-gray-400">hello@fixclub.id</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 Fixclub Studio. All rights reserved.</p>
            <p>Design for Wellness Registration Purpose</p>
          </div>
        </div>
      </footer>
    );
  };