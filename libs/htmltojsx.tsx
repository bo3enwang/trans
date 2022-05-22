import HtmlToJsx from "htmltojsx";

const htmlConvertor = (html: string) => {
  const converter = new HtmlToJsx({
    createClass: false,
  });
  let result = converter.convert(html);
  return result;
};

export default htmlConvertor;
