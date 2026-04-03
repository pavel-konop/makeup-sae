import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  quoteCta?: string;
}

export default function ServiceCard({ icon, title, description, quoteCta = "Get a quote →" }: ServiceCardProps) {
  return (
    <div className="service-card bg-white p-8 rounded-sm flex flex-col gap-4">
      <div className="w-10 h-10 text-[#c2185b]">{icon}</div>
      <h3
        className="text-xl text-[#111111]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
      >
        {title}
      </h3>
      <p
        className="text-[#888888] text-sm leading-relaxed flex-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {description}
      </p>
      <Link
        href="https://wa.link/1583yh"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-[#c2185b] hover:underline mt-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {quoteCta}
      </Link>
    </div>
  );
}
