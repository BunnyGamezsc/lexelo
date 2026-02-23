"use client";

import { type JSX } from "react";
import {
  ArrowRight,
  BookOpen,
  BookText,
  Brain,
  CalendarDays,
  CheckCircle2,
  Compass,
  Languages,
  Layers,
  Library,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "#/ui/badge";
import { Button } from "#/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/ui/card";
import { Progress } from "#/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/ui/tabs";

const versionTabs = [
  { value: "v1", label: "Version A" },
  { value: "v2", label: "Version B" },
] as const;

const VersionSwitch = (): JSX.Element => (
  <TabsList className="grid w-full max-w-sm grid-cols-2">
    {versionTabs.map((tab) => (
      <TabsTrigger key={tab.value} value={tab.value}>
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
);

export const HomePageContent = (): JSX.Element => {
  return (
    <Tabs defaultValue="v1" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Lexelo Home
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Latin Study Hub</h1>
        </div>
        <VersionSwitch />
      </div>

      <TabsContent value="v1" className="space-y-6">
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 via-background to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Compass className="h-6 w-6 text-amber-700" />
              Focus Session: Grammar + Retention
            </CardTitle>
            <CardDescription>
              Practice first, answers second: 15 minutes of declensions, 10 minutes of
              flashcards, and one syntax checkpoint.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Streak" value="12 days" note="Best: 19 days" progress={63} />
            <MetricCard label="Due Cards" value="48" note="22 high-priority" progress={52} />
            <MetricCard label="Grammar Mastery" value="74%" note="3 lessons left" progress={74} />
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <ActionCard title="Declension Drill" description="5th declension noun endings" action="Start drill" icon={<BookText className="h-5 w-5" />} />
          <ActionCard title="Verb Sprint" description="Irregular perfect tense review" action="Begin sprint" icon={<BookOpen className="h-5 w-5" />} />
          <ActionCard title="Flashcard Loop" description="English to Latin active recall" action="Review deck" icon={<Brain className="h-5 w-5" />} />
        </div>
      </TabsContent>

      <TabsContent value="v2" className="space-y-6">
        <Card className="border-slate-800 bg-slate-950 text-slate-100">
          <CardHeader>
            <Badge variant="secondary" className="w-fit bg-emerald-500/20 text-emerald-200">
              Rebuilt Home Experience
            </Badge>
            <CardTitle className="mt-2 text-2xl">Lexelo Mission Control</CardTitle>
            <CardDescription className="text-slate-300">
              Latin-first now, multilingual next: this dashboard blends current study flow
              with the upcoming roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base text-slate-100">Now Available</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <FeatureLine label="Step-by-step grammar lessons" />
                <FeatureLine label="Curated Latin vocabulary sets" />
                <FeatureLine label="Spaced repetition flashcards" />
              </CardContent>
            </Card>
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base text-slate-100">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <FeatureLine label="Spanish and French tracks" />
                <FeatureLine label="Tap-to-translate tools" />
                <FeatureLine label="Graded reading comprehension" />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <RoadmapCard
            icon={<Languages className="h-5 w-5 text-cyan-300" />}
            title="Multi-language expansion"
            status="Designing"
            detail="Shared grammar engine, separate pedagogy tracks."
          />
          <RoadmapCard
            icon={<Library className="h-5 w-5 text-lime-300" />}
            title="Reading Lab"
            status="Prototype"
            detail="Passages with inline lookups and comprehension checks."
          />
          <RoadmapCard
            icon={<Sparkles className="h-5 w-5 text-fuchsia-300" />}
            title="Smart Deck Builder"
            status="Planned"
            detail="Custom decks with example sentences and smart review modes."
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export const SetsPageContent = (): JSX.Element => {
  const decks = [
    { name: "High Frequency Verbs", cards: 120, due: 24, mastery: 71 },
    { name: "Classical Nouns", cards: 95, due: 16, mastery: 84 },
    { name: "Travel and Civic Terms", cards: 60, due: 9, mastery: 56 },
  ];

  return (
    <Tabs defaultValue="v1" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sets</p>
          <h1 className="text-3xl font-semibold tracking-tight">Deck Management</h1>
        </div>
        <VersionSwitch />
      </div>

      <TabsContent value="v1" className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-3">
          {decks.map((deck) => (
            <Card key={deck.name}>
              <CardHeader>
                <CardTitle className="text-lg">{deck.name}</CardTitle>
                <CardDescription>{deck.cards} cards total</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Due today</span>
                  <Badge>{deck.due}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Mastery</span>
                    <span>{deck.mastery}%</span>
                  </div>
                  <Progress value={deck.mastery} />
                </div>
                <Button className="w-full justify-between">
                  Review Set <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="v2" className="space-y-4">
        <Card className="border-0 bg-gradient-to-br from-sky-100 via-white to-emerald-100">
          <CardHeader>
            <CardTitle>Set Studio</CardTitle>
            <CardDescription>
              Organize vocabulary by frequency, topic, and confidence to target weak zones.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <StudioColumn title="Needs Reinforcement" tone="rose" items={["Daily verbs", "Pronouns", "Adjective endings"]} />
            <StudioColumn title="Stable" tone="amber" items={["Food nouns", "Household terms", "Roman civic life"]} />
            <StudioColumn title="Mastered" tone="emerald" items={["Question words", "Basic conjunctions", "Time expressions"]} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export const LearnPageContent = (): JSX.Element => {
  return (
    <Tabs defaultValue="v1" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Learn</p>
          <h1 className="text-3xl font-semibold tracking-tight">Guided Study Paths</h1>
        </div>
        <VersionSwitch />
      </div>

      <TabsContent value="v1" className="grid gap-4 lg:grid-cols-3">
        <PathCard title="Declensions I-V" subtitle="Noun case recognition" progress={68} />
        <PathCard title="Conjugations" subtitle="Present to perfect systems" progress={52} />
        <PathCard title="Syntax Builder" subtitle="Word order and agreement" progress={39} />
      </TabsContent>

      <TabsContent value="v2" className="space-y-4">
        <Card className="overflow-hidden border border-indigo-900 bg-indigo-950 text-indigo-50">
          <CardHeader>
            <CardTitle>Exercise Workshop</CardTitle>
            <CardDescription className="text-indigo-200">
              Practice with mixed modes: translation, parsing, and comprehension in one run.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <WorkshopCard
              icon={<BookText className="h-5 w-5" />}
              title="Parsing Arena"
              description="Identify case, number, gender, and tense with instant feedback."
            />
            <WorkshopCard
              icon={<Brain className="h-5 w-5" />}
              title="Recall Gauntlet"
              description="Timed English-to-Latin prompts tuned by your error history."
            />
            <WorkshopCard
              icon={<Languages className="h-5 w-5" />}
              title="Translation Lab"
              description="Phrase-level drills with hints that teach structure, not answers."
            />
            <WorkshopCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Comprehension Check"
              description="Short passages followed by context and meaning questions."
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export const CommunityPageContent = (): JSX.Element => {
  return (
    <Tabs defaultValue="v1" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Community</p>
          <h1 className="text-3xl font-semibold tracking-tight">Study Circles & Challenges</h1>
        </div>
        <VersionSwitch />
      </div>

      <TabsContent value="v1" className="grid gap-4 lg:grid-cols-3">
        <CommunityCard title="Declension Challenge" members="412" when="Daily" />
        <CommunityCard title="Weekly Reading Club" members="178" when="Fridays" />
        <CommunityCard title="Verb Conjugation Sprint" members="267" when="Mondays" />
      </TabsContent>

      <TabsContent value="v2" className="space-y-4">
        <Card className="border-teal-200 bg-teal-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-700" />
              The Scriptorium
            </CardTitle>
            <CardDescription>
              Collaborative translation space with peer notes, rubric scoring, and feedback loops.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <ScriptoriumItem
              icon={<MessageCircle className="h-4 w-4" />}
              title="Peer Review Queue"
              detail="8 submissions waiting for grammar feedback."
            />
            <ScriptoriumItem
              icon={<CalendarDays className="h-4 w-4" />}
              title="Live Session"
              detail="Tonight: Caesar passage analysis at 7:30 PM."
            />
            <ScriptoriumItem
              icon={<Layers className="h-4 w-4" />}
              title="Shared Decks"
              detail="12 community-authored decks ready to copy."
            />
            <ScriptoriumItem
              icon={<Brain className="h-4 w-4" />}
              title="Mentor Picks"
              detail="Top mistakes this week and targeted mini-lessons."
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const MetricCard = ({
  label,
  note,
  progress,
  value,
}: {
  label: string;
  note: string;
  progress: number;
  value: string;
}): JSX.Element => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
};

const ActionCard = ({
  action,
  description,
  icon,
  title,
}: {
  action: string;
  description: string;
  icon: JSX.Element;
  title: string;
}): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full justify-between" variant="outline">
          {action}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const FeatureLine = ({ label }: { label: string }): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
      <span>{label}</span>
    </div>
  );
};

const RoadmapCard = ({
  detail,
  icon,
  status,
  title,
}: {
  detail: string;
  icon: JSX.Element;
  status: string;
  title: string;
}): JSX.Element => {
  return (
    <Card className="border-slate-800 bg-slate-950 text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-slate-300">{detail}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className="bg-slate-800 text-slate-100">
          {status}
        </Badge>
      </CardContent>
    </Card>
  );
};

const StudioColumn = ({
  items,
  title,
  tone,
}: {
  items: string[];
  title: string;
  tone: "rose" | "amber" | "emerald";
}): JSX.Element => {
  const toneClass = {
    rose: "border-rose-200 bg-rose-50",
    amber: "border-amber-200 bg-amber-50",
    emerald: "border-emerald-200 bg-emerald-50",
  }[tone];

  return (
    <Card className={toneClass}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-current/15 bg-white/70 px-3 py-2">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const PathCard = ({
  progress,
  subtitle,
  title,
}: {
  progress: number;
  subtitle: string;
  title: string;
}): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progress} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{progress}% complete</span>
          <Button size="sm" variant="outline">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkshopCard = ({
  description,
  icon,
  title,
}: {
  description: string;
  icon: JSX.Element;
  title: string;
}): JSX.Element => {
  return (
    <Card className="border-indigo-800 bg-indigo-900/70 text-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-indigo-200">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-indigo-100 text-indigo-950 hover:bg-white">Launch</Button>
      </CardContent>
    </Card>
  );
};

const CommunityCard = ({
  members,
  title,
  when,
}: {
  members: string;
  title: string;
  when: string;
}): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{members} learners active</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">Next event: {when}</div>
        <Button variant="outline" className="w-full justify-between">
          Join Circle
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const ScriptoriumItem = ({
  detail,
  icon,
  title,
}: {
  detail: string;
  icon: JSX.Element;
  title: string;
}): JSX.Element => {
  return (
    <div className="rounded-lg border border-teal-200 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-teal-900">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm text-teal-800">{detail}</p>
    </div>
  );
};
