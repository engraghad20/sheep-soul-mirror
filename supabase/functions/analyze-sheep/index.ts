// Edge function: analyze-sheep
// Uses Lovable AI Gateway to produce a deep, professional, humorous Arabic
// "Eid Sheep Personality" analysis via structured tool calling.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ACCESSORIES = [
  "glasses", "book", "headband", "medal", "sleepMask", "pillow",
  "cape", "star", "crown", "tie", "flower", "teacup",
  "headphones", "phone", "sunglasses", "drink",
];

const SYSTEM_PROMPT = `أنت محلل شخصيات إبداعي خبير، متخصص في إنتاج تحليلات شخصية عربية فكاهية وذكية لعيد الأضحى تحت اسم "خروفك.. مِرآة روحك".

مهمتك: إنتاج تحليل شخصية عميق ودقيق ومضحك ومصقول بشكل احترافي يربط شخصية المستخدم بـ"خروف عيد" خيالي.

قواعد صارمة:
- اكتب بالعربية الفصحى المبسّطة الممزوجة بلمسة خليجية خفيفة (ودود، عصري، مرح، غير مبتذل).
- اللهجة: ذكية، ساخرة بأناقة، دافئة، إيجابية. تجنّب الإهانة أو السخرية الجارحة.
- التحليل يجب أن يكون **شخصياً ومخصصاً** للاسم والصفات المُعطاة، وليس عاماً.
- الوصف 2-3 جمل غنية بالمعنى، تكشف عن جوهر الشخصية بطريقة طريفة وبليغة.
- العبارة الشهيرة (catchphrase) قصيرة جداً (3-7 كلمات)، أيقونية، تصلح كاقتباس مشاركة.
- اخرج لقباً فريداً ومبتكراً يدمج بين الصفات (مثلاً: "خروف الفيلسوف الكسول"، "جنرال القطيع").
- اختر لوناً رئيسياً وثانوياً بصيغة hex (#RRGGBB) منسجمين بصرياً ويعكسان مزاج الشخصية.
- اختر 2-3 إكسسوارات من القائمة المسموحة فقط.
- أضف تحليلاً عميقاً يشمل: نقاط القوة، الجانب الخفي، نصيحة العيد.

كل المحتوى يجب أن يكون ممتازاً، صقيلاً، جاهزاً للنشر والمشاركة على منصات التواصل.`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "generate_sheep_personality",
    description: "تُرجع تحليل شخصية الخروف الكامل والمنسّق",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "اللقب القصير المبتكر (1-3 كلمات) مثل 'الفيلسوف' أو 'الجنرال الكاريزمي'",
        },
        type: {
          type: "string",
          description: "النوع الكامل بصيغة 'خروف {الاسم} - {اللقب}' أو 'خروف {اللقب}'",
        },
        description: {
          type: "string",
          description: "وصف عميق وطريف للشخصية (2-3 جمل، 25-50 كلمة) يكشف الجوهر بدقة وذكاء",
        },
        catchphrase: {
          type: "string",
          description: "عبارة أيقونية قصيرة جداً (3-7 كلمات) تلخص الشخصية، بدون علامات اقتباس",
        },
        emoji: {
          type: "string",
          description: "إيموجي واحد يمثّل الشخصية بدقة",
        },
        color: {
          type: "string",
          description: "اللون الرئيسي بصيغة hex مثل #6C63FF",
          pattern: "^#[0-9A-Fa-f]{6}$",
        },
        secondaryColor: {
          type: "string",
          description: "اللون الثانوي المنسجم بصيغة hex",
          pattern: "^#[0-9A-Fa-f]{6}$",
        },
        accessories: {
          type: "array",
          description: "إكسسوارات من القائمة المسموحة فقط",
          items: {
            type: "string",
            enum: ACCESSORIES,
          },
          minItems: 1,
          maxItems: 3,
        },
        strengths: {
          type: "array",
          description: "3 نقاط قوة قصيرة (كل واحدة 2-5 كلمات) تبدأ بإيموجي مناسب",
          items: { type: "string" },
          minItems: 3,
          maxItems: 3,
        },
        hidden_trait: {
          type: "string",
          description: "صفة خفية مفاجئة وطريفة عن الشخصية (جملة واحدة، 8-15 كلمة)",
        },
        eid_advice: {
          type: "string",
          description: "نصيحة العيد المخصصة بأسلوب فكاهي دافئ (جملة واحدة، 10-20 كلمة)",
        },
        compatibility: {
          type: "string",
          description: "نوع الخروف المتوافق معه (مثلاً: 'خروف الرايق' أو 'خروف الفزّاع')",
        },
      },
      required: [
        "title", "type", "description", "catchphrase", "emoji",
        "color", "secondaryColor", "accessories",
        "strengths", "hidden_trait", "eid_advice", "compatibility",
      ],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, traits } = await req.json();

    if (!name || !Array.isArray(traits) || traits.length === 0) {
      return new Response(
        JSON.stringify({ error: "name and traits are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userPrompt = `الاسم: ${name}
الصفات المختارة: ${traits.join("، ")}

حلل شخصية "${name}" بناءً على هذه الصفات وأنتج "خروف العيد" الخاص به/بها.
- ادمج الصفات بذكاء في لقب واحد متكامل.
- اجعل الوصف يلامس جوهر الشخصية بدقة.
- اختر ألواناً وإكسسوارات تعكس المزاج العام للصفات.
- اجعل النتيجة فريدة لاسم "${name}" تحديداً.`;

    const aiRes = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          tools: [TOOL_SCHEMA],
          tool_choice: {
            type: "function",
            function: { name: "generate_sheep_personality" },
          },
        }),
      },
    );

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, errText);
      if (aiRes.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز الحد المسموح. حاول مرة أخرى بعد قليل." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiRes.status === 402) {
        return new Response(
          JSON.stringify({ error: "نفدت رصيد الذكاء الاصطناعي. أضف رصيداً للمتابعة." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: "فشل التحليل بالذكاء الاصطناعي" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await aiRes.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "استجابة غير متوقعة من الذكاء الاصطناعي" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const personality = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ personality }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-sheep error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
