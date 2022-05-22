import React from "react";
import { CopyBlock, atomOneLight } from "react-code-blocks";

interface CodeBlockProps {
  code?: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <CopyBlock text={code} theme={atomOneLight} language={language}></CopyBlock>
  );
};

export default CodeBlock;
