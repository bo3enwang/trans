import { Model } from "../client/interfaces/Model";

const modelBuilder = (model: Model) => {
  return `
  type{{space}}${model.name}{{space}}{
    ${model.properties
      .map((p, i) => {
        let str = `${p.name}?:{{space}}${p.type};`;
        if (i < model.properties.length - 1) {
          str = str + "\n";
        }
        return "{{indent}}" + str;
      })
      .join("")}
  }
  `
    .replaceAll(" ", "")
    .replaceAll("{{indent}}", "  ")
    .replaceAll("{{space}}", " ");
};
export default modelBuilder;
