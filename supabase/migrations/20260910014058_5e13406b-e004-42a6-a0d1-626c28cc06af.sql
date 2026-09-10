CREATE TABLE public.reading_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id uuid REFERENCES public.books(id) ON DELETE SET NULL,
  minutes numeric NOT NULL DEFAULT 0,
  pages numeric NOT NULL DEFAULT 0,
  session_date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reading_sessions TO authenticated;
GRANT ALL ON public.reading_sessions TO service_role;

ALTER TABLE public.reading_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY reading_sessions_own ON public.reading_sessions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX reading_sessions_user_date_idx ON public.reading_sessions (user_id, session_date DESC);

CREATE TRIGGER reading_sessions_updated_at
  BEFORE UPDATE ON public.reading_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS daily_goal_minutes integer NOT NULL DEFAULT 30;

ALTER TABLE public.highlights
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'insight',
  ADD COLUMN IF NOT EXISTS last_reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS review_count integer NOT NULL DEFAULT 0;