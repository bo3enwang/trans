import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import json2yaml from "@/libs/json2yaml";
import { defaultJSONCode } from "constant/defaultCode";
import Layout from "layouts";
import React from "react";

interface JSONToYamlProps {}

const JSONToYaml: React.FC<JSONToYamlProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    const result = json2yaml(code);
    return result;
  };
  return (
    <Layout>
      <TransEditor
        trans={trans}
        defaultCode={defaultJSONCode}
        language="json"
        targetLanguage="yaml"
        sourceTitle="JSON"
        targetTitle="YAML"
        libName="json2yaml"
        libUrl="https://github.com/jeffsu/json2yaml"
      ></TransEditor>
    </Layout>
  );
};

export default JSONToYaml;
