export type Sun = "full" | "part" | "shade";
export type Moisture = "dry" | "average" | "moist";
export type GardenSize = "small" | "medium" | "large";

export type Plant = {
  id: string;
  common: string;
  latin: string;
  zone: [number, number];
  sun: Sun[];
  moisture: Moisture[];
  heightCm: [number, number];
  bloom: number[];
  bloomLabel: string;
  color: string;
  role: string;
  note: string;
};

export type PlanInput = {
  place: string;
  zone: number;
  sun: Sun;
  moisture: Moisture;
  size: GardenSize;
};

export const plants: Plant[] = [
  {
    id: "yarrow",
    common: "Common yarrow",
    latin: "Achillea millefolium",
    zone: [2, 9],
    sun: ["full", "part"],
    moisture: ["dry", "average"],
    heightCm: [45, 75],
    bloom: [6, 7, 8, 9],
    bloomLabel: "Jun–Sep",
    color: "#efe1b6",
    role: "long-season landing pad",
    note: "A durable prairie perennial with flat flower clusters for small pollinators.",
  },
  {
    id: "bergamot",
    common: "Wild bergamot",
    latin: "Monarda fistulosa",
    zone: [3, 9],
    sun: ["full", "part"],
    moisture: ["dry", "average"],
    heightCm: [60, 120],
    bloom: [7, 8, 9],
    bloomLabel: "Jul–Sep",
    color: "#b899bd",
    role: "aromatic summer anchor",
    note: "Lavender flower heads and aromatic foliage suit informal, sunny planting.",
  },
  {
    id: "goldenrod",
    common: "Stiff goldenrod",
    latin: "Solidago rigida",
    zone: [3, 9],
    sun: ["full"],
    moisture: ["dry", "average"],
    heightCm: [75, 150],
    bloom: [8, 9, 10],
    bloomLabel: "Aug–Oct",
    color: "#d9aa25",
    role: "late-season reserve",
    note: "Strong upright stems hold broad golden flower clusters late in the year.",
  },
  {
    id: "aster",
    common: "Smooth blue aster",
    latin: "Symphyotrichum laeve",
    zone: [3, 8],
    sun: ["full", "part"],
    moisture: ["dry", "average"],
    heightCm: [60, 120],
    bloom: [8, 9, 10],
    bloomLabel: "Aug–Oct",
    color: "#8f91b8",
    role: "autumn bridge",
    note: "Blue-violet flowers extend garden colour and forage into cool weather.",
  },
  {
    id: "columbine",
    common: "Western red columbine",
    latin: "Aquilegia formosa",
    zone: [3, 8],
    sun: ["part", "shade"],
    moisture: ["average", "moist"],
    heightCm: [30, 90],
    bloom: [5, 6, 7],
    bloomLabel: "May–Jul",
    color: "#bd604f",
    role: "woodland opening note",
    note: "Nodding red and yellow flowers bring early structure to sheltered beds.",
  },
  {
    id: "penstemon",
    common: "Smooth blue beardtongue",
    latin: "Penstemon nitidus",
    zone: [2, 6],
    sun: ["full"],
    moisture: ["dry", "average"],
    heightCm: [15, 40],
    bloom: [5, 6],
    bloomLabel: "May–Jun",
    color: "#617ca8",
    role: "early blue signal",
    note: "Compact blue flowers work well near path edges and in gravelly soil.",
  },
  {
    id: "prairie-crocus",
    common: "Prairie crocus",
    latin: "Pulsatilla nuttalliana",
    zone: [2, 6],
    sun: ["full"],
    moisture: ["dry"],
    heightCm: [10, 30],
    bloom: [4, 5],
    bloomLabel: "Apr–May",
    color: "#9c90aa",
    role: "first spring emergence",
    note: "A low, early-blooming prairie plant for undisturbed, free-draining sites.",
  },
  {
    id: "fireweed",
    common: "Fireweed",
    latin: "Chamerion angustifolium",
    zone: [2, 7],
    sun: ["full", "part"],
    moisture: ["average", "moist"],
    heightCm: [90, 180],
    bloom: [6, 7, 8],
    bloomLabel: "Jun–Aug",
    color: "#c45678",
    role: "tall colour column",
    note: "A bold, spreading pioneer best reserved for a generous or contained patch.",
  },
  {
    id: "blue-eyed-grass",
    common: "Blue-eyed grass",
    latin: "Sisyrinchium montanum",
    zone: [2, 8],
    sun: ["full", "part"],
    moisture: ["average", "moist"],
    heightCm: [15, 40],
    bloom: [5, 6, 7],
    bloomLabel: "May–Jul",
    color: "#657daa",
    role: "fine-textured edge",
    note: "Grass-like leaves and small blue flowers soften the front of a planting.",
  },
  {
    id: "harebell",
    common: "Harebell",
    latin: "Campanula rotundifolia",
    zone: [2, 8],
    sun: ["full", "part"],
    moisture: ["dry", "average"],
    heightCm: [15, 45],
    bloom: [6, 7, 8, 9],
    bloomLabel: "Jun–Sep",
    color: "#7686bd",
    role: "airy path companion",
    note: "Fine stems and bell-shaped flowers weave easily through low planting.",
  },
  {
    id: "joe-pye",
    common: "Spotted Joe-Pye weed",
    latin: "Eutrochium maculatum",
    zone: [3, 8],
    sun: ["full", "part"],
    moisture: ["average", "moist"],
    heightCm: [120, 210],
    bloom: [7, 8, 9],
    bloomLabel: "Jul–Sep",
    color: "#b4808f",
    role: "moisture-loving canopy",
    note: "A tall architectural perennial for rain gardens and consistently moist soil.",
  },
  {
    id: "wild-strawberry",
    common: "Wild strawberry",
    latin: "Fragaria virginiana",
    zone: [2, 8],
    sun: ["full", "part"],
    moisture: ["dry", "average", "moist"],
    heightCm: [10, 20],
    bloom: [5, 6],
    bloomLabel: "May–Jun",
    color: "#f4eee0",
    role: "living ground layer",
    note: "A low spreading plant that knits open soil around taller companions.",
  },
  {
    id: "bunchberry",
    common: "Bunchberry",
    latin: "Cornus canadensis",
    zone: [2, 7],
    sun: ["part", "shade"],
    moisture: ["average", "moist"],
    heightCm: [10, 20],
    bloom: [5, 6, 7],
    bloomLabel: "May–Jul",
    color: "#e8e1d2",
    role: "cool woodland carpet",
    note: "A creeping forest-floor species for acidic, humus-rich, reliably cool soil.",
  },
  {
    id: "meadow-rue",
    common: "Tall meadow-rue",
    latin: "Thalictrum pubescens",
    zone: [3, 8],
    sun: ["part", "shade"],
    moisture: ["average", "moist"],
    heightCm: [90, 180],
    bloom: [6, 7, 8],
    bloomLabel: "Jun–Aug",
    color: "#e9e4d7",
    role: "soft woodland veil",
    note: "Tall, airy flower clusters add height without creating a heavy visual wall.",
  },
];

const planCounts: Record<GardenSize, number> = {
  small: 6,
  medium: 8,
  large: 10,
};

export function matchPlants(input: PlanInput): Plant[] {
  return plants
    .map((plant) => {
      const zoneMatch = input.zone >= plant.zone[0] && input.zone <= plant.zone[1];
      const sunMatch = plant.sun.includes(input.sun);
      const moistureMatch = plant.moisture.includes(input.moisture);
      const seasonBreadth = plant.bloom.length / 10;
      const score = (zoneMatch ? 5 : -20) + (sunMatch ? 3 : -3) + (moistureMatch ? 3 : -3) + seasonBreadth;
      return { plant, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.plant.heightCm[1] - b.plant.heightCm[1])
    .slice(0, planCounts[input.size])
    .map(({ plant }) => plant);
}

export function gardenArea(size: GardenSize) {
  if (size === "small") return "2 × 2 m";
  if (size === "medium") return "3 × 4 m";
  return "5 × 6 m";
}

export function encodePlan(input: PlanInput) {
  return new URLSearchParams({
    place: input.place,
    zone: String(input.zone),
    sun: input.sun,
    moisture: input.moisture,
    size: input.size,
  }).toString();
}

export function decodePlan(params: URLSearchParams): PlanInput | null {
  const zone = Number(params.get("zone"));
  const sun = params.get("sun") as Sun | null;
  const moisture = params.get("moisture") as Moisture | null;
  const size = params.get("size") as GardenSize | null;
  if (
    !Number.isInteger(zone) ||
    zone < 2 ||
    zone > 8 ||
    !sun ||
    !["full", "part", "shade"].includes(sun) ||
    !moisture ||
    !["dry", "average", "moist"].includes(moisture) ||
    !size ||
    !["small", "medium", "large"].includes(size)
  ) {
    return null;
  }
  return { place: params.get("place")?.slice(0, 80) || "My garden", zone, sun, moisture, size };
}
