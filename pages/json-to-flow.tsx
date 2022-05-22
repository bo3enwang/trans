import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";
import { json2ts } from "json-ts";

const defaultCode = `{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
`;

interface JSONToFlowProps {}

const JSONToFlow: React.FC<JSONToFlowProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    let result = "";
    if (code) {
      result = json2ts(code, { flow: true });
    }
    return result;
  };
  return (
    <Layout>
      <TransEditor
        language="json"
        trans={trans}
        sourceTitle="JSON"
        targetTitle="Flow"
        defaultCode={defaultCode}
        libName="json-ts"
        libUrl="https://github.com/shakyshane/json-ts"
      ></TransEditor>
    </Layout>
  );
};

export default JSONToFlow;
