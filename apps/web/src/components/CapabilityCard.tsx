import { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export function CapabilityCard({
  icon: Icon,
  title,
  description,
  badge,
}: CapabilityCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-accent text-accent-foreground flex items-center justify-center transition-transform group-hover:scale-110">
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
          {badge && (
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-secondary text-muted-foreground border border-border">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-card-foreground tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
