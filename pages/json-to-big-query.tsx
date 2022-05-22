import React from "react";

import GenerateSchema from "generate-schema";
import Layout from "layouts";
import TransEditor, { CodeTransformer } from "@/components/TransEditor";

const defaultCode = `{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`;

interface JSONToBigQueryProps {}

const JSONToBigQuery: React.FC<JSONToBigQueryProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    if (code) {
      return JSON.stringify(GenerateSchema.bigquery(JSON.parse(code)), null, 2);
    }
    return "";
  };
  return (
    <Layout>
      <TransEditor
        sourceTitle="JSON"
        targetTitle="Big Query Schema"
        trans={trans}
        defaultCode={defaultCode}
        libName="generate-schema"
        libUrl="https://github.com/nijikokun/generate-schema"
      ></TransEditor>
    </Layout>
  );
};

export default JSONToBigQuery;
