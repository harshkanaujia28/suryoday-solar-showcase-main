import residential from "@/assets/service-residential.jpg";
import commercial from "@/assets/service-commercial.jpg";
import industrial from "@/assets/service-industrial.jpg";
import pumps from "@/assets/service-pumps.jpg";
import maintenance from "@/assets/service-maintenance.jpg";
import p1 from "@/assets/projects/solar-project-rooftop-1.png";
import p2 from "@/assets/projects/solar-project-inverter-1.png";
import p3 from "@/assets/projects/solar-project-inverter-2.png";
import p4 from "@/assets/projects/solar-project-inverter-3.png";
import p5 from "@/assets/projects/solar-project-installation-team.png";
import p6 from "@/assets/projects/solar-project-hybrid-system.png";

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "MW+", label: "Installed Capacity" },
  { value: 1000, suffix: "+", label: "Happy Customers" },
];

export const TRUST = [
  { label: "MNRE Compliant" },
  { label: "Net Metering Support" },
  { label: "25 Years Warranty" },
  { label: "500+ Projects" },
];

export const WHY_US = [
  { icon: "FaRupeeSign", title: "Lower Electricity Bills", desc: "Cut your monthly power bill by up to 90% with grid-tied solar." },
  { icon: "FaLandmark", title: "Government Subsidy", desc: "Up to 40% PM Surya Ghar subsidy — we handle the paperwork." },
  { icon: "FaBolt", title: "Fast Installation", desc: "Most residential systems commissioned within 7 to 10 days." },
  { icon: "FaSolarPanel", title: "Premium Components", desc: "Tier-1 panels, hybrid inverters and 25-year linear power warranty." },
  { icon: "FaTools", title: "Maintenance Support", desc: "Quarterly cleaning, monitoring app and on-site service team." },
  { icon: "FaChartLine", title: "High ROI", desc: "Recover your investment in 3–5 years, free power for 25." },
];

export const SERVICES = [
  {
    slug: "residential",
    title: "Residential Solar",
    short: "Rooftop solar for homes and bungalows from 1 kW to 25 kW.",
    img: residential,
    benefits: ["Save up to 90% on bills", "PM Surya Ghar subsidy", "Net metering setup", "5-year free maintenance"],
  },
  {
    slug: "commercial",
    title: "Commercial Solar",
    short: "Solar for offices, schools, hospitals, hotels and showrooms.",
    img: commercial,
    benefits: ["Accelerated depreciation", "OPEX & CAPEX models", "Custom financing", "ROI in under 4 years"],
  },
  {
    slug: "industrial",
    title: "Industrial Solar",
    short: "MW-scale rooftop and ground-mount plants for factories.",
    img: industrial,
    benefits: ["Up to 70% load offset", "Open Access & captive", "Hybrid with storage", "24×7 plant monitoring"],
  },
  {
    slug: "water-pumps",
    title: "Solar Water Pumps",
    short: "PM-KUSUM compliant solar pumps for farmers and irrigation.",
    img: pumps,
    benefits: ["3 HP – 10 HP options", "Kusum subsidy", "Diesel-free pumping", "5-year warranty"],
  },
  {
    slug: "maintenance",
    title: "Solar AMC & Maintenance",
    short: "Cleaning, monitoring and repair for any solar system.",
    img: maintenance,
    benefits: ["Quarterly cleaning", "Performance reports", "Inverter service", "Emergency support"],
  },
];

export const PROJECTS = [
  { id: 1, title: "Rooftop Solar Installation", category: "Residential", capacity: "Rooftop system", location: "Sahpur Baghauni, Bihar", savings: "Contact for details", img: p1, span: "row-span-1" },
  { id: 2, title: "Solar Inverter Installation", category: "Residential", capacity: "Waaree inverter", location: "Sahpur Baghauni, Bihar", savings: "Contact for details", img: p2, span: "row-span-2" },
  { id: 3, title: "Rooftop Solar Installation", category: "Residential", capacity: "Panel installation", location: "Sheohar, Bihar", savings: "Contact for details", img: p3, span: "row-span-1" },
  { id: 4, title: "Hybrid Solar & Battery System", category: "Residential", capacity: "Deye hybrid system", location: "Bihar, India", savings: "Contact for details", img: p4, span: "row-span-2" },
  { id: 5, title: "Residential Solar Inverter", category: "Residential", capacity: "Luminous inverter", location: "Bihar, India", savings: "Contact for details", img: p5, span: "row-span-1" },
  { id: 6, title: "Residential Solar Inverter", category: "Residential", capacity: "Polycab inverter", location: "Bihar, India", savings: "Contact for details", img: p6, span: "row-span-2" },
];

export const PROCESS = [
  { n: 1, title: "Free Consultation", desc: "Call or fill the form. Our solar expert understands your needs." },
  { n: 2, title: "Site Survey", desc: "We visit your site, measure shadow-free area and audit load." },
  { n: 3, title: "Design & Approval", desc: "Custom 3D design, BOM and quote — share for your approval." },
  { n: 4, title: "Installation", desc: "Our certified team installs panels, inverter and wiring in days." },
  { n: 5, title: "Net Metering", desc: "We file paperwork with DISCOM and install bi-directional meter." },
  { n: 6, title: "Start Saving", desc: "System goes live. Track generation on our mobile app from day one." },
];

export const TESTIMONIALS = [
  { name: "Rajesh Patil", role: "Homeowner, Pune", rating: 5, text: "Suryoday installed our 8kW system in just 6 days. Bill came down from ₹9,500 to ₹450. Honest team, premium quality." },
  { name: "Dr. Anjali Sharma", role: "Director, Aastha Hospital", rating: 5, text: "Professional from quote to commissioning. Their monitoring app is a game changer for tracking our 120kW plant." },
  { name: "Suresh Kale", role: "Factory Owner, Chakan", rating: 5, text: "ROI promised was 3.8 years — we crossed break-even in 3.5. Subsidy paperwork was handled end-to-end by their team." },
  { name: "Priya Deshmukh", role: "Homeowner, Nashik", rating: 5, text: "I got quotes from 4 vendors. Suryoday wasn't the cheapest but the only one who explained everything clearly. Worth it." },
  { name: "Ramesh Joshi", role: "School Trustee", rating: 5, text: "75kW for our school — saved over ₹9 lakh in year one. The annual maintenance contract is hassle-free." },
];

export const FAQS = [
  { q: "How much does a residential solar system cost?", a: "A 3 kW on-grid system costs about ₹1.8–2.2 lakh before subsidy. After the PM Surya Ghar subsidy (up to ₹78,000), it drops to roughly ₹1.0–1.4 lakh." },
  { q: "What subsidy can I get?", a: "Residential customers get up to ₹78,000 under the PM Surya Ghar Muft Bijli Yojana. We file the entire application on your behalf." },
  { q: "How long does installation take?", a: "Typical 3–10 kW rooftop systems are commissioned within 7–10 working days after site survey and approval." },
  { q: "What is the warranty period?", a: "Solar panels carry a 25-year linear performance warranty. Inverters get 5–10 years and the structure is warranted for 5 years." },
  { q: "Will solar work during a power cut?", a: "On-grid systems shut down during cuts (safety). For backup, we offer hybrid systems with battery storage." },
  { q: "Do I need maintenance?", a: "Just panel cleaning every 3 months. We offer AMC plans starting at ₹2,500/year that cover cleaning, inspection and remote monitoring." },
];

export const STATES = [
  "Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "Delhi", "Rajasthan",
  "Uttar Pradesh", "Madhya Pradesh", "Haryana", "Punjab", "Telangana", "Other",
];

export const BLOG_POSTS = [
  { slug: "pm-surya-ghar-subsidy-guide", title: "PM Surya Ghar Subsidy 2026: Full Guide for Homeowners", excerpt: "Eligibility, documents, timeline and how to claim up to ₹78,000 subsidy for your rooftop solar.", category: "Subsidy", date: "Jun 18, 2026", read: "6 min" },
  { slug: "solar-roi-calculation", title: "How to Calculate Solar ROI for Your Home", excerpt: "A clear breakdown of how solar pays for itself in 3–5 years in Indian conditions.", category: "Finance", date: "Jun 12, 2026", read: "5 min" },
  { slug: "net-metering-explained", title: "Net Metering Explained for Indian Households", excerpt: "What net metering is, how it works with your DISCOM and why it matters for your savings.", category: "Basics", date: "May 30, 2026", read: "4 min" },
  { slug: "on-grid-vs-off-grid", title: "On-Grid vs Off-Grid vs Hybrid: Which is Right for You?", excerpt: "Pros, cons and cost comparison of the three rooftop solar configurations.", category: "Basics", date: "May 22, 2026", read: "7 min" },
  { slug: "commercial-solar-depreciation", title: "Accelerated Depreciation Benefits for Commercial Solar", excerpt: "How businesses can claim 40% accelerated depreciation in year one.", category: "Commercial", date: "May 10, 2026", read: "5 min" },
  { slug: "monsoon-solar-maintenance", title: "Monsoon Solar Maintenance Checklist", excerpt: "Keep your system performing through India's monsoon season with these steps.", category: "Maintenance", date: "Apr 28, 2026", read: "4 min" },
];
