
export default async function handler(req, res) {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: 'Text and target language are required.' });
    }

    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch translation from Google Translate API.');
        }

        const responseData = await response.json(); // Parse response as JSON

        // Check if the response is in the expected format
        if (Array.isArray(responseData) && responseData.length > 0 && Array.isArray(responseData[0])) {
            const translatedText = responseData[0][0][0];
            res.status(200).json({ translatedText });
        } else {
            throw new Error('Unexpected response format from Google Translate API.');
        }
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(500).json({ error: 'Translation failed.' });
    }
}
