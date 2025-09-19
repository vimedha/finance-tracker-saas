import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

// Inlined types matching react-papaparse output and page.tsx expectations
interface ImportResults {
  data: string[][]; // Raw CSV rows (arrays of strings)
  errors: Array<{ row: number; message: string }>;
  meta: Record<string, unknown>;
}

interface Props {
  onUpload: (results: ImportResults) => void;
}

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // Typed based on react-papaparse's render prop API
  interface CSVReaderRenderProps {
    getRootProps: () => React.HTMLAttributes<HTMLButtonElement>;
  }

  return (
    <div className="w-full lg:w-auto">
      <CSVReader onUploadAccepted={onUpload}>
        {({ getRootProps }: CSVReaderRenderProps) => (
          <Button
            size="sm"
            className="w-full lg:w-auto"
            {...getRootProps()}
          >
            <Upload className="size-4 mr-2" />
            Import
          </Button>
        )}
      </CSVReader>
    </div>
  );
};
