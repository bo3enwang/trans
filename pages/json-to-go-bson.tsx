import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";

const defaultCode = `{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`;

interface JsonToGoBsonProps {}

const JsonToGoBson: React.FC<JsonToGoBsonProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    return JSON.stringify(JSON.parse(code || "{}"), null, 2)
      .replace(/\{/gm, "bson.M{")
      .replace(/\[/gm, "bson.A{")
      .replace(/\]/gm, "}")
      .replace(/(\d|\w|")$/gm, "$1,")
      .replace(/(\}$)(\n)/gm, "$1,$2");
  };
  return (
    <Layout>
      <TransEditor
        defaultCode={defaultCode}
        sourceTitle="JSON"
        targetTitle="BSON"
        language="JSON"
        trans={trans}
      ></TransEditor>
    </Layout>
  );
};

export default JsonToGoBson;
