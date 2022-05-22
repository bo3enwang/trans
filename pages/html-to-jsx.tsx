import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";
import HtmlToJsxUtils from "@erikwithuhk/html-to-jsx";
import { defaultHTMLCode } from "constant/defaultCode";

const converter = new HtmlToJsxUtils({
  createClass: false,
});

interface HTMLToJsxProps {}

const HTMLToJsx: React.FC<HTMLToJsxProps> = ({}) => {
  const trans: CodeTransformer = async (code) => {
    const result = converter.convert(code);
    return result;
  };
  return (
    <Layout>
      <TransEditor
        trans={trans}
        defaultCode={defaultHTMLCode}
        language="html"
        targetLanguage="jsx"
        sourceTitle="HTML"
        targetTitle="JSX"
        libName="html-to-jsx"
        libUrl="https://github.com/reactjs/react-magic"
      ></TransEditor>
    </Layout>
  );
};

export default HTMLToJsx;
