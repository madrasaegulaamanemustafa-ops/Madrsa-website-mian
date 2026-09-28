-- ==============================================================================
-- Madrasa E Gulaaman E Mustafa — Supabase SQL Schema (Schema: public)
-- ==============================================================================

-- 1. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    order_num INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Students Table (Results, Ranks & Marks)
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    roll_no TEXT,
    class_id TEXT NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    class_name TEXT NOT NULL,
    rank INTEGER NOT NULL DEFAULT 1,
    percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    marks_obtained TEXT,
    remarks TEXT,
    term TEXT DEFAULT 'Annual Examination',
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Results Settings Table (Global Config & Admin Authentication)
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'results_config',
    display_limit INTEGER NOT NULL DEFAULT 5,
    active_exam_title TEXT NOT NULL DEFAULT 'Monthly Fatah-E-Battle & Exam Results',
    session_year TEXT NOT NULL DEFAULT '2026–27',
    admin_pin TEXT NOT NULL DEFAULT '7860',
    admin_email TEXT NOT NULL DEFAULT 'admin@madrasa.com',
    admin_password TEXT NOT NULL DEFAULT 'madrasa@admin786',
    show_roll_numbers BOOLEAN NOT NULL DEFAULT TRUE,
    show_percentages BOOLEAN NOT NULL DEFAULT TRUE,
    banner_notice TEXT NOT NULL DEFAULT 'Mubarakbaad to all successful students and their proud parents. May Allah ﷻ grant steadfastness in Deeni knowledge.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies
DROP POLICY IF EXISTS "Allow public read access for classes" ON public.classes;
CREATE POLICY "Allow public read access for classes" ON public.classes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for students" ON public.students;
CREATE POLICY "Allow public read access for students" ON public.students FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for settings" ON public.settings;
CREATE POLICY "Allow public read access for settings" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all actions for classes" ON public.classes;
CREATE POLICY "Allow all actions for classes" ON public.classes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all actions for students" ON public.students;
CREATE POLICY "Allow all actions for students" ON public.students FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all actions for settings" ON public.settings;
CREATE POLICY "Allow all actions for settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- 6. Initial Seed Settings
INSERT INTO public.settings (id, display_limit, active_exam_title, session_year, admin_pin, admin_email, admin_password, show_roll_numbers, show_percentages, banner_notice)
VALUES (
    'results_config',
    5,
    'Monthly Fatah-E-Battle & Exam Results',
    '2026–27',
    '7860',
    'admin@madrasa.com',
    'madrasa@admin786',
    TRUE,
    TRUE,
    'Mubarakbaad to all successful students and their proud parents. May Allah ﷻ grant steadfastness in Deeni knowledge.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Classes
INSERT INTO public.classes (id, name, order_num) VALUES
('dars-e-nizami', 'Dars-e-Nizami (Aalimiyat)', 1),
('tajweed', 'Tajweed & Hifz', 2),
('muballiga', 'Sisters Muballiga (Aalima)', 3),
('kids-special', 'Kids Special Batch', 4),
('qirat', 'Qirat & Tilawat', 5),
('urdu-basic', 'Basic Urdu & Deeniyat', 6),
('naat-bayan', 'Naat, Hamd & Bayan', 7),
('english', 'English Speaking for Deen', 8)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Top Students
INSERT INTO public.students (id, name, roll_no, class_id, class_name, rank, percentage, marks_obtained, remarks, term) VALUES
('dn-1', 'Zaid Ahmad Khan', 'MGM-2026-042', 'dars-e-nizami', 'Dars-e-Nizami (Aalimiyat)', 1, 98.60, '493/500', '1st Position — Gold Medalist', 'Monthly Fatah-E-Battle — 2026'),
('dn-2', 'Muhammad Umar Farooq', 'MGM-2026-089', 'dars-e-nizami', 'Dars-e-Nizami (Aalimiyat)', 2, 97.20, '486/500', '2nd Position — Silver Medalist', 'Monthly Fatah-E-Battle — 2026'),
('dn-3', 'Abdullah Razvi', 'MGM-2026-114', 'dars-e-nizami', 'Dars-e-Nizami (Aalimiyat)', 3, 95.80, '479/500', '3rd Position — Bronze Medalist', 'Monthly Fatah-E-Battle — 2026'),
('mb-1', 'Fatima Zahra', 'MGM-SIS-007', 'muballiga', 'Sisters Muballiga (Aalima)', 1, 99.00, '495/500', '1st Position — Gold Medalist', 'Monthly Fatah-E-Battle — 2026'),
('mb-2', 'Ayesha Siddiqua', 'MGM-SIS-034', 'muballiga', 'Sisters Muballiga (Aalima)', 2, 97.80, '489/500', '2nd Position — Silver Medalist', 'Monthly Fatah-E-Battle — 2026'),
('mb-3', 'Mariam Noori', 'MGM-SIS-052', 'muballiga', 'Sisters Muballiga (Aalima)', 3, 96.40, '482/500', '3rd Position — Bronze Medalist', 'Monthly Fatah-E-Battle — 2026'),
('kd-1', 'Muhammad Ali (Age 8)', 'MGM-KID-012', 'kids-special', 'Kids Special Batch', 1, 99.50, '199/200', 'Kids Champion & Quiz Winner', 'Monthly Fatah-E-Battle — 2026'),
('kd-2', 'Ibrahim Khan (Age 7)', 'MGM-KID-045', 'kids-special', 'Kids Special Batch', 2, 98.00, '196/200', 'Kids 2nd Position', 'Monthly Fatah-E-Battle — 2026'),
('kd-3', 'Sara Fatimah (Age 9)', 'MGM-KID-083', 'kids-special', 'Kids Special Batch', 3, 96.50, '193/200', 'Kids 3rd Position', 'Monthly Fatah-E-Battle — 2026')
ON CONFLICT (id) DO NOTHING;
