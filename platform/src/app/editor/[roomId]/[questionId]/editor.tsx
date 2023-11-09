"use client";

import React, { useCallback, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import toast from "react-hot-toast";

import { Question } from "@/repositories/question.repository";
import { wrapperValidateCodeQuestionUseCaseServerToClient } from "@/actions/question/validate-code-question.action";

import "./editor.scss";
import { Collapsible } from "@/components/collapsible/collapsible";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/button/Button";
import { ResultVatidation } from "@/services/question.service";

type EditorPorps = {
  userId: number;
  roomId: number;
  question: Question;
  initialCode: string;
}


export default function Editor({ userId, roomId, question, initialCode }: Readonly<EditorPorps>) {
  const [contentFile, setContentFile] = useState<string>(initialCode);
  const [result, setResult] = useState<ResultVatidation | null>(null);

  const handleValidateCodeQuestion = useCallback(async () => {
    const result = await wrapperValidateCodeQuestionUseCaseServerToClient(
      userId,
      roomId,
      question,
      contentFile
    );

    if (result.tag === "LEFT") {
      toast.error("Não possivel adicionar a categoria!");
      return;
    }

    const resultQuestions = result.value;
    setResult(resultQuestions)

  }, [contentFile]);

  const allTestsOk = result?.success?.every((r) => r.passed) ?? false

  return (
    <div className="container editor">
      <div className="row">
        <div className="col-12">

        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div>
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
          <Button
            className="button-validate"
            type="submit"
            onClick={handleValidateCodeQuestion}
          >
            Validar
          </Button>
          {result?.success && (
            <div className="editor-result">
              {allTestsOk && (
                <div className="editor-selo">
                  Tudo OK  <CheckCircle />
                </div>
              )}
              {result.success.map((r, index) => (
                <Collapsible
                  key={index}
                  title={`Teste ${index + 1}`}
                  color={r.passed ? "green" : "red"}
                >
                  <p>Argumentos: {JSON.stringify(r.args)}</p>
                  <p>Retorno Esperado: {JSON.stringify(r.expected_result)}</p>
                  <p>Retorno: {JSON.stringify(r.result)}</p>
                </Collapsible>
              ))}
            </div>
          )}
          {(result?.error ?? result?.extra) && (
            <pre className="termial-error" >
              {result.error}

              {result.extra}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

