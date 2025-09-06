import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import UserProfile, { UserProfile as UserProfileType } from "@/components/UserProfile";
import ActivityTracker, { DailyActivities } from "@/components/ActivityTracker";
import CarbonFootprintResult from "@/components/CarbonFootprintResult";

type AppStep = "landing" | "profile" | "activities" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing");
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [activities, setActivities] = useState<DailyActivities | null>(null);

  const handleStart = () => {
    setCurrentStep("profile");
  };

  const handleProfileComplete = (profile: UserProfileType) => {
    setUserProfile(profile);
    setCurrentStep("activities");
  };

  const handleActivitiesComplete = (activitiesData: DailyActivities) => {
    setActivities(activitiesData);
    setCurrentStep("results");
  };

  const handleReset = () => {
    setCurrentStep("landing");
    setUserProfile(null);
    setActivities(null);
  };

  return (
    <div className="min-h-screen">
      {currentStep === "landing" && <LandingPage onStart={handleStart} />}
      {currentStep === "profile" && <UserProfile onComplete={handleProfileComplete} />}
      {currentStep === "activities" && <ActivityTracker onCalculate={handleActivitiesComplete} />}
      {currentStep === "results" && userProfile && activities && (
        <CarbonFootprintResult 
          userProfile={userProfile}
          activities={activities}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default Index;
