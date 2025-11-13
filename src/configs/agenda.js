import Agenda from "agenda";
import { DB_URI } from "../configs/env.js";

const agenda = new Agenda({
  db: { address: DB_URI, collection: "jobs" },
});

export default agenda;
