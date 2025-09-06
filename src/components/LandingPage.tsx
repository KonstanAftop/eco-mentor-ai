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
  Sparkles,
  ArrowRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/climate-hero.jpg";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const features = [
    {
      icon: Brain,
      title: "AI Personal",
      description: "Analisis jejak karbon dengan rekomendasi khusus untuk profil dan aktivitas Anda",
      color: "nature",
      delay: "0ms"
    },
    {
      icon: Target,
      title: "RAG Technology",
      description: "Basis pengetahuan meteorologi, oseanografi, dan kimia untuk informasi akurat",
      color: "ocean",
      delay: "200ms"
    },
    {
      icon: Users,
      title: "Inklusif",
      description: "Bahasa dan konten yang disesuaikan dengan latar belakang pendidikan pengguna",
      color: "nature",
      delay: "400ms"
    },
    {
      icon: Lightbulb,
      title: "Actionable",
      description: "Rekomendasi praktis untuk mengurangi emisi dalam kehidupan sehari-hari",
      color: "ocean",
      delay: "600ms"
    }
  ];

  const stats = [
    { value: "1.5°C", label: "Ambang Batas Paris Agreement", icon: Globe },
    { value: "AI", label: "Powered Learning", icon: Brain },
    { value: "RAG", label: "Technology", icon: Target },
    { value: "Personal", label: "Recommendations", icon: Heart },
  ];

  return (
    <div className="min-h-screen font-display">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-pulse-soft"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nature/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ocean/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Climate education illustration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center z-10">
          <div className="animate-slide-up">
            <Badge variant="secondary" className="mb-6 text-sm backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Prototype Media Pembelajaran Digital
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-glow">
                Edukasi Iklim
              </span>
              <br />
              <span className="text-white drop-shadow-lg">dengan AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
              Platform pembelajaran interaktif yang menggunakan kecerdasan buatan untuk memberikan 
              edukasi perubahan iklim yang <span className="text-yellow-300 font-semibold">personal</span> dan 
              <span className="text-green-300 font-semibold"> inklusif</span> berdasarkan jejak karbon aktivitas harian Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={onStart} 
                variant="hero" 
                size="lg" 
                className="text-lg px-10 py-6 shadow-glow hover:shadow-strong hover:scale-105 transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Mulai Analisis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-2" />
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-gradient-nature rounded-full opacity-20 blur-sm"></div>
        </div>
        <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-12 h-12 bg-gradient-ocean rounded-full opacity-20 blur-sm"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <Badge variant="outline" className="mb-4 border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Teknologi Terdepan
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Fitur Unggulan <span className="bg-gradient-nature bg-clip-text text-transparent">Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Teknologi AI canggih yang menghadirkan pembelajaran iklim yang personal dan mudah dipahami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-card backdrop-blur-sm hover:bg-white/90"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-6 w-16 h-16 bg-gradient-${feature.color} rounded-2xl flex items-center justify-center shadow-${feature.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Cara Kerja <span className="bg-gradient-ocean bg-clip-text text-transparent">Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Proses sederhana dengan hasil yang mendalam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Input Profil & Aktivitas",
                description: "Masukkan informasi personal dan aktivitas harian seperti transportasi, penggunaan listrik, dan pola konsumsi",
                color: "nature"
              },
              {
                step: "2", 
                title: "Analisis AI",
                description: "AI menghitung jejak karbon dan menganalisis dampak terhadap proses iklim menggunakan teknologi RAG",
                color: "ocean"
              },
              {
                step: "3",
                title: "Rekomendasi Personal", 
                description: "Terima penjelasan yang mudah dipahami dan rekomendasi spesifik untuk mengurangi emisi",
                color: "hero"
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-up group" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`mx-auto mb-8 w-20 h-20 bg-gradient-${item.color} rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-${item.color === "hero" ? "glow" : item.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 bg-gradient-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group animate-scale-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <stat.icon className="w-8 h-8 mx-auto text-primary group-hover:text-ocean transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10 animate-slide-up">
          <Badge variant="secondary" className="mb-6 backdrop-blur-md bg-white/10 border-white/20">
            <Heart className="w-3 h-3 mr-1" />
            Bergabunglah dengan Gerakan Hijau
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display leading-tight">
            Mulai Perjalanan Anda Menuju<br />
            <span className="text-yellow-300">Gaya Hidup Berkelanjutan</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Dapatkan wawasan personal tentang jejak karbon Anda dan pelajari cara berkontribusi 
            pada masa depan planet yang lebih baik.
          </p>
          
          <Button 
            onClick={onStart} 
            variant="secondary" 
            size="lg" 
            className="text-lg px-12 py-6 shadow-strong hover:shadow-glow hover:scale-105 transition-all duration-300 group font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;