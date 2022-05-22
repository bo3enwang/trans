import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";

interface CssToTailwindProps {}

const CssToTailwind: React.FC<CssToTailwindProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    // if (code) {
    //   const schema = jsonToSchema({ jsonInput: code });
    //   return schema.value;
    // }
    return "";
  };
  return (
    <Layout>
      <TransEditor></TransEditor>
    </Layout>
  );
};

export default CssToTailwind;
