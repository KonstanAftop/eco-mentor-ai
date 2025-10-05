-- Tabel untuk menyimpan profil pengguna
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  education_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Tabel untuk menyimpan aktivitas harian pengguna
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transportation TEXT,
  electricity_usage DECIMAL,
  consumption_pattern TEXT,
  carbon_footprint DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabel untuk menyimpan knowledge base RAG (meteorologi, oseanografi, kimia iklim)
CREATE TABLE IF NOT EXISTS public.climate_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.climate_knowledge ENABLE ROW LEVEL SECURITY;

-- RLS Policies untuk user_profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies untuk user_activities
CREATE POLICY "Users can view their own activities"
  ON public.user_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON public.user_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies untuk climate_knowledge (public read)
CREATE POLICY "Anyone can view climate knowledge"
  ON public.climate_knowledge FOR SELECT
  USING (true);

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample climate knowledge data
INSERT INTO public.climate_knowledge (topic, content, category, keywords) VALUES
('Efek Rumah Kaca', 'Gas rumah kaca seperti CO2, metana, dan N2O memerangkap panas di atmosfer, menyebabkan pemanasan global. Setiap ton CO2 yang diemisikan berkontribusi pada peningkatan suhu global rata-rata.', 'kimia', ARRAY['CO2', 'metana', 'gas rumah kaca', 'pemanasan global']),
('Pengasaman Laut', 'CO2 yang terserap oleh laut menghasilkan asam karbonat, menurunkan pH laut dan mengancam ekosistem terumbu karang serta organisme laut bercangkang.', 'oseanografi', ARRAY['CO2', 'laut', 'pH', 'terumbu karang', 'asam karbonat']),
('Perubahan Pola Cuaca', 'Pemanasan global mengubah pola sirkulasi atmosfer, menyebabkan cuaca ekstrem seperti kekeringan, banjir, dan badai yang lebih sering dan intens.', 'meteorologi', ARRAY['cuaca ekstrem', 'banjir', 'kekeringan', 'badai', 'atmosfer']),
('Pencairan Es Kutub', 'Kenaikan suhu global mempercepat pencairan es di kutub, meningkatkan permukaan air laut dan mengancam wilayah pesisir.', 'oseanografi', ARRAY['es kutub', 'permukaan laut', 'pesisir', 'pencairan']),
('Siklus Karbon', 'Aktivitas manusia mengganggu siklus karbon alami dengan melepaskan CO2 yang tersimpan dalam bahan bakar fosil selama jutaan tahun.', 'kimia', ARRAY['karbon', 'bahan bakar fosil', 'CO2', 'emisi']);