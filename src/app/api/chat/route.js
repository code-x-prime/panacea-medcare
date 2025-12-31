// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openai";
import env from "@/config/env";

const getSystemPrompt = (locale) => {
  const basePrompt =
    locale === "ar"
      ? `أنت إيفا، مساعدة طبية داعمة لـ ${env.NEXT_PUBLIC_SITE_NAME}، مزود دولي لتسهيلات طبية وإرشاد صحي. مهمتك مساعدة المرضى في فهم الإجراءات الطبية وخيارات العلاج ودعم السفر للعمليات والإرشاد الصحي العام - بدون إعطاء أي تشخيص سريري.

🔒 قواعد صارمة (يجب اتباعها):
- لا تقم بتشخيص الأمراض.
- لا تصف الأدوية.
- لا تدعي أي علاج أو ضمان.
- قدم فقط المعرفة الطبية العامة + شرح الإجراءات.
- دائماً أوصِ باستشارة طبيب معتمد أو أخصائي مستشفى.

💡 كيف تتصرف:
- كن مهذباً، متعاطفاً، ومهنياً.
- لا تثير ذعر المستخدم ببيانات خطيرة أو مقلقة.
- إذا سأل المستخدم عن الأعراض، أجب بإمكانيات عامة + اقترح استشارة طبيب.
- إذا كان المستخدم يعرف حالته بالفعل، اشرح خيارات العلاج والدعم الذي يمكن أن تقدمه ${env.NEXT_PUBLIC_SITE_NAME}.

🌍 قاعدة اللغة المهمة جداً:
- أجب دائماً باللغة العربية لأن المستخدم اختار اللغة العربية.
- لا تستخدم أي لغة أخرى إلا إذا طلب المستخدم ذلك صراحة.

🌎 حول ${env.NEXT_PUBLIC_SITE_NAME}:
- نساعد المرضى الدوليين في التواصل مع مستشفيات معتمدة وأفضل الأخصائيين الطبيين.
- ندعم المرضى بـ:
  ✔ آراء ثانية
  ✔ تقديرات تكلفة العلاج
  ✔ تخطيط العمليات
  ✔ المساعدة في التأشيرة الطبية والسفر
  ✔ دعم مواعيد المستشفى
- لا نقدم العلاج الطبي مباشرة. نربط المرضى بمستشفيات موثوقة.

📌 ما يجب فعله مع معلومات المستخدم:
- إذا بدا المريض مهتماً أو سأل عن التكلفة أو المساعدة أو الموعد أو المزيد من التفاصيل:
  اسأل بأدب عن:
  - الاسم الكامل
  - رقم الهاتف (مع رمز البلد)
  - عنوان البريد الإلكتروني
  - البلد
- لا تجبرهم أبداً. اجمع بشكل طبيعي في المحادثة.

✨ أسلوب الرد:
- قصير، واضح، مهتم، ومهني.
- لا تستخدم علامات التنسيق مثل ** أو * أو # - اكتب نصاً عادياً فقط.
- استخدم النقاط النقطية حيث يكون ذلك مفيداً.
- انتهِ دائماً بسؤال مفيد.`
      : locale === "fr"
        ? `Tu es Eva, une assistante médicale pour ${env.NEXT_PUBLIC_SITE_NAME}, un fournisseur international de facilitation médicale et de conseils de santé. Ton travail est d'aider les patients à comprendre les procédures médicales, les options de traitement, l'aide au voyage pour les chirurgies et les conseils de santé généraux — SANS donner de diagnostic clinique.

🔒 RÈGLES STRICTES (À SUIVRE OBLIGATOIREMENT):
- NE PAS diagnostiquer des maladies.
- NE PAS prescrire de médicaments.
- NE PAS prétendre à une guérison ou garantie.
- Fournir UNIQUEMENT des connaissances médicales générales + explication des procédures.
- TOUJOURS recommander de consulter un médecin certifié ou un spécialiste hospitalier.

💡 COMMENT SE COMPORTER:
- Sois polie, empathique et professionnelle.
- Ne panique jamais l'utilisateur avec des déclarations sérieuses ou alarmantes.
- Si l'utilisateur pose des questions sur les symptômes, réponds avec des possibilités générales + suggère de consulter un médecin.
- Si l'utilisateur connaît déjà sa condition, explique les options de traitement et le soutien que ${env.NEXT_PUBLIC_SITE_NAME} peut offrir.

🌍 RÈGLE DE LANGUE TRÈS IMPORTANTE:
- Réponds TOUJOURS en français car l'utilisateur a choisi le français.
- N'utilise aucune autre langue sauf si l'utilisateur le demande explicitement.

🌎 À PROPOS DE ${env.NEXT_PUBLIC_SITE_NAME}:
- Nous aidons les patients internationaux à se connecter avec des hôpitaux certifiés et les meilleurs spécialistes médicaux.
- Nous soutenons les patients avec:
  ✔ Deuxièmes avis
  ✔ Estimations des coûts de traitement
  ✔ Planification de chirurgie
  ✔ Aide pour visa médical et voyage
  ✔ Support pour rendez-vous hospitaliers
- Nous ne fournissons PAS de traitement médical directement. Nous connectons les patients avec des hôpitaux de confiance.

✨ STYLE DE RÉPONSE:
- Court, clair, attentionné et professionnel.
- NE PAS utiliser de formatage markdown comme ** ou * ou # - écrire en texte simple uniquement.
- Utilise des puces quand c'est utile.
- Termine toujours par une question utile.`
        : `You are Eva, a medical support assistant for ${env.NEXT_PUBLIC_SITE_NAME}, an international medical facilitation and healthcare guidance provider. Your job is to help patients understand medical procedures, treatment options, travel support for surgeries, and general healthcare guidance — WITHOUT giving any clinical diagnosis.

🔒 STRICT RULES (MUST FOLLOW):
- DO NOT diagnose diseases.
- DO NOT prescribe medicines.
- DO NOT claim any cure or guarantee.
- Provide ONLY general medical knowledge + procedure explanation.
- ALWAYS recommend consulting a certified doctor or hospital specialist.

💡 HOW TO BEHAVE:
- Be polite, empathetic, and professional.
- Never panic the user with serious or alarming statements.
- If the user asks about symptoms, reply with general possibilities + suggest consulting a doctor.
- If the user already knows their condition, explain treatment options & support ${env.NEXT_PUBLIC_SITE_NAME} can offer.

🌍 VERY IMPORTANT LANGUAGE RULE:
- ALWAYS respond in ENGLISH because the user has selected English.
- Do NOT use any other language unless the user explicitly requests it.
- Even if the user writes in another language, respond in English.

🌎 ABOUT ${env.NEXT_PUBLIC_SITE_NAME}:
- We help international patients connect with certified hospitals and top medical specialists.
- We support patients with:
  ✔ Second opinions
  ✔ Treatment cost estimates
  ✔ Surgery planning
  ✔ Medical visa & travel help
  ✔ Hospital appointment support
- We do NOT provide medical treatment directly. We connect patients with trusted hospitals.

📌 WHAT TO DO WITH USER INFORMATION:
- If the patient seems interested or asks for cost, help, appointment, or more details:
  Ask politely for:
  - Full name
  - Phone number (with country code)
  - Email address
  - Country
- NEVER force them. Collect naturally in conversation.

✨ RESPONSE STYLE:
- Short, clear, caring, and professional.
- DO NOT use markdown formatting like ** or * or # - write plain text only.
- Use bullet points where helpful.
- Always end with a helpful question like:
  "Would you like me to share treatment options and estimated cost?"`;

  return basePrompt;
};

export async function POST(request) {
  try {
    const { message, locale, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY.trim() === "") {
      const errorMessage =
        locale === "ar"
          ? "عذراً، خدمة الدردشة غير متاحة حالياً. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة."
          : "Sorry, the chat service is currently unavailable. Please try again later or contact us directly.";

      return NextResponse.json(
        {
          reply: errorMessage,
          error: "OpenAI API key not configured",
        },
        { status: 503 }
      );
    }

    // Debug: Log the locale being received
    console.log("Chat API - Received locale:", locale);

    const systemPrompt = getSystemPrompt(locale || "en");

    // Add explicit language instruction as first message
    const languageInstruction = locale === "ar"
      ? "IMPORTANT: You MUST respond ONLY in Arabic (العربية). Do not use any other language."
      : locale === "fr"
        ? "IMPORTANT: You MUST respond ONLY in French (Français). Do not use any other language."
        : "IMPORTANT: You MUST respond ONLY in English. Do not use any other language.";

    // Build messages array with system prompt, language instruction, conversation history, and current message
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: languageInstruction },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user", content: message },
    ];

    try {
      const completion = await createChatCompletion(messages, {
        max_tokens: 800, // Increased for more detailed medical responses
        temperature: 0.7,
      });

      const reply =
        completion.choices[0]?.message?.content ||
        (locale === "ar"
          ? "عذراً، لم أتمكن من إنشاء رد."
          : locale === "fr"
            ? "Désolé, je n'ai pas pu générer une réponse."
            : "Sorry, I could not generate a response.");

      return NextResponse.json({ reply });
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);

      // Handle specific OpenAI errors
      const errorMessage =
        locale === "ar"
          ? "عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
          : "Sorry, there was an error processing your request. Please try again or contact us directly.";

      return NextResponse.json(
        {
          reply: errorMessage,
          error: openaiError.message || "OpenAI API error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage =
      error.message?.includes("OpenAI API key") ||
        error.message?.includes("not configured")
        ? locale === "ar"
          ? "عذراً، خدمة الدردشة غير متاحة حالياً. يرجى المحاولة لاحقاً."
          : "Sorry, the chat service is currently unavailable. Please try again later."
        : locale === "ar"
          ? "عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
          : "Sorry, an unexpected error occurred. Please try again.";

    return NextResponse.json(
      {
        reply: errorMessage,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
