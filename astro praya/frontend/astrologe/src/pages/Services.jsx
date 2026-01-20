import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Testimonials";


/* ================= HERO IMAGES ================= */
import hero1 from "../assets/images/pexels-bhavitya-19816646.jpg";
import hero2 from "../assets/images/pexels-debargha-bhattacharya-1376058906-25951162.jpg";
import hero3 from "../assets/images/pexels-soubhagya23-18887239.jpg";
import hero4 from "../assets/images/pexels-neha-mishra-1851906907-28573931.jpg";

/* ================= SERVICES DATA ================= */
const services = [
  { title: "Kundli Consultation", desc: "Janam kundli ke madhyam se jeevan ke har pehlu ka vishleshan.", icon: "📜" },
  { title: "Marriage Guidance", desc: "Vivah, love life aur match-making ke liye satik margdarshan.", icon: "💍" },
  { title: "Career & Business", desc: "Career growth, business decisions aur financial stability.", icon: "📈" },
  { title: "Mangal Dosh Shanti", desc: "Mangal dosh nivaran ke liye vishesh pooja aur upaay.", icon: "🔥" },
  { title: "Kaal Sarp Dosh Shanti", desc: "Kaal sarp dosh se mukti ke liye shastriya anushthan.", icon: "🐍" },
  { title: "Ark Vivaah", desc: "Manglik dosh nivaran ke liye Ark Vivaah shastriya vidhi se.", icon: "🌿" },
  { title: "Vivah Sanskar", desc: "Shubh muhurat aur vaidik vidhi se vivah sanskar.", icon: "💒" },
  { title: "Navgrah Shanti", desc: "Navgrahon ke dosh nivaran aur shanti poojan.", icon: "🌟" },
  { title: "Rahu Shanti", desc: "Rahu grah ke prabhav ko shaant karne ke liye pooja.", icon: "🌑" },
  { title: "Shani Shanti", desc: "Shani dosh aur sade-sati ke liye vishesh upaay.", icon: "🪐" },
  { title: "Mahamritunjay Jaap", desc: "Health, protection aur longevity ke liye jaap.", icon: "🔱" },
  { title: "Navchandi / Shatchandi Paath", desc: "Shakti upasana ke liye vishesh paath aur poojan.", icon: "⚔️" },
];

const heroImages = [hero1, hero2, hero3, hero4];

const Services = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);

  /* ================= IMAGE LOOP ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#FFF6E8] text-[#2f2a25] px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* ================= HERO ================= */}
        <section className="relative min-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              backgroundImage: `url(${heroImages[currentImg]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#F5EFE7]">
              Our <span className="text-[#E6B17E]">Sacred Services</span>
            </h1>

            <p className="text-lg md:text-xl text-[#EADFCC] leading-relaxed">
              Paramparik Vedic astrology, pooja aur shastriya anushthan —  
              vishwas aur anubhav ke saath.
            </p>
          </div>
        </section>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#3b342c] rounded-3xl p-8 text-center
                         border border-white/5 hover:border-[#c49a6c]
                         hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-5">{service.icon}</div>

              <h3 className="text-xl font-semibold mb-3 text-[#F5EFE7]">
                {service.title}
              </h3>

              <p className="text-[#d7cfc6] text-sm mb-6 leading-relaxed">
                {service.desc}
              </p>

              <button
                onClick={() => navigate(`/contact?service=${service.title}`)}
                className="bg-gradient-to-r from-[#E6B17E] to-[#c89b6a]
                           hover:from-[#d8a56f] hover:to-[#b88b5b]
                           text-[#2f2a25]
                           px-6 py-3 rounded-xl font-semibold
                           transition shadow-md"
              >
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        {/* ================= CONSULT CTA ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <p className="text-[#5c554c] text-lg">
            ✨ <span className="text-[#8B5A2B] font-semibold">And many more…</span>
            <br />
            Aap apni samasya ke anusaar pooja, jaap aur anushthan customize kar sakte hain.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="bg-[#2f2a25] hover:bg-[#1f1b17]
                       text-[#F5EFE7]
                       px-12 py-4 rounded-xl
                       font-semibold text-lg
                       transition shadow-lg"
          >
            Consult Yourself
          </button>
        </div>

<Testimonials></Testimonials>


      </div>
    </section>
  );
};

export default Services;
