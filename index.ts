import { Request, Response } from "express";
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from "cors";
import AirtableService from "./server/service/AirtableService";
import { airtableConfigs } from "./server/airtableConfig";
dotenv.config();

const app: express.Application = express();
app.use(helmet());
app.use(cors({
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}));

//express only serves static assets in productions
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//api calls
app.get('/api/health', (req: Request, res: Response) => res.send("ok"));

for (const config of airtableConfigs) {
  const airtable = new AirtableService(config);

  // fetch whole table
  app.get(`/api/${config.route}`, async (req: Request, res: Response) => {
    try {
      const r = await airtable.getCachedTableContent();
      return res.send(r);
    } catch(e) {
      return res.status(500).send(e);
    }
  });

  // find individual record
  app.get(`/api/${config.route}/:id`, async (req: Request, res: Response) => {
    try {
      const r = await airtable.getCachedRecord(req.params.id);
      return res.send(r);
    } catch(e) {
      return res.status(500).send(e);
    }
  });
}

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${process.env.PORT}`, `${new Date()}`);
}); 