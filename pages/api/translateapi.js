// pages/api/translateapi.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: 'Text and target language are required.' });
    }

    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const responseData = await response.text();

        console.log('API Response:', responseData);

        const data = JSON.parse(responseData); // This may still throw an error if response is not in expected format
        const translatedText = data[0][0][0];

        return res.status(200).json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error.message);
        return res.status(500).json({ error: 'Translation failed.' });
    }
}
