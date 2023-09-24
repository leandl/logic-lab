import { Loader2 } from "lucide-react";
import './loading.scss';

export function Loading() {
  return (
    <div className="loading">
      <Loader2  />
      <span>Loading...</span>
    </div>
  )
}