import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { generate } from "@/libs/open-api-ts";
import { Client } from "@/libs/open-api-ts/client/interfaces/Client";
import clsx from "clsx";
import modelBuilder from "@/libs/open-api-ts/builder/modelBuilder";

import operationBuild from "@/libs/open-api-ts/builder/operationBuild";
import Layout from "layouts";

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

  const g = async () => {
    if (code) {
      const tsClinet = await generate({ input: JSON.parse(code) });
      setClient(tsClinet);
    }
  };

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
      return (
        <div key={service.name} className="p-2">
          <CodeBlock
            code={service.operations
              .map((operation) => operationBuild(operation))
              .join("")}
            language="typescript"
          />
        </div>
      );
    });
  };

  useEffect(() => {
    console.log(codeEditorRef.current.clientHeight);
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
      <div className="flex flex-auto h-ull">
        <div className="flex-1 flex flex-col h-full">
          <div className="flex p-2 gap-2 shadow shadow-white bg-white border-b">
            <button
              className="px-5 py-1 font-semibold rounded bg-indigo-500 text-white"
              onClick={() => {
                g();
              }}
            >
              Generator
            </button>
            <button
              className="px-5 py-1 font-semibold rounded bg-indigo-500 text-white"
              onClick={() => {}}
            >
              Import
            </button>
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
        <div className="flex-1 w-1/2 border">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b">
            {["Models", "Services"].map((name) => {
              return (
                <li key={name} className="mr-2">
                  <a
                    className={clsx(
                      "inline-flex p-3 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 group cursor-pointer",
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
          <div className="overflow-auto" style={{ height }}>
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
