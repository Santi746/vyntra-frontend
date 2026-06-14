import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * CIENCIA_CLUBS contiene una lista de clubes ficticios categorizados bajo ciencia.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const CIENCIA_CLUBS = [
  new ClubData({
    uuid: "club_024",
    name: "Space Exploration",
    category_tag: "Science",
    description:
      "Configuraciones de telescopios, noticias de la NASA y astrofotografía.",
    banner_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    members_count: "89.2k",
    online_count: "4.5k",
    featured_text: "Nuevas imágenes del James Webb",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=200",
    created_at: "2018",
    owner_uuid: "usr_rel_4521",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_025",
    name: "Physics World",
    category_tag: "Edu",
    description:
      "Discusiones sobre física cuántica, relatividad y espacio-tiempo.",
    banner_url:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800",
    members_count: "34.1k",
    online_count: "1.2k",
    featured_text: "¿El gato de Schrodinger resuelto?",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=200",
    created_at: "2020",
    owner_uuid: "usr_rel_8834",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_026",
    name: "Bio Lab",
    category_tag: "Nature",
    description: "Biología, genética y las maravillas del mundo natural.",
    banner_url:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800",
    members_count: "12.8k",
    online_count: "320",
    featured_text: "Avance en CRISPR",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=200",
    created_at: "2023",
    owner_uuid: "usr_master_7842",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_027",
    name: "Global Tech",
    category_tag: "Futurism",
    description: "El futuro ya está aquí. Gadgets, chips y robótica con IA.",
    banner_url:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800",
    members_count: "42.3k",
    online_count: "2.1k",
    featured_text: "Noticias de Boston Dynamics",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2021",
    owner_uuid: "usr_rel_1190",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_028",
    name: "Archaeology",
    category_tag: "History",
    description:
      "Descubre los secretos de las civilizaciones de nuestros ancestros.",
    banner_url:
      "https://images.unsplash.com/photo-1554303486-cb4b90a27751?q=80&w=800",
    members_count: "8.4k",
    online_count: "120",
    featured_text: "Nueva tumba encontrada en Egipto",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2016",
    owner_uuid: "usr_rel_2201",
    categories: categories,
  }),
];

