import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transportation, electricityUsage, consumptionPattern, userProfile } = await req.json();
    
    console.log('Calculating carbon footprint:', { transportation, electricityUsage, consumptionPattern });

    // Faktor emisi (kg CO2 per unit)
    const emissionFactors = {
      // Transportasi (per km)
      'mobil_pribadi': 0.21,
      'motor': 0.08,
      'bus': 0.05,
      'kereta': 0.04,
      'sepeda': 0,
      'jalan_kaki': 0,
      
      // Listrik (per kWh)
      'electricity': 0.85,
      
      // Konsumsi
      'daging_tinggi': 7.2,
      'daging_sedang': 5.6,
      'vegetarian': 3.8,
      'vegan': 2.9,
    };

    // Hitung emisi transportasi (asumsi 30 km/hari)
    const transportEmission = (emissionFactors[transportation as keyof typeof emissionFactors] || 0) * 30 * 30; // per bulan
    
    // Hitung emisi listrik
    const electricityEmission = electricityUsage * emissionFactors.electricity;
    
    // Hitung emisi konsumsi (per bulan)
    const consumptionEmission = emissionFactors[consumptionPattern as keyof typeof emissionFactors] || 0;
    
    // Total jejak karbon (kg CO2/bulan)
    const totalCarbonFootprint = transportEmission + electricityEmission + consumptionEmission;
    
    // Konversi ke ton CO2/tahun
    const annualCarbonFootprint = (totalCarbonFootprint * 12) / 1000;

    console.log('Carbon footprint calculated:', { 
      transportEmission, 
      electricityEmission, 
      consumptionEmission, 
      totalCarbonFootprint,
      annualCarbonFootprint 
    });

    return new Response(
      JSON.stringify({ 
        carbonFootprint: totalCarbonFootprint,
        annualCarbonFootprint,
        breakdown: {
          transport: transportEmission,
          electricity: electricityEmission,
          consumption: consumptionEmission
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calculating carbon footprint:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
