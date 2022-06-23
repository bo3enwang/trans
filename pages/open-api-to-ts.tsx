import React, { useCallback, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { generate } from "@/libs/open-api-ts";
import { Client } from "@/libs/open-api-ts/client/interfaces/Client";
import clsx from "clsx";

import modelBuilder from "@/libs/open-api-ts/builder/modelBuilder";
import operationBuild from "@/libs/open-api-ts/builder/operationBuild";

import Layout from "layouts";
import UploadIcon from "@/components/icons/UploadIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import Modal from "@/components/Modal";
import { useDropzone } from "react-dropzone";
import { isString } from "@/libs/open-api-ts/utils/isString";
import CogIcon from "@/components/icons/CogIcon";

const ServiceOption = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between max-w-2xl px-2 py-1 mx-auto border cursor-pointer rounded-xl mb-1 ">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex flex-col items-center mx-5 space-y-1">
          <h2 className="text-basic font-medium text-gray-700 ">{title}</h2>
        </div>
      </div>
    </div>
  );
};

const CodeEditor = dynamic(import("@uiw/react-textarea-code-editor"), {
  ssr: false,
});

const CodeBlock = dynamic(import("../components/CodeBlock"), {
  ssr: false,
});

interface OpenApiToTsProps {}

const OpenApiToTs: React.FC<OpenApiToTsProps> = ({}) => {
  const codeEditorRef = useRef<any>();
  const [curTab, setCurTab] = useState<string>("Models");
  const [code, setCode] = useState(``);
  const [client, setClient] = useState<Client>();
  const [height, setHeight] = useState<number>();

  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const [fetchOpen, setFetchOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  const g = async () => {
    if (code) {
      const tsClinet = await generate({ input: JSON.parse(code) });
      setClient(tsClinet);
    }
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const fr = new FileReader();
      fr.onload = function () {
        if (isString(fr.result)) {
          setCode(fr.result!);
          g();
        }
      };
      fr.readAsText(acceptedFiles[0]);
      setUploadOpen(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderModels = () => {
    return (
      <div>
        <CodeBlock
          code={client?.models?.map((model) => modelBuilder(model)).join("")}
          language="typescript"
        />
      </div>
    );
  };

  const renderServices = () => {
    return client?.services.map((service) => {
      const operations = service.operations
        .map((operation) => operationBuild(operation))
        .join("");

      return (
        <div key={service.name} className="p-2">
          <CodeBlock code={operations} language="typescript" />
        </div>
      );
    });
  };

  useEffect(() => {
    setHeight(codeEditorRef.current.clientHeight);
    window.addEventListener("resize", () => {
      setHeight(0);
      setTimeout(() => {
        setHeight(codeEditorRef.current.clientHeight);
      }, 100);
    });
  }, [codeEditorRef]);

  return (
    <Layout>
      <Modal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
        }}
        render={() => {
          return (
            <div className="p-2 bg-white shadow-md">
              <div
                {...getRootProps()}
                className="cursor-pointer h-52 w-96 flex items-center justify-center flex-col border-2 border-dashed border-blue-400 p-3 rounded"
              >
                <div className="mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                {isDragActive ? (
                  <h2 className="mt-4 text-gray-700 tracking-wide">
                    Drop the files here ...
                  </h2>
                ) : (
                  <h2 className="mt-4 text-gray-700 tracking-wide">
                    Drag &#39;n&#39; drop some files here, or click to select
                    files
                  </h2>
                )}
                <input {...getInputProps()} />
              </div>
            </div>
          );
        }}
      ></Modal>
      <Modal
        open={fetchOpen}
        onClose={() => {
          setFetchOpen(false);
        }}
        render={() => {
          return (
            <div className="p-2 bg-white shadow-lg">
              <div className="flex items-center p-6 space-x-6 bg-white rounded-xl">
                <div className="flex bg-gray-100 p-2 w-96 space-x-4 rounded-lg">
                  <LinkIcon className="h-5 w-5 opacity-30"></LinkIcon>
                  <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    placeholder="Openapi 地址"
                  />
                </div>
                <div className="bg-indigo-600 py-2 px-3 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                  <span>导入</span>
                </div>
              </div>
            </div>
          );
        }}
      ></Modal>
      <Modal
        open={settingOpen}
        onClose={() => {
          setSettingOpen(false);
        }}
        render={() => {
          return (
            <div className="p-2 bg-white shadow-lg">
              <ServiceOption title="axios"></ServiceOption>
            </div>
          );
        }}
      ></Modal>
      <div className="flex flex-auto h-ull">
        <div className="flex-1 w-1/2 flex flex-col h-full border-r">
          <div className="h-10 flex items-center justify-between px-3">
            <div className="font-bold text-sm">Open API</div>
            <div className="flex items-center px-3">
              <button
                title="设置"
                onClick={() => {
                  setSettingOpen(true);
                }}
                type="button"
                className="mr-3 text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-1 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
              >
                <CogIcon className="w-4 h-4 text-white"></CogIcon>
              </button>
              <button
                title="远程加载"
                onClick={() => {
                  setFetchOpen(true);
                }}
                type="button"
                className="mr-3 text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-1 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
              >
                <LinkIcon className="w-4 h-4 text-white"></LinkIcon>
              </button>
              <button
                title="从本地上传"
                onClick={() => {
                  setUploadOpen(true);
                }}
                type="button"
                className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-1 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
              >
                <UploadIcon className="w-4 h-4 fill-white"></UploadIcon>
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
                language="json"
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
        <div className="flex-1 w-1/2 border flex flex-col">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b">
            {["Models", "Services"].map((name) => {
              return (
                <li key={name} className="mr-2">
                  <a
                    className={clsx(
                      "inline-flex p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 group cursor-pointer ",
                      {
                        "hover:border-gray-300 dark:hover:text-gray-300":
                          curTab != name,
                        "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active":
                          curTab == name,
                      }
                    )}
                    onClick={() => {
                      setCurTab(name);
                    }}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div style={{ height }} className="overflow-y-auto">
            <div>
              {curTab == "Models" && renderModels()}
              {curTab == "Services" && renderServices()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpenApiToTs;
