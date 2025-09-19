import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

<<<<<<< HEAD
type Props = {
        onUpload: (results: {
                data: string[][];
                errors: unknown[];
                meta: unknown;
        }) => void;
};
=======
// Inlined types matching react-papaparse output and page.tsx expectations
interface ImportResults {
  data: string[][]; // Raw CSV rows (arrays of strings)
  errors: Array<{ row: number; message: string }>;
  meta: Record<string, unknown>;
}

interface Props {
  onUpload: (results: ImportResults) => void;
}
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

<<<<<<< HEAD
        return (
                <div className="w-full lg:w-auto">
  <CSVReader onUploadAccepted={onUpload}>
    {({ getRootProps }: { getRootProps: () => Record<string, unknown> }) => (
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
=======
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
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a
