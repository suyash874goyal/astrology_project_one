import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  // ================= STATES =================
  const [selectedSign, setSelectedSign] = useState("aries");
  const [horoscope, setHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [customService, setCustomService] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState("");


  const navigate = useNavigate();

  const selectedMonth = new Date().toLocaleString("default", {
    month: "long",
  });


  useEffect(() => {
  const openFromFooter = (e) => {
    setPreSelectedService(e.detail.service);
    setOpenModal(true);
  };

  window.addEventListener("open-consultation", openFromFooter);

  return () => {
    window.removeEventListener("open-consultation", openFromFooter);
  };
}, []);

  // ================= DUMMY API =================
  useEffect(() => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setHoroscope(
        "Is month aapke kaam me progress dekhne ko milegi. Career me naye opportunities aa sakte hain. Financial decisions soch samajh kar lene chahiye. Family ka support bana rahega. Health generally stable rahegi. Travel ke yog ban rahe hain. Relationship me clarity aur understanding badhegi. Overall ye month balanced aur positive rahega"
      );
      setLoading(false);
    }, 700);
  }, [selectedSign]);




  return (
    <div className="bg-[#FFF8ED] text-[#2f2a25] overflow-hidden">

      {/* ================= HERO SECTION ================= */}
    <section className="relative min-h-[90vh] flex items-center px-6">
  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-orange-100 to-amber-50 animate-gradient opacity-70"></div>

  <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
    <div>
      <p className="text-sm uppercase tracking-wide text-orange-700 mb-3">
        Namaskar, main hoon
      </p>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
        Pandit Ji <br />
        <span className="text-orange-600">
          Vedic Astrologer & Spiritual Guide
        </span>
      </h1>

      <p className="text-lg mb-6 max-w-xl">
        10+ saalon ke anubhav ke saath, main Vedic Jyotish ke madhyam se kundli
        adharit margdarshan pradan karta hoon. Career, vivah, business aur
        jeevan ki samasyaon ke liye shastriya pooja aur vaidik anushthan kiye
        jaate hain. Mera uddeshya aapke jeevan me shanti, sakaratmak urja aur
        sthirata lana hai
      </p>

      <div className="flex gap-4">
        {/* ✅ UPDATED BUTTON */}
        <button
          onClick={() => navigate("/contact")}
          className="bg-[#FF9933] text-white px-7 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
        >
          Book Consultation
        </button>

        <button
          onClick={() => {
            document
              .getElementById("contact-footer")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="border border-orange-500 px-7 py-3 rounded-md font-semibold hover:bg-orange-100 transition"
        >
          Contact Now
        </button>
      </div>
    </div>

    <div className="relative flex justify-center">
      <img
        alt="Astrologer"
        className="w-[280px] md:w-[340px] object-cover drop-shadow-2xl animate-float"
      />
      <div className="absolute -z-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-50"></div>
    </div>
  </div>
</section>



{/* ================= CONSULTATION MODAL ================= */}
{openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-md p-7 relative shadow-xl">

      {/* Close */}
      <button
        onClick={() => {
          setOpenModal(false);
          setCustomService(false);
        }}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h3 className="text-2xl font-bold mb-1 text-orange-600">
        Book Consultation
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Apni details bharein, hum aapse jald sampark karenge
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();

         const serviceValue = customService
  ? e.target.customService.value
  : preSelectedService || e.target.service.value;

          const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            service: serviceValue,
          };

          console.log("Consultation Request:", formData);

          // 🔜 Backend API yahin lagegi
          setOpenModal(false);
          setCustomService(false);
        }}
        className="space-y-4"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Service Select */}

     <select
  name="service"
  value={customService ? "other" : preSelectedService}
  onChange={(e) => {
    if (e.target.value === "other") {
      setCustomService(true);
      setPreSelectedService("");
    } else {
      setCustomService(false);
      setPreSelectedService(e.target.value);
    }
  }}
  required
  className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-400"
>
  <option value="">Select Service</option>
  <option>Kundli Consultation</option>
  <option>Marriage Guidance</option>
  <option>Career & Business</option>
  <option>Online Pooja</option>
  <option value="other">Other / Custom Service</option>
</select>




        {/* Custom Service Input (Conditional) */}
        {customService && (
          <input
            type="text"
            name="customService"
            placeholder="Please describe your service"
            required
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 animate-fadeIn"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  </div>
)}







      {/* ================= HOROSCOPE SECTION ================= */}
      <section className="bg-[#0B0F1A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-400">
            Monthly Horoscope
          </h2>
          <p className="text-center text-gray-400 mt-3 mb-14">
            {selectedMonth} month ke liye apni rashi ka bhavishya dekhein
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* LEFT – ZODIAC BUTTONS */}
            <div className="bg-[#12172A] rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-semibold mb-6 text-orange-300">
                Rashi Chunein
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["aries", "Aries", "मेष"],
                  ["taurus", "Taurus", "वृषभ"],
                  ["gemini", "Gemini", "मिथुन"],
                  ["cancer", "Cancer", "कर्क"],
                  ["leo", "Leo", "सिंह"],
                  ["virgo", "Virgo", "कन्या"],
                  ["libra", "Libra", "तुला"],
                  ["scorpio", "Scorpio", "वृश्चिक"],
                  ["sagittarius", "Sagittarius", "धनु"],
                  ["capricorn", "Capricorn", "मकर"],
                  ["aquarius", "Aquarius", "कुंभ"],
                  ["pisces", "Pisces", "मीन"],
                ].map(([key, name, hi]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSign(key)}
                    className={`rounded-xl px-4 py-4 text-left transition
                      ${
                        selectedSign === key
                          ? "bg-orange-500 text-white"
                          : "bg-[#1A2038] text-gray-300 hover:bg-orange-400 hover:text-white"
                      }`}
                  >
                    <div className="text-lg font-semibold">{name}</div>
                    <div className="text-sm opacity-80">{hi}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT – RESULT */}
            <div className="md:col-span-2 bg-[#12172A] rounded-2xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-semibold text-orange-300 mb-6">
                {selectedMonth} Horoscope
              </h3>

              {/* ✅ LOADING SPINNER */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-300 text-sm">
                    Rashifal taiyaar ho raha hai…
                  </p>
                </div>
              )}

              {error && (
                <p className="text-red-400">
                  Horoscope abhi available nahi hai.
                </p>
              )}

              {!loading && !error && horoscope && (
                <ul className="space-y-4 text-gray-200 leading-relaxed">
                  {horoscope
                    .split(".")
                    .slice(0, 8)
                    .map((line, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-orange-400">✦</span>
                        <span>{line.trim()}.</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
