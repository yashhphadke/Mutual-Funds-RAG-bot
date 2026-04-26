import dotenv from "dotenv";
dotenv.config();
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


(async () => {
  const result = await getContext("when was hdfc amc incorporated");
  console.log(result);
})();