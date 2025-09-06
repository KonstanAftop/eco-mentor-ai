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
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-strong animate-fade-in">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-nature bg-clip-text text-transparent">
            Profil Pengguna
          </CardTitle>
          <CardDescription>
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

            <Button type="submit" className="w-full mt-6" variant="nature">
              <GraduationCap className="w-4 h-4 mr-2" />
              Mulai Belajar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;