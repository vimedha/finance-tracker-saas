import {Hono} from "hono";
import {handle} from "hono/vercel";

import accounts from "./accounts";
import  categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

export const runtime = "edge";
const app=new Hono().basePath('/api');

app
.route("/accounts", accounts)
.route("/categories", categories)
.route("/transactions", transactions)
.route("/summary", summary);
        
<<<<<<< HEAD
export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH=handle(routes);
export const DELETE=handle(routes);
export type AppType=typeof routes;
=======
export const GET = handle(app);
export const POST = handle(app);
export const PATCH=handle(app);
export const DELETE=handle(app);
export type AppType=typeof app;
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a
