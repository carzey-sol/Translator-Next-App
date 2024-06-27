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

        console.log('API Response:', responseData); // Log the response data

        let data;
        try {
            data = JSON.parse(responseData); // Attempt to parse JSON
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: 'Failed to parse API response.' });
        }

        if (data && data[0] && data[0][0]) {
            const translatedText = data[0][0][0];
            return res.status(200).json({ translatedText });
        } else {
            return res.status(500).json({ error: 'Unexpected API response format.' });
        }
    } catch (error) {
        console.error('Translation API request error:', error);
        return res.status(500).json({ error: 'Translation API request failed.' });
    }
}
