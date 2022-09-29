import { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../client";
import { Task } from "../../[filter]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // GET /api/todo
  if (req.method === "GET") {
    const result = await client.queryJSON(
      "SELECT Task { id, text, completed } ORDER BY .id;"
    );
    const data = JSON.parse(result) as Task[];
    return res.status(200).json(data);
  }

  // POST /api/todo
  // expects { text: string }
  if (req.method === "POST") {
    await client.queryJSON("INSERT Task { text := <str>$text };", {
      text: req.body.text,
    });
    return res.status(200).send("Success");
  }

  return res.status(400);
};

export default handler;
