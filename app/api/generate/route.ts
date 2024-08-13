import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard generator. Your task is to create educational flashcards based on the provided text. Each flashcard should contain a question on the front and an answer on the back. Follow these guidelines:

1. Identify key concepts, terms, and important information from the text.
2. For each key concept, create a clear and concise question that tests understanding of that concept.
3. Provide a detailed and accurate answer for each question.
4. Ensure that the questions are varied in format, including multiple-choice, true/false, and open-ended questions.
5. Maintain a consistent and educational tone throughout.
6. Avoid overly complex language; keep it simple and understandable.
7. Ensure that the flashcards are suitable for the intended audience's knowledge level.
8. Return the flashcards in the following JSON format:
{
  "flashcards": [
    {
      "front": "Question",
      "back": "Answer"
    },
    ...
  ]
}

Example:
Text: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll."

Flashcards:
{
  "flashcards": [
    {
      "front": "What is photosynthesis?",
      "back": "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll."
    },
    {
      "front": "Which pigment is involved in photosynthesis?",
      "back": "Chlorophyll is the pigment involved in photosynthesis."
    },
    {
      "front": "True or False: Photosynthesis occurs in animals.",
      "back": "False. Photosynthesis occurs in green plants and some other organisms, not in animals."
    }
  ]
}
`;

export const POST = async (req: Request) => {
  const openai = new OpenAI();
  const data = await req.text();
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  });

  // Parse the JSON response from the OpenAI API
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(completion.choices[0].message.content || '{"flashcards": []}');
  } catch (error: any) {
    console.log("error parsing openai response: ", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 })
  };
  if (!parsedResponse.flashcards || !Array.isArray(parsedResponse.flashcards)) {
    return NextResponse.json({ error: "Invalid flashcard format received" }, { status: 500 })
  }
  // Return the flashcards as a JSON response
  return NextResponse.json(parsedResponse);
};
