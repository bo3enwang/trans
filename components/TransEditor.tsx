import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UploadIcon from "./icons/UploadIcon";
import Modal from "./Modal";
import { useDropzone } from "react-dropzone";
import { isString } from "@/libs/open-api-ts/utils/isString";
import GithubIcon from "./icons/GithubIcon";

const CodeEditor = dynamic(import("@uiw/react-textarea-code-editor"), {
  ssr: false,
});

export type CodeTransformer = (value: string) => Promise<string>;

interface TransEditorProps {
  trans?: CodeTransformer;
  sourceTitle?: string;
  targetTitle?: string;
  defaultCode?: string;
  language?: string;
  targetLanguage?: string;
  libName?: string;
  libUrl?: string;
}

const TransEditor: React.FC<TransEditorProps> = ({
  trans,
  sourceTitle,
  targetTitle,
  defaultCode = "",
  language = "JSON",
  targetLanguage,
  libName,
  libUrl,
}) => {
  const codeEditorRef = useRef<any>();
  const [code, setCode] = useState(defaultCode);
  const [result, setResult] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const fr = new FileReader();
      fr.onload = function () {
        if (isString(fr.result)) {
          setCode(fr.result!);
        }
      };
      fr.readAsText(acceptedFiles[0]);
      setUploadOpen(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setHeight(codeEditorRef.current.clientHeight);
    window.addEventListener("resize", () => {
      setHeight(0);
      setTimeout(() => {
        setHeight(codeEditorRef.current.clientHeight);
      }, 100);
    });
  }, [codeEditorRef]);

  useEffect(() => {
    const transform = async () => {
      try {
        if (trans) {
          const result = await trans(code);
          setResult(result);
          setError("");
        }
      } catch (e) {
        console.error(e);
        setError(e + "");
      }
    };
    transform();
  }, [code, trans]);

  return (
    <div className="flex flex-auto h-ull">
      <Modal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
        }}
        render={() => {
          return (
            <div className="p-3 bg-white shadow-md">
              <div {...getRootProps()} className="cursor-pointer h-52 w-96">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>
                    Drag &#39;n&#39; drop some files here, or click to select
                    files
                  </p>
                )}
              </div>
            </div>
          );
        }}
      ></Modal>
      <div className="flex-1 w-1/2 flex flex-col h-full border-r">
        <div className="h-10 flex items-center justify-between px-3">
          <div className="font-bold text-sm">{sourceTitle}</div>
          <div className="flex items-center px-3">
            <button
              onClick={() => {
                setUploadOpen(true);
              }}
              type="button"
              className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-1 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
            >
              <UploadIcon className="w-5 h-5 fill-white"></UploadIcon>
            </button>
          </div>
        </div>
        <div ref={codeEditorRef} className="flex-auto">
          <div
            className="overflow-y-scroll bg-[#f5f5f5] w-full"
            style={{ height }}
          >
            <CodeEditor
              value={code}
              language={language}
              placeholder="Please enter open api."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                fontSize: 14,
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                minHeight: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 w-1/2">
        <div className="h-10 flex items-center justify-between px-3">
          <div className="font-bold">{targetTitle}</div>
          <div>
            {libName && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Powered by</span>
                <a href={libUrl} target="_blank" rel="noreferrer">
                  <GithubIcon />
                </a>
                <a
                  href={libUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-sm hover:underline"
                >
                  {libName}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-auto" style={{ height }}>
          <CodeEditor
            value={result}
            language={targetLanguage || "JSON"}
            padding={15}
            style={{
              fontSize: 14,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              minHeight: "100%",
            }}
            readOnly={true}
          />
        </div>
      </div>
      {error && (
        <div
          className="fixed bottom-5 flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            {error}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-1 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TransEditor;
