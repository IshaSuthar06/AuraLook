"use client";

import React, { useEffect } from "react";

export default function AryanShaktiPage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroImage = document.querySelector(".hero-image");

      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] overflow-x-hidden font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Manrope:wght@400;600&display=swap");

        body {
          font-family: "Manrope", sans-serif;
        }

        .font-display {
          font-family: "Libre Caslon Text", serif;
        }

        .glass-card {
          background: rgba(251, 249, 244, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 0.5px solid rgba(115, 92, 0, 0.1);
        }

        .ritual-shape {
          border-radius: 60% 40% 70% 30% / 40% 50% 60% 40%;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-on-scroll.visible {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>



      <main className="">
        {/* HERO */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnkSwhxJlv5JB8yBdumgDSSWUEXBYorimPxJizLt5azQkR6MxaVPBA4-uRaxwuJqFri_jdl4IwGJIY_rOeWHY-zF_2BhzPPy2IbeVZr3ZLgSADEqHvWjCpz_iZMchXF_PkQ2Uho4EKNKOqwrvpdr_NYXyZ37D2AyMQNzVgkEmlPwpG8Dt4wdpbxG4yY7yZxutFuw-eqMM2g8J1mT1O0Zzcd3zpj7b9EWwWqyq8tTyvH6xLJR6hU1Bjpx6IDal8aMASHuGGjtDhRHE7"
              alt="Ayurvedic Ritual"
              className="hero-image w-full h-full object-cover scale-105"
            />

            <div className="absolute inset-0 bg-[#002b02]/20 backdrop-brightness-75" />
          </div>

          <div className="relative z-10 text-center px-4">
            <h2 className="font-display text-5xl lg:text-7xl text-white mb-6 animate-on-scroll leading-tight">
              Ancient Rituals,
              <br />
              Modern Sanctuary
            </h2>

            <div className="w-12 h-1 bg-[#ffe088] mx-auto mb-8"></div>

            <p className="text-lg lg:text-xl text-white/90 max-w-xl mx-auto italic">
              A curated path to holistic balance through botanical alchemy and
              mindfulness.
            </p>
          </div>
        </section>

        {/* DOSHA CTA */}
        <section className="px-6 lg:px-16 py-24 max-w-[1280px] mx-auto">
          <div className="glass-card rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 animate-on-scroll">
            <div className="w-full lg:w-1/2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJtTOM73V7GZdmutgHDgyh4GqT0x7LldApaQMvQPZXeAgjVXYEbnUy-up6rQFkZ08jgg4pctyvZ44tvh8ilAGRv-knvAZOyqZzSekEMB40qk5sjth_9NaKCMPcIeUtTMZBT70D0Kld7YqQT48Mv7t-fdBbeBctVoS23l0MxaDLZ_sChlrnLoSd94zqCzABaJdfV0NXQAV9NsdaweCTvTzpGtEbqnnzotWIVfsQtlGWGUF2ZcHARw-80XoKCYvQItqnTrlYv0egvDPV"
                alt="Dosha"
                className="ritual-shape w-full aspect-square object-cover shadow-2xl"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#735c00]">
                Discovery
              </span>

              <h3 className="font-display text-4xl text-[#002b02]">
                Unveil Your True Nature
              </h3>

              <p className="text-[#42493e] leading-8">
                Each individual is a unique composition of Vata, Pitta, and
                Kapha. Our diagnostic ritual helps align your daily practices
                with your elemental blueprint.
              </p>

              <button className="bg-[#002b02] text-white px-10 py-4 rounded-full uppercase tracking-[0.1em] hover:scale-105 active:scale-95 transition-all">
                Find Your Dosha
              </button>
            </div>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section className="bg-[#f5f3ee] md:py-15 overflow-hidden">
          <div className="px-6 lg:px-16 max-w-[1280px] mx-auto">
            <div className="text-center mb-20 animate-on-scroll">
              <h2 className="font-display text-5xl lg:text-6xl text-[#002b02] mb-4">
                Curated Collections
              </h2>

              <p className="text-[#42493e]">
                Guided sequences for your daily rhythms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "The Morning Surya Ritual",
                  desc: "Energizing & skin brightening. Awaken your inner fire and solar energy.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWvPVGVcPUTSipms_CVKpnlnuI4WnHDQorqK9k8oi5YsIlg45_oTMnc63tMVEPDosuyPW2G0TCpILi2sLJKI3MxGIonl0cRkZ7_GhaKHR64NewKbAagwH4YVOk2uqRLf5GvevpF7N4BBq5-e1oC93OCdt7aWqYge34-PmbCxVgubJMr6FtH6rq69SsGiggaNKiTZJYejXxmyXkLMjAU4sRf_VhcitsmpjK-83osQITVFAdU9OzjIbcDNorLrlOQX70QPtik7QFv8S",
                },
                {
                  title: "The Midday Balance",
                  desc: "Immunity & focus. Regain your equilibrium during the height of the day.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwrz2bQlt2pRqKxqI5hjOjG9ng9zLLx7Sd0Lbxq45-0lnAN97Zu04o-3fnSzt1IQgOaKjr6B927EfWuM3wo8wRVpWhAbL_cQILNe6X--l7KTBqYTDi-Mx8mdNPDXT1Wy1o_Hj1imNR5K0iBUXbb15QG5uL0YcVCdrqHdn_7g0_eX0a5K0WPPdgovD6jBIJoNTB5f62dm88LNYIslqxkhXCbrkZFhBX-VLNkRdLu_wLkk6uol8PfjirdaASlU8Idx6nicwaTFOjj-wG",
                },
                {
                  title: "The Evening Nidra Ritual",
                  desc: "Calming & sleep. Surrender the day's weight and drift into restoration.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_8UHAuVWJCbnz41iCog_W_F6JhtQWCBd7ezdhhla21YCHp72CO0KLFWdNX2VKDcOWKcwECNEKr8BffmOC-k-vGfnXNrBJmR3-iTp_3GTcHetA1IO4crfXiidP3pBOCw1zCewii_18YAowqmLPCcDSX9W6CHfbthQ8UaTiIg9j6ZU_VyGbcLPfepyvptwChZ8jqSx6HvEqd-cYWYUqyg9nhhnMxCqtJp-n71KN5moSeN9B-2uqQB3NHRq3mdcga0Lsiaftbf8hPLPS",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer animate-on-scroll"
                >
                  <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-2xl">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#002b02]/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white uppercase tracking-[0.1em]">
                        Explore Ritual →
                      </span>
                    </div>
                  </div>

                  <h4 className="font-display text-3xl text-[#002b02] mb-2">
                    {item.title}
                  </h4>

                  <p className="text-[#42493e] mb-4">{item.desc}</p>

                  <div className="h-[1px] w-0 bg-[#735c00] group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>


{/* Extraction Process */}
<section className="bg-[#002b02] text-white py-32 overflow-hidden">
  <div className="px-6 lg:px-16 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    <div className="animate-on-scroll">
      <img
        alt="Artisanal Process"
        className="w-full max-w-lg mx-auto rounded-3xl"
        src="https://lh3.googleusercontent.com/aida/ADBb0uhIy5eM_DhtJ7dUj5yWI6oeS_4NgJ8OD4O8hGINMjWM6GALHzLXQJtSnKvXteTVe0ZwdM3ZIgzRiM5KfWtwPKRPl0pmpJsteU4pKEmh0prPsV67dFNXSNIpyq05ehxtM6txVSS8rh8y0yuiS5Wq0OgEHNnmhL81MrQntcK4D-OFyVfbiRneLdFwQuMXyqB38lvVVlaKX4FxB8shNnshSXoQPgOJVpP-ao5yxkuMmhqhDxVGiYb_iN6_ydub"
      />
    </div>

    <div className="space-y-8 animate-on-scroll">
      <span className="uppercase tracking-[0.3em] text-xs text-[#ffe088]">
        The Alchemy
      </span>

      <h2 className="font-serif text-5xl">
        Artisanal Extraction
      </h2>

      <p className="text-lg text-white/80 leading-relaxed">
        Every Aryan Shakti essence is the result of slow, cold-pressed
        extraction. We honor the &quot;Prana&quot; or life-force of each
        botanical, ensuring the chemical integrity of the herbs remains
        intact from forest to bottle.
      </p>

      <ul className="space-y-4">
        <li className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#ffe088]">
            eco
          </span>

          <span className="uppercase tracking-[0.2em] text-xs">
            100% Wild-Harvested Botanicals
          </span>
        </li>

        <li className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#ffe088]">
            biotech
          </span>

          <span className="uppercase tracking-[0.2em] text-xs">
            Zero Chemical Solvents
          </span>
        </li>

        <li className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#ffe088]">
            history
          </span>

          <span className="uppercase tracking-[0.2em] text-xs">
            14-Day Lunar Infusion Process
          </span>
        </li>
      </ul>
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="py-32 bg-[#fbf9f4] relative">
  <div className="px-6 lg:px-16 max-w-[1280px] mx-auto text-center">
    <div className="material-symbols-outlined text-[#735c00] text-4xl mb-8">
      format_quote
    </div>

    <div className="max-w-3xl mx-auto animate-on-scroll">
      <p className="font-serif text-3xl text-[#002b02] italic mb-12 leading-relaxed">
        &quot;Incorporating the Nidra Ritual into my evenings has completely
        transformed my sleep architecture. It&apos;s not just a product;
        it&apos;s a profound transition into stillness.&quot;
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#735c00]">
          <img
            alt="User"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO8YdMmqpSHusFw_hwNkCxxJRbvhzWV1GA2bcnHQoGZqrv9qUXeBlGnClPYVyiz6Oo8N3AX1dB_WGjgin7GfM3W9DnpBNF7HWFUzK-wNjn1Djwin2ISGDw47GKG6Q0rYI6i0oAy9EkT8OLRESJV7z6aKA1ZOAVkKm1g4if2leaWhLe15gMD5fYH2E_CR-88HwClStabBDd2Ldr1J9tKyOYjBFenOaJTNjk125n4nu9Talg0CaQXzwJPWIrdX0ndZoWZBrdZVr0Lfae"
          />
        </div>

        <div>
          <h6 className="uppercase tracking-[0.2em] text-xs text-[#002b02]">
            Elena Moretti
          </h6>

          <p className="text-[#42493e] text-sm">
            Holistic Wellness Director
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}