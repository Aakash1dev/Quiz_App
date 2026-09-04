import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Generate structured quiz questions from custom text using Google Gemini API
 */
export const generateQuizFromText = async (req, res) => {
  try {
    let { customText, questionCount = 10, difficulty = 'medium', includeExplanations = true } = req.body;

    if (!customText || typeof customText !== 'string' || !customText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Custom text content is required to generate quiz questions.',
      });
    }

    // Clamp question count between 1 and 30 for performance & safety
    const clampedQuestionCount = Math.max(1, Math.min(parseInt(questionCount, 10) || 10, 30));
    const validDifficulties = ['easy', 'medium', 'hard', 'mixed'];
    const sanitizedDifficulty = validDifficulties.includes(String(difficulty).toLowerCase())
      ? String(difficulty).toLowerCase()
      : 'medium';

    // Get API key from request body, headers, or environment variable
    const apiKey = req.body?.apiKey || req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      return res.status(400).json({
        success: false,
        requiresApiKey: true,
        message: 'Gemini API Key is missing. Please provide a valid Gemini API Key in settings or backend env.',
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey.trim());
    
    const prompt = `You are an expert quiz author. Create a structured multiple-choice quiz based strictly on the provided topic/text.

Requirements:
- Generate EXACTLY ${clampedQuestionCount} unique, distinct multiple-choice questions. Every single question must ask about a different concept or detail from the text.
- Target difficulty level: ${sanitizedDifficulty}.
- Each question must have EXACTLY 4 distinct, plausible options.
- "correctAnswer" MUST be an integer index from 0 to 3 corresponding to the correct option in "options".
- ${includeExplanations ? 'Provide a helpful 1-2 sentence explanation for each correct answer.' : 'Keep explanations empty.'}

Source Content:
"""
${customText.trim()}
"""

Respond ONLY with a valid JSON object adhering strictly to this schema (no markdown, no conversation text):
{
  "title": "Specific title summarizing the main topic (3-6 words)",
  "description": "One sentence summary of what this quiz covers",
  "category": "Subject category (e.g. Science, Technology, History, General)",
  "questions": [
    {
      "id": "q1",
      "question": "Clear question text asking about a specific fact or concept",
      "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
      "correctAnswer": 0,
      "explanation": "Explanation for correct answer"
    }
  ]
}`;

    // List of model names to try in order of preference
    const candidateModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'];
    let responseText = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: 'application/json' },
        });
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        if (responseText) break;
      } catch (err) {
        console.warn(`Model ${modelName} failed, trying next candidate...`, err.message);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error('All Gemini API models failed to generate content.');
    }

    // Sanitize output text (remove markdown formatting if present)
    const cleanedJsonStr = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const quizData = JSON.parse(cleanedJsonStr);

    if (!quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      throw new Error('Generated quiz response did not contain valid questions array.');
    }

    // Ensure all questions have consistent properties and unique IDs
    const formattedQuestions = quizData.questions.map((q, index) => ({
      id: `ai_${Date.now()}_${index + 1}`,
      question: q.question || `Question ${index + 1}`,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3 ? q.correctAnswer : 0,
      explanation: q.explanation || 'Refer to the source text for details.'
    }));

    return res.status(200).json({
      success: true,
      title: quizData.title || 'AI Generated Quiz',
      description: quizData.description || 'Custom text quiz',
      category: quizData.category || 'Custom Topic',
      questions: formattedQuestions,
    });
  } catch (error) {
    console.error('Error generating quiz from Gemini API:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate quiz from Gemini API.',
    });
  }
};
