import { useEffect, useRef, useState } from "react";

import img1 from "../assets/images/imagefirst.jpg";
import img2 from "../assets/images/imagesecond.jpg";
import img3 from "../assets/images/imagethird.jpg";
import vids from "../assets/images/8811121-hd_1920_1080_25fps.mp4";

/* ================= ONE-TIME COUNTER ================= */
const Counter = ({ end, start }) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;

    hasRun.current = true;
    let current = 0;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 30));

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(timer);
  }, [start, end]);

  return <span>{count}</span>;
};

const About = () => {
  /* ================= IMAGE SLIDER ================= */
  const images = [img1, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ================= STATS TRIGGER ================= */
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#FFF8ED] text-[#2f2a25] py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-orange-600">Pandit Ji</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            With years of experience in astrology and sacred rituals, Pandit Ji helps people
            solve life problems through authentic Vedic knowledge and spiritual guidance.
          </p>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Pandit Ji – Vedic Astrologer
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Paramparik Vedic gyaan aur adhyatmik anubhav ke saath,
                Pandit Ji logon ko jeevan ke kathin nirnayon me sahi disha pradan karte hain.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">
              10+ Years of Experience in Vedic Astrology
            </h2>
            <p className="text-gray-700 mb-5">
             पंडित जी ने उज्जैन जैसी पावन धार्मिक नगरी से वैदिक ज्योतिष एवं कर्मकांड की विधिवत शिक्षा प्राप्त की है।
उन्हें वेद, पुराण, ज्योतिष शास्त्र तथा ग्रह-नक्षत्रों का गहन और शास्त्रीय ज्ञान प्राप्त है।
वर्षों के साधना-अनुभव के माध्यम से पंडित जी ने कुंडली विश्लेषण, विवाह, करियर एवं जीवन संबंधी समस्याओं में लोगों को सटीक मार्गदर्शन प्रदान किया है।
पंडित जी सभी पूजन, अनुष्ठान एवं वैदिक कर्मकांड शुद्ध विधि और पूर्ण श्रद्धा के साथ संपन्न करते हैं।
उनकी ज्योतिषीय सेवाएँ सत्यता, गोपनीयता और विश्वास पर आधारित हैं।
देश-विदेश के असंख्य यजमान पंडित जी की विद्वत्ता और सरल स्वभाव से लाभान्वित हुए हैं।
आज पंडित जी अपनी प्रामाणिक वैदिक परंपरा और निष्काम सेवा भाव के लिए विशेष रूप से प्रसिद्ध हैं।
            </p>
           
          </div>
        </div>

        {/* ================= WHY CHOOSE ================= */}
        <section
          ref={statsRef}
          className="bg-gradient-to-b from-[#FFF3E0] to-[#FFF8ED] py-24 px-6 rounded-3xl"
        >
          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-orange-600">Pandit Ji</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Bharose, anubhav aur shastriya gyaan ke saath satik margdarshan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                ["🔯", "Authentic Vedic Knowledge"],
                ["🧘", "Spiritual & Practical Balance"],
                ["🤝", "Trusted by Thousands"],
                ["🕉️", "Powerful Remedies"],
                ["🔒", "100% Privacy"],
                ["⭐", "Honest Guidance"],
              ].map(([icon, title], i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition"
                >
                  <div className="text-5xl mb-5 animate-float">{icon}</div>
                  <h4 className="text-xl font-semibold mb-3">{title}</h4>
                  <p className="text-gray-600 text-sm">
                    Trusted, ethical aur result-oriented approach.
                  </p>
                </div>
              ))}
            </div>

            {/* ===== STATS (GAP REDUCED) ===== */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-orange-600">
                  <Counter end={10} start={startCount} />+
                </h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-orange-600">
                  <Counter end={2500} start={startCount} />+
                </h3>
                <p className="text-gray-600">Happy Consultations</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-orange-600">
                  <Counter end={100} start={startCount} />%
                </h3>
                <p className="text-gray-600">Trust & Privacy</p>
              </div>
            </div>

          </div>
        </section>

        {/* ===== SMALL DIVIDER ===== */}
        <div className="mt-6">
          <div className="h-10 w-full bg-gradient-to-b from-[#2f2a25]/10 to-transparent rounded-t-3xl" />
        </div>

        {/* ================= CTA (GAP REDUCED) ================= */}
        <section className="relative mt-8 rounded-3xl overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={vids} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 py-24 px-6 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Kya aap apne jeevan ka sahi marg jaanna chahte hain?
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Aaj hi consultation book karein aur apne prashno ke
              satik, shastriya aur vishwasniya uttar paayein.
            </p>
            <a
              href="/contact"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-lg"
            >
              Book Consultation
            </a>
          </div>
        </section>

      </div>
    </section>
  );
};

export default About;
