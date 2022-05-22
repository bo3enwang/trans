import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import { defaultHTMLCode } from "constant/defaultCode";
import Layout from "layouts";
import React from "react";

interface HtmlToPugProps {}

const HtmlToPug: React.FC<HtmlToPugProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    const res = await fetch("/api/html-to-pug", {
      method: "POST",
      body: JSON.stringify({
        value: code,
      }),
    });
    const result = await res.json();
    const { output } = result;
    return output;
  };

  return (
    <Layout>
      <TransEditor
        trans={trans}
        defaultCode={defaultHTMLCode}
        language="html"
        targetLanguage="pug"
        sourceTitle="HTML"
        targetTitle="PUG"
        libName="html2pug"
        libUrl="https://github.com/izolate/html2pug"
      ></TransEditor>
    </Layout>
  );
};

export default HtmlToPug;
