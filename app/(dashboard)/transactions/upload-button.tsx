import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
        onUpload: (results: {
                data: string[][];
                errors: unknown[];
                meta: unknown;
        }) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
        const { CSVReader } = useCSVReader();

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