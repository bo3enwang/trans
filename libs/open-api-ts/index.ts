import { getOpenApiVersion, OpenApiVersion } from "./utils/getOpenApiVersion";
import { isString } from "./utils/isString";

import { parse as parseV2 } from "./schema/v2";
import { parse as parseV3 } from "./schema/v3";
import { getOpenApiSpec } from "./utils/getOpenApiSpec";

export type Options = {
  input: string | Record<string, any>;
};

export const generate = async ({ input }: Options) => {
  const openApi = isString(input) ? await getOpenApiSpec(input) : input;
  const openApiVersion = getOpenApiVersion(openApi);
  switch (openApiVersion) {
    case OpenApiVersion.V2: {
      const client = parseV2(openApi);
      return client;
    }

    case OpenApiVersion.V3: {
      const client = parseV3(openApi);
      return client;
    }
  }
};
