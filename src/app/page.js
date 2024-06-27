"use client"
import { useState } from "react";
import TranslateButton from "./TranslateButton";

export default function Home() {

  const [text, setText] = useState('');

  const handleTextChange = (e) => {
      setText(e.target.value);
  };

  return (
  <div className="h-screen flex justify-center items-center scale-70 bg-gradient-to-b from-green-50 to-sky-400">
    <div className="ml-10 mr-10 mt-10 bg-white p-28 rounded-xl">
      <div className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-2xl font-bold">Translate Text</h1>
      <div>
        <textarea placeholder="Type Your Text Here!" className="rounded p-10 border-slate-500 border-2 " onChange={handleTextChange} />
      </div>
     <TranslateButton text={text}/>
     </div>
    </div>
    </div>
  );
}
