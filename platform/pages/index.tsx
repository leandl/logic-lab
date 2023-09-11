import React, { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

import questions from "../data/test-data-questions.json"

function Home() {
  const [questionSelected, setQuestionSelected] = useState<number>();
  const [contentFile, setContentFile] = useState<string>("");
  const [result, setResult] = useState<any>();

  useEffect(() => {
    async function getFile() {
      if (questionSelected === undefined) {
        return;
      }

      const question = questions[questionSelected];
      const rawResponse = await fetch('http://localhost:5000/generate-file', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": question.name,
          "description": question.description,
          "type-result": question["type-result"],
          "description-result": question["description-result"],
          "params": question.params
        })
      });

      const content = await rawResponse.json();
      setContentFile(content.file_content as string);
    }

    getFile();
  }, [questionSelected]);

  const handleValidateQuestion = useCallback(async () => {
    if (questionSelected === undefined) {
      return;
    }

    const question = questions[questionSelected];
    console.log(contentFile)
    console.log(question);
    const rawResponse = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "code": contentFile,
        "type-result": question["type-result"],
        "params": question.params.map(param => param.type),
        "tests": question.tests
      })
    });

    const content = await rawResponse.json();
    setResult(content);
  }, [questionSelected, contentFile]);

  return (
    <>
      <h1>Logic-Lab {Number.isInteger(questionSelected) && `> ${questions[questionSelected!].name}`}</h1>
      <select value={questionSelected} onChange={(e) => setQuestionSelected(Number(e.target.value))}>
        {questions.map((question, index) => (
          <option value={index} key={question.name}>{question.name}</option>
        ))}
      </select>
      <button onClick={handleValidateQuestion}>Validar</button>
      <hr />
      {/* {Number.isInteger(questionSelected) && (
        <pre>{JSON.stringify(questions[questionSelected!], null, 4)}</pre>
      )} */}

      {result && (
        <div>
          <h1>Resultado</h1>
          <pre>{JSON.stringify(result, null, 4)}</pre>
        </div>
      )}

      <MonacoEditor
        editorDidMount={() => {

        }}
        width="800"
        height="600"
        language="python"

        options={{
          minimap: {
            enabled: false
          }
        }}
        value={contentFile}
        onChange={(newValue, event) => {
          console.log(newValue);
          setContentFile(newValue)
        }}
      />
    </>
  );
}

export default Home;
