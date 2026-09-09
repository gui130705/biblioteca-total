ALTER TABLE public.books
  ADD COLUMN IF NOT EXISTS author text,
  ADD COLUMN IF NOT EXISTS pdf_url text;