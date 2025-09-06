import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, GraduationCap } from "lucide-react";

interface UserProfileProps {
  onComplete: (profile: UserProfile) => void;
}

export interface UserProfile {
  name: string;
  age: number;
  education: string;
  location: string;
}

const UserProfile = ({ onComplete }: UserProfileProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: 0,
    education: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.age && profile.education && profile.location) {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 font-display relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nature/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ocean/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <Card className="w-full max-w-lg shadow-strong animate-scale-in backdrop-blur-sm bg-white/95 border-white/20 hover:shadow-glow transition-all duration-500">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-nature rounded-3xl flex items-center justify-center shadow-nature animate-float">
            <User className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-nature bg-clip-text text-transparent font-display">
            Profil Pengguna
          </CardTitle>
          <CardDescription className="text-lg">
            Mari berkenalan untuk memberikan edukasi iklim yang personal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Usia</Label>
              <Input
                id="age"
                type="number"
                value={profile.age || ""}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                placeholder="Masukkan usia Anda"
                required
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Tingkat Pendidikan</Label>
              <Select onValueChange={(value) => setProfile({ ...profile, education: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tingkat pendidikan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sd">SD/Sederajat</SelectItem>
                  <SelectItem value="smp">SMP/Sederajat</SelectItem>
                  <SelectItem value="sma">SMA/Sederajat</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="sarjana">Sarjana (S1)</SelectItem>
                  <SelectItem value="magister">Magister (S2)</SelectItem>
                  <SelectItem value="doktor">Doktor (S3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Kota/Kabupaten"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-8 shadow-nature hover:shadow-glow hover:scale-105 transition-all duration-300 group" variant="nature" size="lg">
              <GraduationCap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Mulai Belajar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;