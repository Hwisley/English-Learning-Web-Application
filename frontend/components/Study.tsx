import React, { useState, useEffect } from "react";

const StudyPage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [engScript, setEngScript] = useState<string[]>([]);
  const [korScript, setKorScript] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(""); // The correct answer
  const [idx, setIdx] = useState<number>(0); // 정답을 숫자로 저장

  useEffect(() => {
    fetch("../data/data.json") // ⬅️ public 폴더 기준으로 경로 설정!
    // fetch("/data/test_data.json") // ⬅️ public 폴더 기준으로 경로 설정!
      .then(response => response.json())
      .then(data => {
        setEngScript(data.eng_script);
        setKorScript(data.kor_script);
        setCorrectAnswer(data.eng_script[0]);
        setIdx(0);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("✅ Updated engScript:", engScript);
    console.log("✅ Updated korScript:", korScript);
    console.log("✅ Updated correctAnswer:", correctAnswer);
    console.log("✅ Updated idx:", idx);
  }, [engScript, korScript, correctAnswer, idx]); // ⬅️ state가 변경될 때 실행!

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (idx == engScript.length - 1) {
        setResult("끝났어! Finished!");
        setKorScript([]); // TODO data reset
        return;
      }
      if (inputText === correctAnswer) {
        setResult("정답! Correct!");
        setCorrectAnswer(engScript[idx + 1]);
        setIdx(idx + 1);
        setInputText("");
      } else {
        setResult("틀렸자나! Incorrect!");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* English Paragraph */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
        <p className="max-w-md mx-auto text-center text-gray-700">
          {engScript.slice(0,idx).map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
        <p className="max-w-md mx-auto text-center text-gray-700">
        {korScript[idx]} {/* Set embedded text to kor_script[0] */}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Input Text Box */}
        <input
          type="text"
          className="w-full max-w-md mx-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Recall and enter the correct English sentence you learned..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {/* Result Message */}
        <p className="text-center text-lg font-medium mt-4">{result}</p>
      </div>

      {/* Korean Paragraph */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
        <p className="max-w-md mx-auto text-center text-gray-700">
          {korScript.slice(idx+1).map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default StudyPage;