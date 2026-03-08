import { askGeminiChat, searchCollegesWithGemini, getCollegeDetailsWithGemini } from './geminiService';

export const getColleges = async () => {
    // Generate a default attractive list of top colleges
    return await searchCollegesWithGemini("Top ranked engineering and medical colleges in India");
};

export const searchColleges = async (query) => {
    return await searchCollegesWithGemini(query);
};

export const getCollegeById = async (id) => {
    return await getCollegeDetailsWithGemini(id);
};

export const sendChatMessage = async (message) => {
    const responseText = await askGeminiChat(message);
    return { reply: responseText };
};
