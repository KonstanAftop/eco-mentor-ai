import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { carbonFootprint, userProfile, breakdown } = await req.json();
    
    console.log('Generating AI insights for:', { carbonFootprint, userProfile, breakdown });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Retrieve climate knowledge dari database (RAG)
    const { data: climateKnowledge, error: knowledgeError } = await supabase
      .from('climate_knowledge')
      .select('*');

    if (knowledgeError) {
      console.error('Error fetching climate knowledge:', knowledgeError);
    }

    // Format knowledge base untuk RAG
    const knowledgeContext = climateKnowledge?.map(k => 
      `[${k.category}] ${k.topic}: ${k.content}`
    ).join('\n\n') || '';

    console.log('Retrieved climate knowledge entries:', climateKnowledge?.length || 0);

    // Prompt engineering untuk personalisasi berdasarkan profil user
    const educationLevel = userProfile?.educationLevel || 'umum';
    const age = userProfile?.age || 25;

    let languageStyle = '';
    if (educationLevel === 'SD' || age < 12) {
      languageStyle = 'Gunakan bahasa yang sangat sederhana dan mudah dipahami anak-anak. Gunakan analogi sehari-hari yang mudah dimengerti.';
    } else if (educationLevel === 'SMP' || age < 15) {
      languageStyle = 'Gunakan bahasa yang sederhana namun informatif. Berikan contoh konkret dari kehidupan sehari-hari.';
    } else if (educationLevel === 'SMA' || age < 18) {
      languageStyle = 'Gunakan bahasa yang jelas dengan beberapa istilah ilmiah. Jelaskan konsep dengan cukup detail.';
    } else {
      languageStyle = 'Gunakan bahasa yang informatif dan edukatif. Boleh gunakan istilah ilmiah dengan penjelasan yang tepat.';
    }

    const systemPrompt = `Anda adalah asisten edukasi perubahan iklim yang personal dan inklusif. 

KONTEKS PENGETAHUAN IKLIM (RAG):
${knowledgeContext}

PROFIL PENGGUNA:
- Usia: ${age} tahun
- Tingkat Pendidikan: ${educationLevel}

GAYA BAHASA:
${languageStyle}

Tugas Anda:
1. Jelaskan dampak jejak karbon pengguna terhadap proses iklim menggunakan pengetahuan di atas
2. Hubungkan emisi mereka dengan dampak konkret (pengasaman laut, efek rumah kaca, perubahan cuaca)
3. Berikan rekomendasi pengurangan emisi yang spesifik dan praktis
4. Sesuaikan penjelasan dengan latar belakang pengguna

Format jawaban dalam 3 bagian:
1. DAMPAK IKLIM (2-3 paragraf)
2. REKOMENDASI (3-5 poin konkret)
3. MOTIVASI (1 paragraf inspiratif)`;

    const userPrompt = `Jejak karbon saya adalah ${carbonFootprint.toFixed(2)} kg CO2/bulan (${(carbonFootprint * 12 / 1000).toFixed(2)} ton CO2/tahun).

Detail emisi saya:
- Transportasi: ${breakdown.transport.toFixed(2)} kg CO2/bulan
- Listrik: ${breakdown.electricity.toFixed(2)} kg CO2/bulan  
- Konsumsi: ${breakdown.consumption.toFixed(2)} kg CO2/bulan

Tolong jelaskan dampak emisi saya terhadap perubahan iklim dan berikan rekomendasi personal untuk menguranginya.`;

    console.log('Calling Lovable AI...');

    // Call Lovable AI Gateway dengan model Gemini (GRATIS!)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit tercapai. Silakan coba lagi nanti.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Kredit AI habis. Silakan tambahkan kredit di workspace settings.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const insights = aiData.choices[0].message.content;

    console.log('AI insights generated successfully');

    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
