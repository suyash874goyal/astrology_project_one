import { useState } from "react";
import { useLocation } from "react-router-dom";
import img2 from "../assets/images/pexels-being-the-traveller-579914-2619724.jpg";

// ✅ API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const location = useLocation();
  const preSelectedService = location.state?.service || "";

  const [customService, setCustomService] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Safe service handling (backend compatible)
    const serviceValue = customService
      ? e.target.customService.value.trim()
      : (e.target.service.value || preSelectedService).trim();

    const payload = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
      service: serviceValue,
      message: e.target.message.value.trim(),
    };

    // 🔒 Frontend phone validation (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(payload.phone)) {
      showPopup("error", "Please enter a valid Indian mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      showPopup("success", data.message || "Message sent successfully");
      e.target.reset();
      setCustomService(false);
    } catch (error) {
      showPopup("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= POPUP ================= */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm text-center shadow-2xl">
            <h4
              className={`text-xl font-bold mb-2 ${
                popup.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {popup.type === "success" ? "Success ✅" : "Error ⚠️"}
            </h4>
            <p className="text-gray-600 text-sm">{popup.message}</p>
          </div>
        </div>
      )}

      {/* ================= CONTACT SECTION ================= */}
      <section className="bg-[#FFF8ED] min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT IMAGE */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[500px]">
            <img
              src={img2}
              alt="Contact Pandit Ji"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Contact Us
              </h1>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-[#8B5A2B] mb-2">
              Contact & Consultation
            </h2>
            <p className="text-gray-500 mb-6">
              Apni details bharein, hum aapse jald sampark karenge.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number (India)"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
              />

              <select
                name="service"
                defaultValue={preSelectedService}
                onChange={(e) => setCustomService(e.target.value === "other")}
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
              >
                <option value="">Select Service</option>
                <option>Kundli Consultation</option>
                <option>Marriage Guidance</option>
                <option>Career & Business</option>
                <option>Online Pooja</option>
                <option value="other">Other / Custom Service</option>
              </select>

              {customService && (
                <input
                  type="text"
                  name="customService"
                  placeholder="Describe your service"
                  required
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
                />
              )}

              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#8B5A2B]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2f2a25] text-white py-3 rounded-xl font-semibold hover:bg-[#1f1b17] transition"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
