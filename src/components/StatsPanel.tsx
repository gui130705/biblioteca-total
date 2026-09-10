import { BookCheck, Clock, Flame, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDailyGoal, useReadingStats } from "@/lib/stats";
import { Button } from "@/components/ui/button";

const GOALS = [15, 30, 45];

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Flame;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-4">
      <Icon className="size-4 text-primary" />
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
    </div>
  );
}

function GoalRing({ percent, minutes, goal }: { percent: number; minutes: number; goal: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid size-32 shrink-0 place-items-center">
      <svg viewBox="0 0 100 100" className="size-32 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--muted)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * percent) / 100}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-xl font-bold">{minutes}</p>
        <p className="text-[10px] text-muted-foreground">de {goal} min</p>
      </div>
    </div>
  );
}

export function StatsPanel({ booksDone }: { booksDone: number }) {
  const { stats } = useReadingStats();
  const { goal, setGoal } = useDailyGoal();
  const percent = Math.min(100, Math.round((stats.todayMinutes / Math.max(goal, 1)) * 100));
  const finished = Math.max(stats.booksFinished, booksDone);

  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-center gap-5">
          <GoalRing percent={percent} minutes={stats.todayMinutes} goal={goal} />
          <div>
            <p className="text-[11px] tracking-[0.22em] text-primary uppercase">Meta diária</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {percent >= 100 ? "Meta concluída hoje." : `Faltam ${Math.max(goal - stats.todayMinutes, 0)} min hoje.`}
            </p>
            <div className="mt-3 flex gap-1.5">
              {GOALS.map((g) => (
                <Button
                  key={g}
                  size="sm"
                  variant={g === goal ? "default" : "outline"}
                  className={cn("h-7 px-3 text-xs")}
                  onClick={() => setGoal.mutate(g)}
                >
                  {g} min
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            icon={Flame}
            value={`${stats.streak}`}
            label={`Dias seguidos · recorde ${stats.longestStreak}`}
          />
          <Stat icon={Clock} value={`${stats.totalMinutes}`} label="Minutos lidos" />
          <Stat icon={ScrollText} value={`${stats.totalPages}`} label="Páginas lidas" />
          <Stat icon={BookCheck} value={`${finished}`} label="Livros concluídos" />
        </div>
      </div>
    </section>
  );
}
