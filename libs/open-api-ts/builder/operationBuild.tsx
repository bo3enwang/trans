import { Operation } from "../client/interfaces/Operation";
import { OperationParameter } from "../client/interfaces/OperationParameter";

const operationBuild = (operation: Operation) => {
  const groups = operation.parameters.reduce((pre: any, cur) => {
    if (!pre[cur.in]) {
      pre[cur.in] = [];
    }
    pre[cur.in].push(cur);
    return pre;
  }, {});

  const pathTemplate = buildPathParams(groups["path"]);
  const queryTemplate = buildQueryParams(groups["query"]);
  const bodyTemplate = buildBodyParams(groups["body"]);

  const params = [pathTemplate, queryTemplate, bodyTemplate]
    .filter((p) => {
      return p;
    })
    .join(",");

  const path = operation.path.replaceAll("{", "${");

  const body = bodyTemplate ? "{{indent}}{{indent}}data" : "";

  return `
  const{{space}}${operation.name}{{space}}={{space}}(${params}){{space}}=>{{space}}{
  {{indent}}return{{space}}request({
    {{indent}}{{indent}}method{{space}}:{{space}}"${operation.method}",
    {{indent}}{{indent}}url{{space}}:{{space}}\`${path}\`,
    ${body}
    {{indent}}});
  }
  `
    .replaceAll(" ", "")
    .replaceAll("{{indent}}", "  ")
    .replaceAll("{{space}}", " ");
};

const buildPathParams = (params?: OperationParameter[]) => {
  if (!params) {
    return "";
  }
  if (params.length === 0) {
    return "";
  }
  return params
    .map((p, i) => {
      let str = `${p.name}{{space}}${p.isNullable ? "?" : ""}:{{space}}${
        p.type
      }`;
      if (i < params.length - 1) {
        str += ",{{space}}";
      }
      return str;
    })
    .join("");
};

const buildQueryParams = (params?: OperationParameter[]) => {
  if (!params) {
    return "";
  }
  if (params.length === 0) {
    return "";
  }

  return params.map((p) => {
    return `${p.name}{{space}}${p.isNullable ? "?" : ""}:{{space}}${p.type}`;
  });
};

const buildBodyParams = (params?: OperationParameter[]) => {
  if (!params) {
    return "";
  }
  if (params.length === 0) {
    return "";
  }
  return params.map((p) => {
    return `data{{space}}${p.isNullable ? "?" : ""}:{{space}}${p.type}`;
  });
};

export default operationBuild;
