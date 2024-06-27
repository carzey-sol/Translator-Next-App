"use client";
import { useState } from "react";

const TranslateButton = ({ text }) => {
    const [translatedText, setTranslatedText] = useState('');
    const [targetLang, setTargetLang] = useState('es');
    const [isVisible, setIsVisible] = useState(false);

    const handleTranslate = async () => {
        setIsVisible(true);
        const response = await fetch('/api/translateapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text, targetLang })
        });

        const data = await response.json();
        setTranslatedText(data.translatedText);
    };

    return (
        <div>
        <div className="flex gap-10">
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 font-sans">
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
            </select>
            <button onClick={handleTranslate} className="bg-green-500 rounded p-2">Translate</button>
            </div >
            <div className={`mt-10 bg-green-600 bg-opacity-50 rounded p-2 ${isVisible ? '' : 'hidden'}`}>
            {translatedText && <p>Translated Text: {translatedText}</p>}
            </div>
            </div>
           
            
       
    );
};

export default TranslateButton;
