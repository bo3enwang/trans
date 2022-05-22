import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import { defaultJSONCode } from "constant/defaultCode";
import Layout from "layouts";
import React from "react";
import { json2ts } from "json-ts";

interface JSONToTypeScriptProps {}

const JSONToTypeScript: React.FC<JSONToTypeScriptProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    let result = "";
    if (code) {
      result = json2ts(code);
    }
    return result;
  };
  return (
    <Layout>
      <TransEditor
        defaultCode={defaultJSONCode}
        sourceTitle="JSON"
        targetTitle="TypeScript"
        language="json"
        targetLanguage="typeScript"
        trans={trans}
      ></TransEditor>
    </Layout>
  );
};

export default JSONToTypeScript;
