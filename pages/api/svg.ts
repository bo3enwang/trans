// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transform } from "@svgr/core";

type Data = {
  output: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code, config = {} } = JSON.parse(req.body);
  const { native } = config;
  const output = await transform(
    code,
    {
      icon: true,
      native,
      plugins: [
        "@svgr/plugin-svgo",
        "@svgr/plugin-jsx",
        "@svgr/plugin-prettier",
      ],
    },
    { componentName: "MyComponent" }
  );
  res.status(200).json({ output: output });
}
