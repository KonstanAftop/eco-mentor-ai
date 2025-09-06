import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Car, Zap, ShoppingCart, Calculator } from "lucide-react";

export interface DailyActivities {
  transportation: {
    method: string;
    distance: number;
    frequency: number;
  };
  electricity: {
    usage: number;
    source: string;
  };
  consumption: {
    meatFrequency: number;
    wasteProduction: number;
    waterUsage: number;
  };
}

interface ActivityTrackerProps {
  onCalculate: (activities: DailyActivities) => void;
}

const ActivityTracker = ({ onCalculate }: ActivityTrackerProps) => {
  const [activities, setActivities] = useState<DailyActivities>({
    transportation: { method: "", distance: 0, frequency: 0 },
    electricity: { usage: 0, source: "" },
    consumption: { meatFrequency: 0, wasteProduction: 0, waterUsage: 0 },
  });

  const handleSubmit = () => {
    if (activities.transportation.method && activities.electricity.source) {
      onCalculate(activities);
    }
  };

  const isFormValid = () => {
    return (
      activities.transportation.method &&
      activities.transportation.distance > 0 &&
      activities.electricity.usage > 0 &&
      activities.electricity.source &&
      activities.consumption.meatFrequency >= 0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 font-display relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-nature/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="text-center mb-12 animate-slide-up">
          <Badge variant="outline" className="mb-4 border-primary/20 backdrop-blur-sm">
            <Calculator className="w-3 h-3 mr-1" />
            Input Data
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-6 font-display">
            Tracking Aktivitas Harian
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Catat aktivitas harian Anda untuk menghitung jejak karbon dan mendapatkan rekomendasi personal
          </p>
        </div>

        <Card className="shadow-strong animate-scale-in backdrop-blur-sm bg-white/95 border-white/20 hover:shadow-glow transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Input Aktivitas Harian
            </CardTitle>
            <CardDescription>
              Lengkapi informasi berikut untuk analisis jejak karbon yang akurat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transportation" className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="transportation" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Transportasi
                </TabsTrigger>
                <TabsTrigger value="electricity" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Listrik
                </TabsTrigger>
                <TabsTrigger value="consumption" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Konsumsi
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transportation" className="space-y-4">
                <div className="space-y-2">
                  <Label>Metode Transportasi Utama</Label>
                  <Select
                    onValueChange={(value) =>
                      setActivities({
                        ...activities,
                        transportation: { ...activities.transportation, method: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode transportasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walking">Jalan Kaki</SelectItem>
                      <SelectItem value="bicycle">Sepeda</SelectItem>
                      <SelectItem value="motorcycle">Motor</SelectItem>
                      <SelectItem value="car">Mobil Pribadi</SelectItem>
                      <SelectItem value="public_transport">Transportasi Umum</SelectItem>
                      <SelectItem value="plane">Pesawat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Jarak Harian (km)</Label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={activities.transportation.distance || ""}
                      onChange={(e) =>
                        setActivities({
                          ...activities,
                          transportation: {
                            ...activities.transportation,
                            distance: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frekuensi per Minggu</Label>
                    <Input
                      type="number"
                      placeholder="7"
                      value={activities.transportation.frequency || ""}
                      onChange={(e) =>
                        setActivities({
                          ...activities,
                          transportation: {
                            ...activities.transportation,
                            frequency: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="electricity" className="space-y-4">
                <div className="space-y-2">
                  <Label>Sumber Listrik Utama</Label>
                  <Select
                    onValueChange={(value) =>
                      setActivities({
                        ...activities,
                        electricity: { ...activities.electricity, source: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sumber listrik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pln_coal">PLN (Batubara)</SelectItem>
                      <SelectItem value="pln_gas">PLN (Gas Alam)</SelectItem>
                      <SelectItem value="solar">Panel Surya</SelectItem>
                      <SelectItem value="hydroelectric">Hidro Elektrik</SelectItem>
                      <SelectItem value="wind">Angin</SelectItem>
                      <SelectItem value="mixed">Campuran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Penggunaan Listrik Harian (kWh)</Label>
                  <Input
                    type="number"
                    placeholder="15"
                    value={activities.electricity.usage || ""}
                    onChange={(e) =>
                      setActivities({
                        ...activities,
                        electricity: {
                          ...activities.electricity,
                          usage: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Rata-rata rumah tangga: 10-20 kWh/hari
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="consumption" className="space-y-4">
                <div className="space-y-2">
                  <Label>Konsumsi Daging per Minggu (porsi)</Label>
                  <Input
                    type="number"
                    placeholder="7"
                    value={activities.consumption.meatFrequency || ""}
                    onChange={(e) =>
                      setActivities({
                        ...activities,
                        consumption: {
                          ...activities.consumption,
                          meatFrequency: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Produksi Sampah Harian (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={activities.consumption.wasteProduction || ""}
                    onChange={(e) =>
                      setActivities({
                        ...activities,
                        consumption: {
                          ...activities.consumption,
                          wasteProduction: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Penggunaan Air Harian (liter)</Label>
                  <Input
                    type="number"
                    placeholder="200"
                    value={activities.consumption.waterUsage || ""}
                    onChange={(e) =>
                      setActivities({
                        ...activities,
                        consumption: {
                          ...activities.consumption,
                          waterUsage: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Rata-rata: 150-300 liter/hari
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              variant="hero"
              size="lg"
              className="w-full mt-8 shadow-glow hover:shadow-strong hover:scale-105 transition-all duration-300 group"
            >
              <Calculator className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Hitung Jejak Karbon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityTracker;