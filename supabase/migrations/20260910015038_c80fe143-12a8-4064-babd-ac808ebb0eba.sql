CREATE TABLE public.reading_stats (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_read_date date,
  total_minutes numeric NOT NULL DEFAULT 0,
  total_pages numeric NOT NULL DEFAULT 0,
  books_finished integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.reading_stats TO authenticated;
GRANT ALL ON public.reading_stats TO service_role;

ALTER TABLE public.reading_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY reading_stats_select_own ON public.reading_stats FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY reading_stats_insert_own ON public.reading_stats FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY reading_stats_update_own ON public.reading_stats FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TRIGGER reading_stats_updated_at BEFORE UPDATE ON public.reading_stats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.log_reading_session(
  _book_id uuid,
  _minutes numeric,
  _pages numeric,
  _session_date date DEFAULT ((now() AT TIME ZONE 'utc')::date)
)
RETURNS public.reading_stats
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _row public.reading_stats;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF COALESCE(_minutes, 0) <= 0 AND COALESCE(_pages, 0) <= 0 THEN
    SELECT * INTO _row FROM public.reading_stats WHERE user_id = _uid;
    RETURN _row;
  END IF;

  INSERT INTO public.reading_sessions (user_id, book_id, minutes, pages, session_date)
  VALUES (_uid, _book_id, GREATEST(COALESCE(_minutes,0),0), GREATEST(COALESCE(_pages,0),0), _session_date);

  INSERT INTO public.reading_stats (user_id, current_streak, longest_streak, last_read_date, total_minutes, total_pages)
  VALUES (_uid, 1, 1, _session_date, GREATEST(COALESCE(_minutes,0),0), GREATEST(COALESCE(_pages,0),0))
  ON CONFLICT (user_id) DO UPDATE SET
    total_minutes = public.reading_stats.total_minutes + GREATEST(COALESCE(_minutes,0),0),
    total_pages = public.reading_stats.total_pages + GREATEST(COALESCE(_pages,0),0),
    current_streak = CASE
      WHEN public.reading_stats.last_read_date = _session_date THEN public.reading_stats.current_streak
      WHEN public.reading_stats.last_read_date = _session_date - 1 THEN public.reading_stats.current_streak + 1
      WHEN public.reading_stats.last_read_date IS NULL OR public.reading_stats.last_read_date < _session_date THEN 1
      ELSE public.reading_stats.current_streak
    END,
    last_read_date = GREATEST(COALESCE(public.reading_stats.last_read_date, _session_date), _session_date)
  RETURNING * INTO _row;

  UPDATE public.reading_stats
  SET longest_streak = GREATEST(longest_streak, current_streak)
  WHERE user_id = _uid
  RETURNING * INTO _row;

  RETURN _row;
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_reading_session(uuid, numeric, numeric, date) TO authenticated;

CREATE OR REPLACE FUNCTION public.sync_books_finished()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _count integer;
BEGIN
  SELECT count(*) INTO _count FROM public.reading_progress
  WHERE user_id = NEW.user_id AND status = 'done';

  INSERT INTO public.reading_stats (user_id, books_finished)
  VALUES (NEW.user_id, _count)
  ON CONFLICT (user_id) DO UPDATE SET books_finished = _count;

  RETURN NEW;
END;
$$;

CREATE TRIGGER reading_progress_books_finished
AFTER INSERT OR UPDATE OF status ON public.reading_progress
FOR EACH ROW EXECUTE FUNCTION public.sync_books_finished();