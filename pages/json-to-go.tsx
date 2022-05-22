import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import jsonToGo from "@/libs/json-to-go";
import Layout from "layouts";
import React from "react";

const defaultCode = `{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`;

interface JSONToGoProps {}

const JSONToGo: React.FC<JSONToGoProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    const result = jsonToGo(code);
    if (result.error) {
      throw result.error;
    }
    return result.go || "";
  };

  return (
    <Layout>
      <TransEditor
        defaultCode={defaultCode}
        trans={trans}
        language="JSON"
        sourceTitle="JSON"
        targetTitle="Go"
        targetLanguage="Go"
      ></TransEditor>
    </Layout>
  );
};

export default JSONToGo;
