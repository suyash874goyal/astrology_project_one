import { Link, useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      id="contact-footer"
      className="bg-[#0B0F1A] text-gray-300 pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <span className="text-xl font-bold tracking-wide">
            Shree<span className="text-[#E6B17E]">Jyotish</span>Kendra
          </span>
          <p className="text-sm leading-relaxed text-gray-400 mt-8">
            Vedic Astrology aur spiritual guidance ke madhyam se
            jeevan ki samasyaon ka satik aur vishwasniya samadhan.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
            <li><Link to="/services" className="hover:text-orange-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              "Kundli Consultation",
              "Marriage Guidance",
              "Career & Business",
              "Online Pooja",
            ].map((service) => (
              <li
                key={service}
                onClick={() =>
                  navigate("/contact", { state: { service } })
                }
                className="cursor-pointer hover:text-orange-400 transition"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact
          </h4>

          <ul className="space-y-4 text-sm">

            {/* Phone */}
            <li className="flex items-center gap-3 hover:text-orange-400 transition">
              <FaPhoneAlt className="text-orange-400" />
              <a href="tel:+917089345675">
                +91 7089345675
              </a>
            </li>

            {/* WhatsApp */}
            <li className="flex items-center gap-3 hover:text-orange-400 transition">
  <FaWhatsapp className="text-green-400" />
  <a
    href="https://wa.me/917089345675"
    target="_blank"
    rel="noreferrer"
    className="flex flex-col leading-tight"
  >
    <span>WhatsApp Chat</span>
    <span className="text-xs font-semibold animate-pulse
                     text-green-400
                     transition-all duration-500">
      (अभी संपर्क करें)
    </span>
  </a>
</li>

            {/* Instagram */}
            <li className="flex items-center gap-3 hover:text-orange-400 transition">
              <FaInstagram className="text-pink-500" />
              <a
                href="https://instagram.com/panditji"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3 hover:text-orange-400 transition">
              <FaEnvelope className="text-orange-300" />
              <a href="mailto:contact@panditji.com">
                contact@panditji.com
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>© {new Date().getFullYear()} ShreeJyotishKendra. All rights reserved.</p>
        <div className="flex gap-6">
       <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

