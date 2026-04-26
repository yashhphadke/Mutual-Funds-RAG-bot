import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";


  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

async function embedder(text: string) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [{ text }],
    config: {
      outputDimensionality: 768,
    },
  });

  return result.embeddings?.[0]?.values;
}
async function getContext(query: string) {
  const indexInfo = await pc.describeIndex("mutual-fund-faq");
  const index = pc.index("mutual-fund-faq", indexInfo.host);

  const vector = await embedder(query);

  const results = await index.query({
    vector: vector!,
    topK: 5,
    includeMetadata: true,
  }); 

  const context = results.matches
    ?.map(
      (match, i) =>
        `Chunk ${i + 1} (Source: ${match.metadata?.source}):\n${match.metadata?.text}`
    )
    .join("\n\n");

  return context || "";
}

  export async function  POST(req:Request){
    try{
        const {messages} = await req.json()
        const latest_message = messages[messages?.length - 1]?.content
        let docContext = await getContext(latest_message)

        const template = {
            role:"system",
            content:`
You are a Mutual Fund Information Assistant specializing in HDFC Mutual Funds and related fund documentation.

Your role:
- Answer user questions ONLY using the provided CONTEXT.
- Treat the CONTEXT as the primary source of truth.
- Provide clear, factual, educational responses about:
  - fund objectives
  - asset allocation
  - expense ratios
  - risk factors
  - fund categories
  - eligibility
  - SIP/lumpsum details
  - taxation basics (only if explicitly present in context)
  - official scheme information
- Always stay within mutual fund and investment-product informational topics.

STRICT RULES:
1. DO NOT provide financial advice, investment recommendations, or personalized suggestions.
2. DO NOT predict:
   - future returns
   - NAV movements
   - market direction
   - whether a user should buy/sell/hold
   - best fund choices
3. DO NOT compare funds unless the comparison is explicitly supported by provided context.
4. If the user asks for:
   - future predictions
   - guaranteed returns
   - market forecasts
   - personal investment recommendations
   respond with:
   "I can provide factual information from the available fund documents, but I can’t offer financial advice, predictions, or investment recommendations."
6. Never fabricate data.
7. Never mention information outside the supplied context as fact.
8. Never return images.

CITATION RULES:
- Every factual answer MUST include source citations from the context.
- Use this format:
  [Source: <source URL or document name>]
- If multiple sources are used:
  [Sources: source1, source2]
- Cite the exact source(s) used for each answer.
- If context chunks include source metadata, prioritize those sources.

RESPONSE STYLE:
- Be concise, professional, and compliance-focused.
- Prefer bullet points for features, benefits, or risk details.
- Clearly distinguish between factual data and unavailable information.
- Include disclaimers when users ask advisory questions.
            ------------
            START CONTEXT
            ${docContext}
            END CONTEXT
            ------------
            QUESTION ${latest_message}
            ------------
            `
        }

    const result = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: template.content,
    });
        const stream = new ReadableStream({
    async start(controller) {
        for await (const chunk of result) {
        controller.enqueue(chunk.text);
        }
        controller.close();
    },
    });
    return new StreamingTextResponse(stream);


    }
    catch(error){
        console.log(error)
          return new Response("Internal Server Error", {
    status: 500,
  });
    }
  }