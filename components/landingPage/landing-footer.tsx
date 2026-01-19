export default function Footer() {
    return (
      <footer className="bg-[#191A1E] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in">
              <h4 className="text-2xl font-bold text-[#E7E5DB] italic mb-4">
                FIX Padel
              </h4>
              <p className="text-[#AD9E89]">
                Premium padel courts for passionate players.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h5 className="font-bold mb-4 text-[#E7E5DB]">Quick Links</h5>
              <div className="space-y-2 text-[#AD9E89]">
                <div>
                  <a
                    href="#"
                    className="hover:text-[#E7E5DB] transition-colors duration-300"
                  >
                    About Us
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="hover:text-[#E7E5DB] transition-colors duration-300"
                  >
                    Courts
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="hover:text-[#E7E5DB] transition-colors duration-300"
                  >
                    Pricing
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="hover:text-[#E7E5DB] transition-colors duration-300"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h5 className="font-bold mb-4 text-[#E7E5DB]">Contact</h5>
              <div className="space-y-2 text-[#AD9E89]">
                <div>Jakarta, Indonesia</div>
                <div>+62 123 456 7890</div>
                <div>info@fixpadel.com</div>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h5 className="font-bold mb-4 text-[#E7E5DB]">Hours</h5>
              <div className="space-y-2 text-[#AD9E89]">
                <div>Mon - Fri: 6AM - 10PM</div>
                <div>Sat - Sun: 7AM - 11PM</div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#564838] pt-8 text-center text-[#AD9E89]">
            <p>© 2026 FravoxLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }