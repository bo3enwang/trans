import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";
import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema/lib";
import { defaultJSONCode } from "constant/defaultCode";

interface JSONTOGraphQLProps {}

const JSONTOGraphQL: React.FC<JSONTOGraphQLProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    if (code) {
      const schema = jsonToSchema({ jsonInput: code });
      return schema.value;
    }
    return "";
  };

  return (
    <Layout>
      <TransEditor
        defaultCode={defaultJSONCode}
        trans={trans}
        language="json"
        targetLanguage="GraphQL"
        sourceTitle="JSON"
        targetTitle="GraphQL"
        libName="json-to-simple-graphql-schema"
        libUrl="https://github.com/walmartlabs/json-to-simple-graphql-schema"
      ></TransEditor>
    </Layout>
  );
};

export default JSONTOGraphQL;
