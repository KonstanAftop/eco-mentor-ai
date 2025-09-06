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
  TrendingDown, 
  Globe, 
  Lightbulb, 
  Heart,
  AlertTriangle,
  CheckCircle
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
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-medium">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center animate-pulse-soft">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Menghitung Jejak Karbon</h3>
              <p className="text-muted-foreground">AI sedang menganalisis aktivitas Anda...</p>
              <Progress value={75} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!carbonData || !aiInsights) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Hasil Analisis Jejak Karbon
          </h1>
          <p className="text-muted-foreground">
            Halo {userProfile.name}, berikut analisis personal untuk Anda
          </p>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Total Carbon Footprint */}
          <Card className="lg:col-span-2 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-nature" />
                Jejak Karbon Harian Anda
              </CardTitle>
              <CardDescription>
                Estimasi emisi CO2 berdasarkan aktivitas harian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {carbonData.total.toFixed(2)} kg CO2
                </div>
                <Badge 
                  variant={carbonData.category === "low" ? "default" : carbonData.category === "moderate" ? "secondary" : "destructive"}
                  className="text-sm"
                >
                  {carbonData.category === "low" ? "Rendah" : carbonData.category === "moderate" ? "Sedang" : "Tinggi"}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Transportasi</span>
                  <span className="font-medium">{carbonData.transportation.toFixed(2)} kg CO2</span>
                </div>
                <Progress value={(carbonData.transportation / carbonData.total) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Listrik</span>
                  <span className="font-medium">{carbonData.electricity.toFixed(2)} kg CO2</span>
                </div>
                <Progress value={(carbonData.electricity / carbonData.total) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Konsumsi</span>
                  <span className="font-medium">{carbonData.consumption.toFixed(2)} kg CO2</span>
                </div>
                <Progress value={(carbonData.consumption / carbonData.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">Emisi Tahunan</span>
                </div>
                <div className="text-2xl font-bold text-warning">
                  {(carbonData.total * 365 / 1000).toFixed(1)} ton
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-ocean" />
                  <span className="text-sm font-medium">vs Rata-rata Global</span>
                </div>
                <div className="text-2xl font-bold text-ocean">
                  {carbonData.total > 4 ? "+" : ""}{((carbonData.total - 4) / 4 * 100).toFixed(0)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Tabs defaultValue="impact" className="animate-fade-in">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="impact">Dampak</TabsTrigger>
            <TabsTrigger value="recommendations">Rekomendasi</TabsTrigger>
            <TabsTrigger value="education">Edukasi</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="mt-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Analisis Personal AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-base">
                    {aiInsights.impact}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Rekomendasi Pengurangan Emisi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-ocean" />
                  Dampak terhadap Iklim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{aiInsights.climateExplanation}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center animate-fade-in">
          <Button onClick={onReset} variant="outline" size="lg">
            Hitung Ulang
          </Button>
          <Button variant="hero" size="lg">
            Bagikan Hasil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintResult;