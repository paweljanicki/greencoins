import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, Control, FieldErrors } from "react-hook-form";

interface ImageDropzoneInputProps {
  control: Control<any>;
  name: string;
  errors?: FieldErrors;
  required?: boolean;
}

const ImageDropzoneInput: React.FC<ImageDropzoneInputProps> = ({
  control,
  name,
  errors,
  required = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], onChange: any) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onChange(acceptedFiles);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleReset = (onChange: (value: File[]) => void) => {
    setSelectedImage(null);
    onChange([]);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange } }) => (
        <div className="w-[250px] h-[250px]">
          {selectedImage ? (
            <div className="relative w-full h-full">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleReset(onChange)}
                className="font-bold absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                [Reset]
              </button>
            </div>
          ) : (
            <DropzoneComponent
              onDrop={(files: File[]) => onDrop(files, onChange)}
              hasError={!!(errors && errors[name])}
            />
          )}
        </div>
      )}
    />
  );
};

const DropzoneComponent: React.FC<{
  onDrop: (files: File[]) => void;
  hasError: boolean;
}> = ({ onDrop, hasError }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        `flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 p-4 w-full h-full cursor-pointer`,
        isDragActive && "border-secondary",
        hasError && !isDragActive && "text-error"
      )}
    >
      <input {...getInputProps()} className="hidden" />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop Image here, or click to select files</p>
      )}
    </div>
  );
};

export default ImageDropzoneInput;
