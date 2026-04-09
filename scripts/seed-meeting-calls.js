import mongoose from "mongoose";
import connectToDatabase from "../src/database/mongodb.js";
import MeetingCall from "../src/modules/meetings/infrastructure/models/meeting-call.model.js";
import Team from "../src/modules/teams/infrastructure/models/team.model.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      parsed[key] = value;
      i += 1;
    }
  }
  return parsed;
}

const defaults = {
  companyId: "690c900910856af1dcc844f9",
  teamId: "69d2e6985c97c5cbc87ba167",
  count: "10",
};

const params = { ...defaults, ...parseArgs() };
const count = Math.max(1, Number(params.count) || 10);

if (!mongoose.Types.ObjectId.isValid(params.companyId)) {
  throw new Error("Invalid companyId");
}
if (!mongoose.Types.ObjectId.isValid(params.teamId)) {
  throw new Error("Invalid teamId");
}

await connectToDatabase();

const team = await Team.findById(params.teamId).select("members");
const allowedMembers = team?.members || [];

const docs = Array.from({ length: count }, () => ({
  eventId: new mongoose.Types.ObjectId(),
  teamId: params.teamId,
  companyId: params.companyId,
  allowedMembers,
  status: "started",
}));

await MeetingCall.insertMany(docs, { ordered: false });

console.log(
  `Seeded ${docs.length} meeting calls for team ${params.teamId} in company ${params.companyId}`
);

await mongoose.disconnect();
