import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Wheat,
  Activity,
  Package,
  Layers,
  Sparkles
} from "lucide-react";
import { IMAGES } from "../data/images";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";

export default function OurFarm({ onOpenEnquiry }) {
  const farmPillars = [
    {
      title: "Bird Management",
      icon: <Activity className="w-6 h-6 text-gold" />,
      description: "Our layer birds are housed in clean, spacious, well-ventilated sheds designed to facilitate natural movement, stress-free behavior, and continuous fresh air circulation.",
      points: [
        "Structured shed layout with natural daylight and fresh air",
        "Continuous monitoring of temperature and humidity",
        "Clean drinking water lines tested regularly",
        "Daily bird health and welfare observation"
      ]
    },
    {
      title: "Nutrition",
      icon: <Wheat className="w-6 h-6 text-gold" />,
      description: "We prepare poultry feed in-house to maintain stringent control over nutritional composition, selecting quality maize, grains, and protein components for our birds.",
      points: [
        "In-house preparation tailored to laying cycles",
        "Inspected raw materials: yellow maize, whole grains, soya meal",
        "Controlled mixing of essential minerals and vitamins",
        "Feed prepared strictly for internal farm consumption"
      ]
    },
    {
      title: "Hygiene",
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      description: "Rigorous hygiene schedules are practiced throughout our farm premises, from daily shed sanitization to the handling of eggs and poultry bedding.",
      points: [
        "Scheduled cleaning of shed floors and perches",
        "Dry and sanitary conditions maintained year-round",
        "Regular removal and orderly collection of poultry droppings",
        "Clean personnel protocols before handling birds or produce"
      ]
    },
    {
      title: "Biosecurity",
      icon: <Shield className="w-6 h-6 text-gold" />,
      description: "We enforce disciplined biosecurity measures at farm gates and sheds to safeguard flock health and minimize the introduction of external pathogens.",
      points: [
        "Restricted visitor and vehicle entry to the farm compound",
        "Vehicle spray dip / sanitization at farm perimeter",
        "Protective footwear and clean uniforms for farm staff",
        "Segregation between feed preparation and bird housing areas"
      ]
    },
    {
      title: "Egg Collection",
      icon: <Package className="w-6 h-6 text-gold" />,
      description: "Fresh table eggs are collected daily, sorted carefully, and graded for uniform quality before being packed in standard pulp flats.",
      points: [
        "Daily morning egg collection to preserve freshness",
        "Individual inspection for shell cleanliness and integrity",
        "Graded and arranged in clean, eco-friendly paper trays",
        "Cool, well-ventilated temporary holding room prior to dispatch"
      ]
    },
    {
      title: "Farm Operations",
      icon: <Layers className="w-6 h-6 text-gold" />,
      description: "Day-to-day operations are organized into dedicated operational zones ensuring smooth coordination between feeding, egg handling, and manure bagging.",
      points: [
        "Disciplined daily routine supervised by experienced farm personnel",
        "Systematic batch management of layer birds",
        "Coordinated dispatch logistics for wholesale trade partners",
        "Orderly bagging and distribution of organic poultry manure"
      ]
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <SEO
        title="Our Farm & Facilities"
        description="Explore VARSHA AGRO's modern layer poultry sheds, automated watering, in-house feed milling, and biosecure operations in Wathwada, Kalamb."
        canonicalPath="/farm"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Varsha Agro modern poultry farm compound in Dharashiv"
            loading="lazy"
            decoding="async"
            width="1376"
            height="768"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest/90 to-forest-dark/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              OUR FARM
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              A Connected Poultry<br />
              <span className="text-gold-light italic">Farming Operation</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              From in-house feed preparation to responsible bird management and agricultural by-product utilization, discover how our farm operates in Dharashiv, Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Our Farm</span>
        </div>
      </div>

      {/* Connected Farm Flow (Interactive Process) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="THE CONNECTED CYCLE"
              title="From Raw Materials to Product Utilization"
              subtitle="Our poultry farm maintains a connected lifecycle where every input is carefully controlled and every output is responsibly utilized."
              centered
            />
          </div>

          {/* Sequential Step Cards with Flow Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                name: "Raw Materials",
                desc: "Quality grains, yellow maize, and proteins are sourced and checked for cleanliness before entering our preparation cycle."
              },
              {
                step: "02",
                name: "Feed Preparation",
                desc: "Ingredients are ground, balanced, and mixed in-house to provide our birds with targeted nutrition."
              },
              {
                step: "03",
                name: "Bird Management",
                desc: "Flocks are reared in spacious, clean, and ventilated sheds with daily monitoring of health and hygiene."
              },
              {
                step: "04",
                name: "Egg Production",
                desc: "Daily egg laying under stress-free conditions, supported by clean water and uninterrupted nutrition."
              },
              {
                step: "05",
                name: "Egg Collection",
                desc: "Hygienic collection, thorough inspection for shell integrity, and neat stacking in standard pulp flats."
              },
              {
                step: "06",
                name: "Product Utilization",
                desc: "Fresh eggs dispatched to markets, and nitrogen-rich poultry manure cured and bagged for regional farm fields."
              }
            ].map((st, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl bg-ivory border border-forest/10 relative hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-gold">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-agri px-2.5 py-1 rounded bg-agri/10">
                    Phase {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-forest">
                  {st.name}
                </h3>
                <p className="text-sm text-charcoal/80 mt-2 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Pillars of Farm Operations */}
      <section className="py-20 lg:py-24 bg-ivory border-y border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="OPERATIONAL RIGOR"
              title="Core Farm Operations"
              subtitle="Every aspect of our poultry enterprise is managed through disciplined protocols to ensure animal welfare and produce purity."
              centered
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-charcoal/80 mt-3 leading-relaxed font-light">
                    {pillar.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 pt-4 border-t border-forest/10">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-charcoal/85">
                        <CheckCircle2 className="w-4 h-4 text-agri shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Break */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                HYGIENE &amp; HANDLING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Daily Egg Handling &amp; Sorting Line
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Our team conducts systematic daily egg inspection, ensuring shell strength, surface cleanliness, and prompt placement into pulp filler flats. This disciplined handling minimizes micro-cracks and maintains farm freshness.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("Eggs")}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>ENQUIRE ABOUT FRESH EGGS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-card border border-white/10">
                <img
                  src={IMAGES.eggOperations}
                  alt="Daily egg sorting and tray packing at Varsha Agro"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="896"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
