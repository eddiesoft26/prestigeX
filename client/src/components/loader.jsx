import { Loader2 } from "lucide-react"; // install using: npm install lucide-react

export const Spinner = () => (
  <div className="flex items-center justify-center gap-2">
    <Loader2 className="h-5 w-5 animate-spin" />
    <span>Processing...</span>
  </div>
);