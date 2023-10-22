"use client";

import React, { useCallback, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import "./editor.module.css"
import { Question } from "@/repositories/question.repository";
import toast from "react-hot-toast";
import { wrapperValidateCodeQuestionUseCaseServerToClient } from "@/actions/question/validate-code-question.action";
// import questions from "../../data/test-data-questions.json"


type HomePorps = {
  question: Question;
  initialCode: string;
}

export default function Editor({ question, initialCode }: HomePorps) {
  const [contentFile, setContentFile] = useState<string>(initialCode);
  const [result, setResult] = useState<any>();

  const handleValidateCodeQuestion = useCallback(async () => {
    const result = await wrapperValidateCodeQuestionUseCaseServerToClient({
      question, code: contentFile
    });

    if (result.tag === "LEFT") {
      toast.error("Não possivel adicionar a categoria!");
      return;
    }

    const resultQuestions = result.value;
    setResult(resultQuestions)

  }, [contentFile]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <button onClick={handleValidateCodeQuestion}>Validar</button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="editor">
            <MonacoEditor
              height="calc(100vh - 200px)"
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
        </div>


        <div className="col-6">
          {result && (
            <div>
              <h1>Resultado</h1>
              <pre>{JSON.stringify(result, null, 4)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

