import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Brain, 
  Users, 
  Target,
  Globe,
  Lightbulb,
  Heart,
  TrendingDown
} from "lucide-react";
import heroImage from "@/assets/climate-hero.jpg";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Climate education illustration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-sm">
              Prototype Media Pembelajaran Digital
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Edukasi Iklim
              </span>
              <br />
              <span className="text-foreground">dengan AI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Platform pembelajaran interaktif yang menggunakan kecerdasan buatan untuk memberikan 
              edukasi perubahan iklim yang personal dan inklusif berdasarkan jejak karbon aktivitas harian Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStart} variant="hero" size="lg" className="text-lg px-8 py-6">
                <Leaf className="w-5 h-5 mr-2" />
                Mulai Analisis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Globe className="w-5 h-5 mr-2" />
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Teknologi AI canggih yang menghadirkan pembelajaran iklim yang personal dan mudah dipahami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">AI Personal</CardTitle>
                <CardDescription>
                  Analisis jejak karbon dengan rekomendasi khusus untuk profil dan aktivitas Anda
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">RAG Technology</CardTitle>
                <CardDescription>
                  Basis pengetahuan meteorologi, oseanografi, dan kimia untuk informasi akurat
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Inklusif</CardTitle>
                <CardDescription>
                  Bahasa dan konten yang disesuaikan dengan latar belakang pendidikan pengguna
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Actionable</CardTitle>
                <CardDescription>
                  Rekomendasi praktis untuk mengurangi emisi dalam kehidupan sehari-hari
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Proses sederhana dengan hasil yang mendalam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Profil & Aktivitas</h3>
              <p className="text-muted-foreground">
                Masukkan informasi personal dan aktivitas harian seperti transportasi, penggunaan listrik, dan pola konsumsi
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Analisis AI</h3>
              <p className="text-muted-foreground">
                AI menghitung jejak karbon dan menganalisis dampak terhadap proses iklim menggunakan teknologi RAG
              </p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Rekomendasi Personal</h3>
              <p className="text-muted-foreground">
                Terima penjelasan yang mudah dipahami dan rekomendasi spesifik untuk mengurangi emisi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">1.5°C</div>
              <div className="text-sm text-muted-foreground">Ambang Batas Paris Agreement</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-success mb-2">AI</div>
              <div className="text-sm text-muted-foreground">Powered Learning</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-ocean mb-2">RAG</div>
              <div className="text-sm text-muted-foreground">Technology</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-warning mb-2">Personal</div>
              <div className="text-sm text-muted-foreground">Recommendations</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mulai Perjalanan Anda Menuju Gaya Hidup Berkelanjutan
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dapatkan wawasan personal tentang jejak karbon Anda dan pelajari cara berkontribusi 
            pada masa depan planet yang lebih baik.
          </p>
          <Button onClick={onStart} variant="secondary" size="lg" className="text-lg px-8 py-6">
            <Heart className="w-5 h-5 mr-2" />
            Mulai Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;