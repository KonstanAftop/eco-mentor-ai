import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    
    console.log('Calculating carbon footprint for:', { transportation, electricityUsage, consumptionPattern });

    // Kalkulasi jejak karbon (dalam kg CO2)
    let carbonFootprint = 0;

    // 1. Transportasi
    const transportEmissions: Record<string, number> = {
      'mobil-bensin': 2.3, // kg CO2 per liter
      'motor': 1.2,
      'mobil-listrik': 0.5,
      'angkutan-umum': 0.4,
      'sepeda': 0,
      'jalan-kaki': 0
    };
    carbonFootprint += transportEmissions[transportation] || 0;

    // 2. Penggunaan Listrik (kWh ke kg CO2)
    const electricityEmissionFactor = 0.85; // kg CO2 per kWh (Indonesia average)
    carbonFootprint += electricityUsage * electricityEmissionFactor;

    // 3. Pola Konsumsi
    const consumptionEmissions: Record<string, number> = {
      'boros': 5.0,
      'sedang': 2.5,
      'hemat': 1.0,
      'sangat-hemat': 0.5
    };
    carbonFootprint += consumptionEmissions[consumptionPattern] || 0;

    console.log('Carbon footprint calculated:', carbonFootprint);

    return new Response(
      JSON.stringify({ 
        carbonFootprint: carbonFootprint.toFixed(2),
        breakdown: {
          transportation: (transportEmissions[transportation] || 0).toFixed(2),
          electricity: (electricityUsage * electricityEmissionFactor).toFixed(2),
          consumption: (consumptionEmissions[consumptionPattern] || 0).toFixed(2)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calculating carbon footprint:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
