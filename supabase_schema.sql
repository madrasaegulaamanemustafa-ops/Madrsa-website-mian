-- ==============================================================================
-- Madrasa E Gulaaman E Mustafa — Supabase SQL Schema (Schema: madrasa)
-- ==============================================================================

-- 1. Create Schema & Grants
CREATE SCHEMA IF NOT EXISTS madrasa;
GRANT USAGE ON SCHEMA madrasa TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA madrasa TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA madrasa TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA madrasa GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA madrasa GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS madrasa.classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    order_num INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Students Table (Results, Ranks & Marks)
CREATE TABLE IF NOT EXISTS madrasa.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    roll_no TEXT,
    class_id TEXT NOT NULL REFERENCES madrasa.classes(id) ON DELETE CASCADE,
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

-- 4. Feedbacks Table
CREATE TABLE IF NOT EXISTS madrasa.feedbacks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    course_name TEXT,
    rating INTEGER NOT NULL DEFAULT 5,
    message TEXT NOT NULL,
    location TEXT,
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Results Settings Table (Global Config Display)
CREATE TABLE IF NOT EXISTS madrasa.settings (
    id TEXT PRIMARY KEY DEFAULT 'results_config',
    display_limit INTEGER NOT NULL DEFAULT 5,
    active_exam_title TEXT NOT NULL DEFAULT 'Monthly Fatah-E-Battle & Exam Results',
    session_year TEXT NOT NULL DEFAULT '2026–27',
    show_roll_numbers BOOLEAN NOT NULL DEFAULT TRUE,
    show_percentages BOOLEAN NOT NULL DEFAULT TRUE,
    banner_notice TEXT NOT NULL DEFAULT 'Mubarakbaad to all successful students and their proud parents. May Allah ﷻ grant steadfastness in Deeni knowledge.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_students_class_rank ON madrasa.students(class_id, rank ASC);
CREATE INDEX IF NOT EXISTS idx_classes_order ON madrasa.classes(order_num ASC);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created ON madrasa.feedbacks(created_at DESC);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE madrasa.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE madrasa.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE madrasa.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE madrasa.feedbacks ENABLE ROW LEVEL SECURITY;

-- 8. Row Level Security Policies
-- Feedbacks Policies
DROP POLICY IF EXISTS "Public read feedbacks" ON madrasa.feedbacks;
CREATE POLICY "Public read feedbacks" ON madrasa.feedbacks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert feedbacks" ON madrasa.feedbacks;
CREATE POLICY "Public insert feedbacks" ON madrasa.feedbacks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete feedbacks" ON madrasa.feedbacks;
DROP POLICY IF EXISTS "Allow delete feedbacks" ON madrasa.feedbacks;
CREATE POLICY "Allow delete feedbacks" ON madrasa.feedbacks FOR DELETE USING (true);

-- Classes Policies
DROP POLICY IF EXISTS "Public read classes" ON madrasa.classes;
DROP POLICY IF EXISTS "Admin write classes" ON madrasa.classes;
DROP POLICY IF EXISTS "Allow all actions for classes" ON madrasa.classes;
CREATE POLICY "Allow all actions for classes" ON madrasa.classes FOR ALL USING (true) WITH CHECK (true);

-- Students Policies
DROP POLICY IF EXISTS "Public read students" ON madrasa.students;
DROP POLICY IF EXISTS "Admin write students" ON madrasa.students;
DROP POLICY IF EXISTS "Allow all actions for students" ON madrasa.students;
CREATE POLICY "Allow all actions for students" ON madrasa.students FOR ALL USING (true) WITH CHECK (true);

-- Settings Policies
DROP POLICY IF EXISTS "Public read settings" ON madrasa.settings;
DROP POLICY IF EXISTS "Admin write settings" ON madrasa.settings;
DROP POLICY IF EXISTS "Allow all actions for settings" ON madrasa.settings;
CREATE POLICY "Allow all actions for settings" ON madrasa.settings FOR ALL USING (true) WITH CHECK (true);

-- 9. Initial Seed Settings
INSERT INTO madrasa.settings (id, display_limit, active_exam_title, session_year, show_roll_numbers, show_percentages, banner_notice)
VALUES (
    'results_config',
    5,
    'Monthly Fatah-E-Battle & Exam Results',
    '2026–27',
    TRUE,
    TRUE,
    'Mubarakbaad to all successful students and their proud parents. May Allah ﷻ grant steadfastness in Deeni knowledge.'
)
ON CONFLICT (id) DO UPDATE SET
    display_limit = EXCLUDED.display_limit,
    active_exam_title = EXCLUDED.active_exam_title,
    session_year = EXCLUDED.session_year,
    show_roll_numbers = EXCLUDED.show_roll_numbers,
    show_percentages = EXCLUDED.show_percentages,
    banner_notice = EXCLUDED.banner_notice,
    updated_at = NOW();

-- Seed Classes
INSERT INTO madrasa.classes (id, name, order_num) VALUES
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
INSERT INTO madrasa.students (id, name, roll_no, class_id, class_name, rank, percentage, marks_obtained, remarks, term) VALUES
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
