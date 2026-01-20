import { useEffect, useState } from "react";

/* ================= FIXED TESTIMONIALS ================= */
const fixedTestimonials = [
  {
    name: "Amit Sharma",
    city: "Delhi",
    review:
      "Pandit Ji ki guidance se mere career aur personal life dono me clarity aayi.",
    rating: 5,
  },
  {
    name: "Neha Verma",
    city: "Lucknow",
    review:
      "Vivah aur kundli consultation ke liye best experience raha.",
    rating: 5,
  },
  {
    name: "Rohit Mishra",
    city: "Prayagraj",
    review:
      "Mangal dosh shanti ke baad ghar me positive energy mehsoos hui.",
    rating: 4,
  },
  {
    name: "Pooja Singh",
    city: "Indore",
    review:
      "Online pooja aur consultation dono hi smooth aur trustworthy rahe.",
    rating: 5,
  },
];

/* ================= STORAGE CONFIG ================= */
const STORAGE_KEY = "panditji_user_reviews";
const EXPIRY_TIME = 48 * 60 * 60 * 1000; // 48 hours

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  /* ================= LOAD & CLEANUP REVIEWS ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const now = Date.now();

    const validReviews = saved.filter(
      (r) => now - r.time < EXPIRY_TIME
    );

    setReviews(validReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validReviews));
  }, []);

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = () => {
    if (!name || !city || !reviewText) return;

    const newReview = {
      name,
      city,
      review: reviewText,
      rating,
      time: Date.now(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));

    setName("");
    setCity("");
    setReviewText("");
    setRating(5);
  };

  const allTestimonials = [...reviews, ...fixedTestimonials];

  return (
    <section className="bg-[#FFF6E8] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2f2a25]">
            Yajmaans <span className="text-[#8B5A2B]">Experience</span>
          </h2>
          <p className="text-[#5c554c]">
            Real experiences shared by people who consulted Pandit Ji.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[280px] bg-[#3a332b] text-[#F5EFE7]
                         rounded-2xl p-6 shadow-lg"
            >
              {/* PROFILE */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br
                             from-[#E6B17E] to-[#c89b6a]
                             text-[#2f2a25] flex items-center
                             justify-center font-bold text-lg"
                >
                  {t.name.charAt(0)}
                </div>

                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs opacity-70">{t.city}</div>
                </div>
              </div>

              {/* STARS */}
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`text-lg ${
                      s <= t.rating
                        ? "text-[#E6B17E]"
                        : "text-white/30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* REVIEW */}
              <p className="text-sm opacity-90 leading-relaxed">
                “{t.review}”
              </p>
            </div>
          ))}
        </div>

        {/* ================= REVIEW FORM ================= */}
        <div
          className="max-w-2xl mx-auto mt-16 bg-[#2f2a25]
                     text-[#F5EFE7] rounded-2xl p-10 shadow-xl"
        >
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Share Your Experience
          </h4>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-[#3a332b] rounded-xl px-4 py-3 mb-4
                       focus:outline-none focus:ring-2
                       focus:ring-[#E6B17E]"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Your City"
            className="w-full bg-[#3a332b] rounded-xl px-4 py-3 mb-4
                       focus:outline-none focus:ring-2
                       focus:ring-[#E6B17E]"
          />

          {/* STAR INPUT */}
          <div className="flex justify-center mb-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                className={`text-3xl mx-1 transition-transform ${
                  s <= (hover || rating)
                    ? "text-[#E6B17E] scale-110"
                    : "text-white/30"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your experience..."
            className="w-full bg-[#3a332b] rounded-xl p-4 mb-6
                       focus:outline-none focus:ring-2
                       focus:ring-[#E6B17E]"
          />

          <button
            onClick={submitReview}
            className="w-full bg-gradient-to-r
                       from-[#E6B17E] to-[#c89b6a]
                       text-[#2f2a25] py-3 rounded-xl
                       font-semibold transition"
          >
            Submit Review
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
