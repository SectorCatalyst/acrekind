import { describe, expect, it } from "vitest";
import { decodePlan, encodePlan, matchPlants, type PlanInput } from "./planner";

const sunnyPrairie: PlanInput = {
  place: "Calgary",
  zone: 4,
  sun: "full",
  moisture: "dry",
  size: "small",
};

describe("Acrekind planner", () => {
  it("returns zone-appropriate matches and respects the plot size", () => {
    const result = matchPlants(sunnyPrairie);
    expect(result).toHaveLength(6);
    expect(result.every((plant) => sunnyPrairie.zone >= plant.zone[0] && sunnyPrairie.zone <= plant.zone[1])).toBe(true);
    expect(result[0].sun).toContain("full");
  });

  it("round trips a shared plan", () => {
    const decoded = decodePlan(new URLSearchParams(encodePlan(sunnyPrairie)));
    expect(decoded).toEqual(sunnyPrairie);
  });

  it("rejects malformed shared plans", () => {
    expect(decodePlan(new URLSearchParams("zone=99&sun=full&moisture=dry&size=small"))).toBeNull();
  });
});
