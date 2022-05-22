import TransEditor, { CodeTransformer } from "@/components/TransEditor";
import { defaultSvgCode } from "constant/defaultCode";
import isSvg from "is-svg";
import Layout from "layouts";
import React from "react";

interface SvgToReactNativeProps {}

const SvgToReactNative: React.FC<SvgToReactNativeProps> = ({}) => {
  const trans = async (code: string) => {
    // console.log(convert);
    if (isSvg(code)) {
      const res = await fetch("/api/svg", {
        method: "POST",
        body: JSON.stringify({ code, config: { native: true } }),
      });
      const { output } = await res.json();
      return output;
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

export default SvgToReactNative;
