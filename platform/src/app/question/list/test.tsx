"use client";

import { Button } from "@/components/button/Button";
import { Question } from "@/repositories/question.repository";
import { downloadFileForValidatorOlympics } from "@/utils/download-file";
import { ReactNode } from "react";

type ButtonDownloadJSONDataProps = {
  children: ReactNode;
  questions: Question[];
}

export function ButtonDownloadJSONData({ children, questions }: ButtonDownloadJSONDataProps) {
  return (
    <Button onClick={() => downloadFileForValidatorOlympics(questions)}>
      {children}
    </Button>
  )

}
