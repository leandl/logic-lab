"use client";

import React, { useCallback, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import "./editor.module.css"
import { Question } from "@/repositories/question.repository";
// import questions from "../../data/test-data-questions.json"


type HomePorps = {
  questions: Question[];
}

export default function Editor({ questions }: HomePorps) {
  const [questionSelected, setQuestionSelected] = useState<number>();
  const [contentFile, setContentFile] = useState<string>("");
  const [result, setResult] = useState<any>();

  useEffect(() => {
    async function getFile() {
      if (questionSelected === undefined) {
        return;
      }

      const question = questions[questionSelected];
      const rawResponse = await fetch('http://localhost:5000/generate-file/python', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": question.name,
          "description": question.description,
          "type-result": question.typeResult,
          "description-result": question.descriptionResult,
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
    const rawResponse = await fetch('http://localhost:5000/validate-exercise/python', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "code": contentFile,
        "type-result": question.typeResult,
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
      <div className="editor">

        <MonacoEditor
          height="100vh"
          language="python"
          options={{
            minimap: {
              enabled: false
            }
          }}
          value={contentFile}
          onChange={(newValue, event) => {
            setContentFile(newValue ?? "")
          }}
        />
      </div>
    </>
  );
}

