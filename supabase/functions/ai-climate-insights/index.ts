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
    const { carbonFootprint, userProfile, activityData } = await req.json();
    
    console.log('Generating AI insights for carbon footprint:', carbonFootprint);

    // Inisialisasi Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // RAG: Ambil knowledge base yang relevan
    const { data: knowledgeBase, error: kbError } = await supabase
      .from('climate_knowledge')
      .select('*');

    if (kbError) {
      console.error('Error fetching knowledge base:', kbError);
    }

    // Buat context dari knowledge base
    const knowledgeContext = knowledgeBase?.map(kb => 
      `${kb.topic} (${kb.category}): ${kb.content}`
    ).join('\n\n');

    // Prompt Engineering: Disesuaikan dengan profil user
    const educationPrompt = userProfile?.educationLevel === 'SD' || userProfile?.educationLevel === 'SMP'
      ? 'Gunakan bahasa yang sangat sederhana dan contoh sehari-hari yang mudah dipahami.'
      : userProfile?.educationLevel === 'SMA'
      ? 'Gunakan bahasa yang jelas dengan penjelasan ilmiah sederhana.'
      : 'Gunakan penjelasan ilmiah yang komprehensif dengan istilah teknis yang tepat.';

    const agePrompt = userProfile?.age && userProfile.age < 18
      ? 'Sampaikan dengan gaya yang friendly dan menggunakan contoh yang relatable untuk remaja.'
      : 'Sampaikan dengan gaya profesional dan informatif.';

    const systemPrompt = `Anda adalah AI edukator iklim yang membantu pengguna memahami dampak jejak karbon mereka terhadap perubahan iklim.

PROFIL PENGGUNA:
- Usia: ${userProfile?.age || 'tidak diketahui'}
- Tingkat Pendidikan: ${userProfile?.educationLevel || 'tidak diketahui'}

INSTRUKSI PENYAMPAIAN:
${educationPrompt}
${agePrompt}

KNOWLEDGE BASE (Referensi Ilmiah):
${knowledgeContext}

Jelaskan dampak emisi karbon sebesar ${carbonFootprint} kg CO2 terhadap proses iklim dengan mengacu pada knowledge base di atas. Fokus pada:
1. Efek rumah kaca dan pemanasan global
2. Dampak terhadap laut (pengasaman laut)
3. Perubahan pola cuaca
4. Berikan 3-5 rekomendasi konkret untuk mengurangi emisi sesuai dengan aktivitas user`;

    // Call Lovable AI Gateway
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Aktivitas saya: Transportasi=${activityData.transportation}, Listrik=${activityData.electricityUsage} kWh, Konsumsi=${activityData.consumptionPattern}. Jejak karbon saya: ${carbonFootprint} kg CO2. Jelaskan dampaknya dan berikan rekomendasi personal.`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error('AI gateway error');
    }

    const aiData = await aiResponse.json();
    const insights = aiData.choices[0].message.content;

    console.log('AI insights generated successfully');

    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating AI insights:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
