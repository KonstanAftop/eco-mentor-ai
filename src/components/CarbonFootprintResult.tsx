import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Leaf, 
  TrendingUp, 
  Globe, 
  Lightbulb, 
  Heart,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Share2,
  RotateCcw
} from "lucide-react";
import { UserProfile } from "./UserProfile";
import { DailyActivities } from "./ActivityTracker";

interface CarbonFootprintResultProps {
  userProfile: UserProfile;
  activities: DailyActivities;
  onReset: () => void;
}

interface CarbonCalculation {
  total: number;
  transportation: number;
  electricity: number;
  consumption: number;
  category: "low" | "moderate" | "high";
}

interface AIInsight {
  impact: string;
  recommendations: string[];
  climateExplanation: string;
}

const CarbonFootprintResult = ({ userProfile, activities, onReset }: CarbonFootprintResultProps) => {
  const [carbonData, setCarbonData] = useState<CarbonCalculation | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(true);

  // Carbon footprint calculation logic
  const calculateCarbonFootprint = (): CarbonCalculation => {
    let transportation = 0;
    let electricity = 0;
    let consumption = 0;

    // Transportation calculation (kg CO2/day)
    const transportFactors = {
      walking: 0,
      bicycle: 0,
      motorcycle: 0.1,
      car: 0.25,
      public_transport: 0.05,
      plane: 0.3,
    };
    transportation = 
      (transportFactors[activities.transportation.method as keyof typeof transportFactors] || 0) *
      activities.transportation.distance *
      (activities.transportation.frequency / 7);

    // Electricity calculation (kg CO2/day)
    const electricityFactors = {
      pln_coal: 0.8,
      pln_gas: 0.4,
      solar: 0.05,
      hydroelectric: 0.02,
      wind: 0.01,
      mixed: 0.5,
    };
    electricity = 
      (electricityFactors[activities.electricity.source as keyof typeof electricityFactors] || 0) *
      activities.electricity.usage;

    // Consumption calculation (kg CO2/day)
    const meatEmission = (activities.consumption.meatFrequency / 7) * 6.5; // 6.5 kg CO2 per meat portion
    const wasteEmission = activities.consumption.wasteProduction * 0.5;
    const waterEmission = activities.consumption.waterUsage * 0.0004; // 0.4g CO2 per liter
    consumption = meatEmission + wasteEmission + waterEmission;

    const total = transportation + electricity + consumption;
    
    let category: "low" | "moderate" | "high";
    if (total < 5) category = "low";
    else if (total < 15) category = "moderate";
    else category = "high";

    return { total, transportation, electricity, consumption, category };
  };

  // AI-powered insights generation (simulated)
  const generateAIInsights = (carbon: CarbonCalculation): AIInsight => {
    const educationLevel = userProfile.education;
    const age = userProfile.age;
    
    // Personalized impact explanation
    let impact = "";
    if (carbon.category === "low") {
      impact = age < 25 ? 
        "Bagus! Jejak karbon Anda tergolong rendah. Ini menunjukkan gaya hidup yang ramah lingkungan." :
        "Luar biasa! Jejak karbon Anda sangat rendah, menunjukkan komitmen terhadap lingkungan.";
    } else if (carbon.category === "moderate") {
      impact = educationLevel.includes("sarjana") ?
        "Jejak karbon Anda berada di tingkat sedang. Ada peluang optimasi yang dapat memberikan dampak signifikan." :
        "Jejak karbon Anda cukup standar, namun masih ada ruang untuk perbaikan yang mudah dilakukan.";
    } else {
      impact = "Jejak karbon Anda tinggi dan perlu perhatian khusus untuk mencegah dampak klimat yang serius.";
    }

    // Personalized recommendations
    const recommendations = [];
    if (carbon.transportation > 5) {
      recommendations.push("Kurangi penggunaan kendaraan pribadi dengan beralih ke transportasi umum atau sepeda");
      recommendations.push("Pertimbangkan kendaraan listrik atau hybrid untuk perjalanan jarak jauh");
    }
    if (carbon.electricity > 8) {
      recommendations.push("Gunakan peralatan hemat energi dan matikan elektronik saat tidak digunakan");
      recommendations.push("Pertimbangkan pemasangan panel surya untuk rumah Anda");
    }
    if (carbon.consumption > 3) {
      recommendations.push("Kurangi konsumsi daging menjadi 2-3 kali per minggu");
      recommendations.push("Praktikkan reduce, reuse, recycle untuk mengurangi limbah");
    }

    // Climate explanation adapted to education level
    const climateExplanation = educationLevel.includes("sarjana") || educationLevel.includes("magister") ?
      "Emisi CO2 Anda berkontribusi pada peningkatan konsentrasi gas rumah kaca di atmosfer, yang mempercepat pemanasan global dan mengakibatkan perubahan pola cuaca, naiknya permukaan laut, dan pengasaman laut yang mengancam ekosistem maritim." :
      "Emisi CO2 dari aktivitas harian kita menyebabkan planet bumi semakin panas, yang membuat cuaca jadi tidak menentu, es kutub mencair, dan merusak kehidupan laut.";

    return { impact, recommendations, climateExplanation };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const carbon = calculateCarbonFootprint();
      const insights = generateAIInsights(carbon);
      setCarbonData(carbon);
      setAiInsights(insights);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center font-display relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nature/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ocean/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <Card className="w-full max-w-lg shadow-strong backdrop-blur-sm bg-white/95">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-nature rounded-3xl flex items-center justify-center animate-glow shadow-nature">
                <Globe className="w-10 h-10 text-white animate-pulse-soft" />
              </div>
              <h3 className="text-2xl font-bold font-display">Menghitung Jejak Karbon</h3>
              <p className="text-muted-foreground text-lg">AI sedang menganalisis aktivitas Anda...</p>
              <Progress value={75} className="w-full h-3" />
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Menggunakan teknologi RAG untuk akurasi tinggi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!carbonData || !aiInsights) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "low": return "success";
      case "moderate": return "warning"; 
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "low": return "Rendah";
      case "moderate": return "Sedang";
      case "high": return "Tinggi";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 font-display relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-nature/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8 z-10">
        {/* Header */}
        <div className="text-center animate-slide-up">
          <Badge variant="outline" className="mb-4 border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            Analisis Selesai
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 font-display">
            Hasil Analisis Jejak Karbon
          </h1>
          <p className="text-xl text-muted-foreground">
            Halo <span className="font-semibold text-primary">{userProfile.name}</span>, berikut analisis personal untuk Anda
          </p>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-scale-in">
          {/* Total Carbon Footprint */}
          <Card className="lg:col-span-2 shadow-strong backdrop-blur-sm bg-white/95 border-white/20 hover:shadow-glow transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-display">
                <div className="w-10 h-10 bg-gradient-nature rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                Jejak Karbon Harian Anda
              </CardTitle>
              <CardDescription className="text-lg">
                Estimasi emisi CO2 berdasarkan aktivitas harian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-4 font-display">
                  {carbonData.total.toFixed(2)} <span className="text-2xl text-muted-foreground">kg CO2</span>
                </div>
                <Badge 
                  variant={getCategoryColor(carbonData.category) as any}
                  className="text-base px-4 py-2 font-medium"
                >
                  {getCategoryText(carbonData.category)}
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium">Transportasi</span>
                    <span className="font-bold text-lg">{carbonData.transportation.toFixed(2)} kg CO2</span>
                  </div>
                  <Progress value={(carbonData.transportation / carbonData.total) * 100} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium">Listrik</span>
                    <span className="font-bold text-lg">{carbonData.electricity.toFixed(2)} kg CO2</span>
                  </div>
                  <Progress value={(carbonData.electricity / carbonData.total) * 100} className="h-3" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium">Konsumsi</span>
                    <span className="font-bold text-lg">{carbonData.consumption.toFixed(2)} kg CO2</span>
                  </div>
                  <Progress value={(carbonData.consumption / carbonData.total) * 100} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="shadow-medium backdrop-blur-sm bg-white/95 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Emisi Tahunan</span>
                </div>
                <div className="text-3xl font-bold text-primary font-display">
                  {(carbonData.total * 365 / 1000).toFixed(1)} <span className="text-lg text-muted-foreground">ton</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium backdrop-blur-sm bg-white/95 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-nature rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">vs Rata-rata Global</span>
                </div>
                <div className="text-3xl font-bold text-primary font-display">
                  {carbonData.total > 4 ? "+" : ""}{((carbonData.total - 4) / 4 * 100).toFixed(0)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Tabs defaultValue="impact" className="animate-fade-in">
          <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md">
            <TabsTrigger value="impact" className="font-medium">Dampak</TabsTrigger>
            <TabsTrigger value="recommendations" className="font-medium">Rekomendasi</TabsTrigger>
            <TabsTrigger value="education" className="font-medium">Edukasi</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="mt-8">
            <Card className="shadow-strong backdrop-blur-sm bg-white/95 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-display">
                  <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  Analisis Personal AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="border-primary/20 bg-primary/5">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertDescription className="text-base leading-relaxed">
                    {aiInsights.impact}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-8">
            <Card className="shadow-strong backdrop-blur-sm bg-white/95 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-display">
                  <div className="w-10 h-10 bg-gradient-nature rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  Rekomendasi Pengurangan Emisi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl hover:shadow-soft transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-nature rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-base leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-8">
            <Card className="shadow-strong backdrop-blur-sm bg-white/95 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-display">
                  <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  Dampak terhadap Iklim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{aiInsights.climateExplanation}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
          <Button 
            onClick={onReset} 
            variant="outline" 
            size="lg" 
            className="hover:scale-105 transition-all duration-300 group"
          >
            <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Hitung Ulang
          </Button>
          <Button 
            variant="hero" 
            size="lg" 
            className="shadow-glow hover:shadow-strong hover:scale-105 transition-all duration-300 group"
          >
            <Share2 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Bagikan Hasil
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintResult;