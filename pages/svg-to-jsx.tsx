import TransEditor from "@/components/TransEditor";
import Layout from "layouts";
import React from "react";
import isSvg from "is-svg";
import { defaultSvgCode } from "constant/defaultCode";

interface SvgToJsxProps {}

const SvgToJsx: React.FC<SvgToJsxProps> = ({}) => {
  const trans = async (code: string) => {
    // console.log(convert);
    if (isSvg(code)) {
      const res = await fetch("/api/svg", {
        method: "POST",
        body: JSON.stringify({ code, config: {} }),
      });
      const { output } = await res.json();
      return output;
    } else {
      throw "not validate svg";
    }
    return "";
  };

  return (
    <Layout>
      <TransEditor
        trans={trans}
        defaultCode={defaultSvgCode}
        language="svg"
        targetLanguage="jsx"
        sourceTitle="SVG"
        targetTitle="JSX"
        libName="svgr"
        libUrl="https://github.com/gregberge/svgr"
      ></TransEditor>
    </Layout>
  );
};

export default SvgToJsx;
