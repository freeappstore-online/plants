import type { PlantInfo } from "./types";

export const plantDatabase: readonly PlantInfo[] = [
  // Tropical
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "tropical",
    light: "bright",
    wateringDays: 7,
    humidity: "Medium to high (50-60%)",
    temperatureRange: "18-30°C (65-85°F)",
    difficulty: "easy",
    careTips:
      "Allow soil to dry between waterings. Wipe leaves regularly to keep them dust-free and healthy. Provide a moss pole or support for climbing as it matures.",
    commonProblems:
      "Yellowing leaves from overwatering, brown leaf edges from low humidity, leggy growth in low light.",
    emoji: "🌿",
  },
  {
    id: "pothos-golden",
    name: "Golden Pothos",
    scientificName: "Epipremnum aureum",
    category: "tropical",
    light: "low",
    wateringDays: 7,
    humidity: "Low to medium (40-50%)",
    temperatureRange: "15-30°C (60-85°F)",
    difficulty: "easy",
    careTips:
      "One of the most forgiving houseplants. Let soil dry out between waterings. Trim vines to encourage bushier growth. Works well in hanging baskets or trailing from shelves.",
    commonProblems:
      "Yellowing leaves from overwatering, loss of variegation in very low light, root rot in soggy soil.",
    emoji: "🌱",
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    category: "tropical",
    light: "low",
    wateringDays: 5,
    humidity: "Medium to high (50-60%)",
    temperatureRange: "18-27°C (65-80°F)",
    difficulty: "easy",
    careTips:
      "Dramatic wilter but recovers quickly after watering. Keep away from direct sunlight which scorches leaves. Mist leaves occasionally to boost humidity.",
    commonProblems:
      "Brown leaf tips from dry air or tap water chemicals, drooping when thirsty, no blooms in very low light.",
    emoji: "☘️",
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    category: "tropical",
    light: "bright",
    wateringDays: 10,
    humidity: "Medium (40-50%)",
    temperatureRange: "16-27°C (60-80°F)",
    difficulty: "easy",
    careTips:
      "Wipe glossy leaves to maintain shine and photosynthesis efficiency. Allow top inch of soil to dry before watering. Rotate regularly for even growth.",
    commonProblems:
      "Leaf drop from cold drafts or inconsistent watering, yellowing lower leaves from overwatering, leggy growth without pruning.",
    emoji: "🌲",
  },
  {
    id: "bird-of-paradise",
    name: "Bird of Paradise",
    scientificName: "Strelitzia reginae",
    category: "tropical",
    light: "direct",
    wateringDays: 7,
    humidity: "Medium to high (50-60%)",
    temperatureRange: "18-30°C (65-85°F)",
    difficulty: "medium",
    careTips:
      "Needs bright light to produce its iconic flowers indoors. Water thoroughly and let top soil dry between waterings. Feed monthly in spring and summer.",
    commonProblems:
      "Curling leaves from underwatering, split leaves (natural outdoors, draft damage indoors), slow growth in low light.",
    emoji: "🌺",
  },
  // Succulents
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    category: "succulent",
    light: "bright",
    wateringDays: 14,
    humidity: "Low (30-40%)",
    temperatureRange: "13-27°C (55-80°F)",
    difficulty: "easy",
    careTips:
      "Water deeply but infrequently, letting soil dry completely between waterings. Use well-draining cactus mix. Gel from leaves can soothe minor burns and skin irritations.",
    commonProblems:
      "Mushy leaves from overwatering, brown tips from sunburn, leggy growth in low light.",
    emoji: "🌵",
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    scientificName: "Crassula ovata",
    category: "succulent",
    light: "bright",
    wateringDays: 14,
    humidity: "Low (30-40%)",
    temperatureRange: "13-24°C (55-75°F)",
    difficulty: "easy",
    careTips:
      "Allow soil to dry completely before watering. Can live for decades and develop thick tree-like trunks. Keep in bright light for compact growth and occasional blooms.",
    commonProblems:
      "Soft wrinkled leaves from underwatering, dropping leaves from overwatering, stretching in low light.",
    emoji: "💚",
  },
  {
    id: "echeveria",
    name: "Echeveria",
    scientificName: "Echeveria elegans",
    category: "succulent",
    light: "direct",
    wateringDays: 10,
    humidity: "Low (30-40%)",
    temperatureRange: "10-27°C (50-80°F)",
    difficulty: "easy",
    careTips:
      "Water at the soil level, avoiding rosette center where water can cause rot. Needs lots of light to maintain compact rosette shape. Remove dead lower leaves regularly.",
    commonProblems:
      "Etiolation (stretching) in low light, root rot from overwatering, mealy bugs hiding in leaf crevices.",
    emoji: "🌹",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    scientificName: "Dracaena trifasciata",
    category: "succulent",
    light: "low",
    wateringDays: 14,
    humidity: "Low (30-40%)",
    temperatureRange: "13-30°C (55-85°F)",
    difficulty: "easy",
    careTips:
      "Nearly indestructible. Water sparingly and allow soil to dry completely. Tolerates neglect, low light, and dry air. Excellent air purifier for bedrooms.",
    commonProblems:
      "Root rot from overwatering (the #1 killer), mushy base, scarred leaves from physical damage.",
    emoji: "🐍",
  },
  {
    id: "string-of-pearls",
    name: "String of Pearls",
    scientificName: "Curio rowleyanus",
    category: "succulent",
    light: "bright",
    wateringDays: 10,
    humidity: "Low to medium (30-50%)",
    temperatureRange: "13-24°C (55-75°F)",
    difficulty: "medium",
    careTips:
      "Water only when pearls start to look slightly deflated. Plant in very well-draining soil. Looks stunning cascading from a hanging planter or shelf edge.",
    commonProblems:
      "Shriveling from underwatering, mushy pearls from overwatering, pearl drop from sudden temperature changes.",
    emoji: "💿",
  },
  // Herbs
  {
    id: "basil",
    name: "Sweet Basil",
    scientificName: "Ocimum basilicum",
    category: "herb",
    light: "direct",
    wateringDays: 2,
    humidity: "Medium (40-50%)",
    temperatureRange: "18-30°C (65-85°F)",
    difficulty: "medium",
    careTips:
      "Pinch off flower buds to encourage bushy leaf growth and prevent bitterness. Keep soil consistently moist but not waterlogged. Harvest from the top down.",
    commonProblems:
      "Wilting from underwatering, black spots from cold exposure, bolting (flowering) which reduces leaf quality.",
    emoji: "🌿",
  },
  {
    id: "rosemary",
    name: "Rosemary",
    scientificName: "Salvia rosmarinus",
    category: "herb",
    light: "direct",
    wateringDays: 7,
    humidity: "Low to medium (30-45%)",
    temperatureRange: "10-24°C (50-75°F)",
    difficulty: "medium",
    careTips:
      "Prefers to dry out between waterings. Needs excellent air circulation indoors. Place near sunniest window. Prune regularly to maintain shape and encourage new growth.",
    commonProblems:
      "Powdery mildew from poor airflow, needle drop from overwatering, root rot in poorly draining soil.",
    emoji: "🌿",
  },
  {
    id: "mint",
    name: "Mint",
    scientificName: "Mentha spicata",
    category: "herb",
    light: "medium",
    wateringDays: 3,
    humidity: "Medium (40-50%)",
    temperatureRange: "13-24°C (55-75°F)",
    difficulty: "easy",
    careTips:
      "Keep soil consistently moist. Grows aggressively so keep contained in its own pot. Harvest frequently to encourage bushy growth. Great for teas and cooking.",
    commonProblems:
      "Leggy growth in low light, rust fungus on leaves, spider mites in dry indoor conditions.",
    emoji: "🌿",
  },
  {
    id: "lavender",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    category: "herb",
    light: "direct",
    wateringDays: 10,
    humidity: "Low (30-40%)",
    temperatureRange: "10-26°C (50-78°F)",
    difficulty: "medium",
    careTips:
      "Needs lots of light and excellent drainage. Allow soil to dry between waterings. Prune after flowering to maintain compact shape. Fragrant flowers are great for sachets.",
    commonProblems:
      "Root rot from overwatering, poor blooming in low light, woody leggy growth without pruning.",
    emoji: "💜",
  },
  {
    id: "cilantro",
    name: "Cilantro",
    scientificName: "Coriandrum sativum",
    category: "herb",
    light: "bright",
    wateringDays: 3,
    humidity: "Medium (40-50%)",
    temperatureRange: "10-24°C (50-75°F)",
    difficulty: "medium",
    careTips:
      "Fast-growing but short-lived. Sow new seeds every 3 weeks for continuous harvest. Keep soil moist and harvest outer leaves first. Prefers cooler temperatures.",
    commonProblems:
      "Bolts quickly in heat, short lifespan, leaf yellowing from overwatering or nutrient deficiency.",
    emoji: "🌿",
  },
  // Flowering
  {
    id: "orchid-phalaenopsis",
    name: "Moth Orchid",
    scientificName: "Phalaenopsis spp.",
    category: "flowering",
    light: "bright",
    wateringDays: 7,
    humidity: "Medium to high (50-70%)",
    temperatureRange: "18-29°C (65-85°F)",
    difficulty: "medium",
    careTips:
      "Water when roots turn silvery-grey. Use bark-based orchid mix, never regular soil. Place in bright indirect light. After blooms fade, cut spike above a node for possible re-bloom.",
    commonProblems:
      "Root rot from overwatering or sitting in water, bud blast from temperature fluctuations, crown rot from water in the center.",
    emoji: "🌺",
  },
  {
    id: "african-violet",
    name: "African Violet",
    scientificName: "Streptocarpus sect. Saintpaulia",
    category: "flowering",
    light: "medium",
    wateringDays: 5,
    humidity: "Medium to high (50-60%)",
    temperatureRange: "18-24°C (65-75°F)",
    difficulty: "medium",
    careTips:
      "Water from below to avoid leaf spots. Provide consistent bright indirect light for continuous blooming. Use specialized African violet fertilizer during growing season.",
    commonProblems:
      "Water spots on leaves from top-watering, crown rot from overwatering, failure to bloom in low light.",
    emoji: "💜",
  },
  {
    id: "anthurium",
    name: "Anthurium",
    scientificName: "Anthurium andraeanum",
    category: "flowering",
    light: "bright",
    wateringDays: 7,
    humidity: "High (60-80%)",
    temperatureRange: "18-27°C (65-80°F)",
    difficulty: "medium",
    careTips:
      "The colorful 'flowers' are actually modified leaves called spathes. Keep in bright indirect light and high humidity. Water when top inch of soil is dry.",
    commonProblems:
      "Brown leaf tips from low humidity, yellowing leaves from overwatering, lack of flowers in low light.",
    emoji: "❤️",
  },
  {
    id: "christmas-cactus",
    name: "Christmas Cactus",
    scientificName: "Schlumbergera bridgesii",
    category: "flowering",
    light: "bright",
    wateringDays: 7,
    humidity: "Medium (40-60%)",
    temperatureRange: "15-24°C (60-75°F)",
    difficulty: "easy",
    careTips:
      "Despite being a cactus, it prefers more moisture than desert cacti. To trigger blooming, provide 12-14 hours of darkness daily for 6 weeks before desired bloom time.",
    commonProblems:
      "Bud drop from temperature swings or moving the plant, limp stems from overwatering, failure to bloom without dark period.",
    emoji: "🌺",
  },
  {
    id: "begonia-rex",
    name: "Rex Begonia",
    scientificName: "Begonia rex-cultorum",
    category: "flowering",
    light: "medium",
    wateringDays: 5,
    humidity: "High (60-70%)",
    temperatureRange: "16-24°C (60-75°F)",
    difficulty: "hard",
    careTips:
      "Grown primarily for stunning patterned foliage rather than flowers. Keep soil evenly moist but never soggy. Provide high humidity through pebble trays or grouping with other plants.",
    commonProblems:
      "Powdery mildew from poor air circulation, crispy leaf edges from low humidity, stem rot from overwatering.",
    emoji: "🍁",
  },
  // Ferns
  {
    id: "boston-fern",
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    category: "fern",
    light: "medium",
    wateringDays: 3,
    humidity: "High (60-80%)",
    temperatureRange: "16-24°C (60-75°F)",
    difficulty: "medium",
    careTips:
      "Keep soil consistently moist but not waterlogged. Mist regularly or use a humidity tray. Trim brown fronds at the base. Looks beautiful in hanging baskets.",
    commonProblems:
      "Leaf shedding from dry air, browning fronds from inconsistent watering, spider mites in dry conditions.",
    emoji: "🌿",
  },
  {
    id: "maidenhair-fern",
    name: "Maidenhair Fern",
    scientificName: "Adiantum raddianum",
    category: "fern",
    light: "medium",
    wateringDays: 2,
    humidity: "High (60-80%)",
    temperatureRange: "16-24°C (60-75°F)",
    difficulty: "hard",
    careTips:
      "The diva of houseplants. Needs constant moisture and humidity. Never let soil dry out completely. Place away from drafts and heating vents. Worth the effort for its delicate beauty.",
    commonProblems:
      "Crispy fronds from any drying out, complete dieback from neglect (can regrow from roots), brown patches from direct sun.",
    emoji: "🌿",
  },
  {
    id: "birds-nest-fern",
    name: "Bird's Nest Fern",
    scientificName: "Asplenium nidus",
    category: "fern",
    light: "low",
    wateringDays: 5,
    humidity: "Medium to high (50-70%)",
    temperatureRange: "16-27°C (60-80°F)",
    difficulty: "easy",
    careTips:
      "Water around the edge of the rosette, not into the center. More tolerant of lower humidity than other ferns. Keep away from direct sunlight which burns the fronds.",
    commonProblems:
      "Brown leaf tips from dry air, pale fronds from too much light, center rot from watering into the rosette.",
    emoji: "🪹",
  },
  {
    id: "staghorn-fern",
    name: "Staghorn Fern",
    scientificName: "Platycerium bifurcatum",
    category: "fern",
    light: "bright",
    wateringDays: 7,
    humidity: "Medium to high (50-70%)",
    temperatureRange: "16-27°C (60-80°F)",
    difficulty: "medium",
    careTips:
      "Can be mounted on boards for a dramatic wall display. Soak the root ball when watering rather than just surface watering. The brown shield fronds are normal and protective.",
    commonProblems:
      "Black spots on fronds from overwatering, drooping from underwatering, sunburn from direct light.",
    emoji: "🦌",
  },
  {
    id: "asparagus-fern",
    name: "Asparagus Fern",
    scientificName: "Asparagus setaceus",
    category: "fern",
    light: "bright",
    wateringDays: 4,
    humidity: "Medium (40-60%)",
    temperatureRange: "13-24°C (55-75°F)",
    difficulty: "easy",
    careTips:
      "Not a true fern but cared for similarly. Keep soil moist during growing season. Has small thorns so handle carefully. Produces tiny white flowers and red berries.",
    commonProblems:
      "Yellowing needles from underwatering, needle drop from drafts, aggressive root growth can crack pots.",
    emoji: "🌿",
  },
  // Vines
  {
    id: "philodendron-heartleaf",
    name: "Heartleaf Philodendron",
    scientificName: "Philodendron hederaceum",
    category: "vine",
    light: "medium",
    wateringDays: 7,
    humidity: "Medium (40-50%)",
    temperatureRange: "16-27°C (60-80°F)",
    difficulty: "easy",
    careTips:
      "One of the easiest trailing plants. Let top inch of soil dry between waterings. Prune to encourage fullness. Can be trained to climb a moss pole or trail from shelves.",
    commonProblems:
      "Yellowing leaves from overwatering, small leaves from low light, leggy stems without pruning.",
    emoji: "💚",
  },
  {
    id: "english-ivy",
    name: "English Ivy",
    scientificName: "Hedera helix",
    category: "vine",
    light: "medium",
    wateringDays: 5,
    humidity: "Medium to high (50-60%)",
    temperatureRange: "10-21°C (50-70°F)",
    difficulty: "medium",
    careTips:
      "Prefers cooler temperatures than most houseplants. Keep soil evenly moist. Excellent air purifier. Looks elegant trailing from shelves or trained on a small trellis.",
    commonProblems:
      "Spider mites are extremely common indoors, crispy leaves from dry air, root rot in soggy soil.",
    emoji: "🍃",
  },
  {
    id: "hoya-carnosa",
    name: "Hoya",
    scientificName: "Hoya carnosa",
    category: "vine",
    light: "bright",
    wateringDays: 10,
    humidity: "Medium (40-60%)",
    temperatureRange: "16-29°C (60-85°F)",
    difficulty: "easy",
    careTips:
      "Let soil dry out between waterings. Can produce stunning fragrant flower clusters when mature. Don't remove old flower spurs as new blooms grow from the same spot.",
    commonProblems:
      "Failure to bloom (needs maturity + bright light), yellowing from overwatering, mealy bugs on stems.",
    emoji: "⭐",
  },
  {
    id: "string-of-hearts",
    name: "String of Hearts",
    scientificName: "Ceropegia woodii",
    category: "vine",
    light: "bright",
    wateringDays: 10,
    humidity: "Low to medium (30-50%)",
    temperatureRange: "13-27°C (55-80°F)",
    difficulty: "easy",
    careTips:
      "A semi-succulent vine that stores water in its tuber and leaves. Water sparingly and let soil dry between waterings. The delicate trailing chains look beautiful in hanging planters.",
    commonProblems:
      "Mushy leaves from overwatering, sparse growth from low light, tangling of chains when moving.",
    emoji: "💕",
  },
  {
    id: "wandering-dude",
    name: "Wandering Dude",
    scientificName: "Tradescantia zebrina",
    category: "vine",
    light: "bright",
    wateringDays: 5,
    humidity: "Medium (40-60%)",
    temperatureRange: "13-27°C (55-80°F)",
    difficulty: "easy",
    careTips:
      "Fast-growing with stunning purple-striped leaves. Pinch back regularly to keep full and bushy. Propagates incredibly easily in water from stem cuttings.",
    commonProblems:
      "Leggy growth in low light, loss of purple coloring without enough light, root rot in waterlogged soil.",
    emoji: "💜",
  },
] as const;

export const categoryLabels: Record<string, string> = {
  tropical: "Tropical",
  succulent: "Succulent",
  herb: "Herb",
  flowering: "Flowering",
  fern: "Fern",
  vine: "Vine",
};

export const categoryEmojis: Record<string, string> = {
  tropical: "🌴",
  succulent: "🌵",
  herb: "🌿",
  flowering: "🌺",
  fern: "🌿",
  vine: "🍃",
};

export const locationEmojis: Record<string, string> = {
  "living room": "🛋️",
  bedroom: "🛏️",
  kitchen: "🍳",
  balcony: "🌅",
  office: "💼",
  bathroom: "🚿",
};
