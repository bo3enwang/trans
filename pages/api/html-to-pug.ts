import { NextApiRequest, NextApiResponse } from "next";
const html2pug = require("html2pug");

type Data = {
  output: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { value, settings = {} } = JSON.parse(req.body);
    if (value) {
      const result = html2pug(value, { tabs: true });
      res.status(200).json({ output: result });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("something wrong");
  }
  res.status(500).json("something wrong");
}
