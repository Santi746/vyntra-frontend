import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";
import { ROLES_TABLE } from "@/features/clubs/data/roles_table";

/**
 * VIDEOJUEGOS_CLUBS contiene una lista de clubes ficticios categorizados bajo videojuegos.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const VIDEOJUEGOS_CLUBS = [
  new ClubData({
    uuid: "club_004",
    name: "Santiago",
    category_tag: "FPS",
    description:
      "Estrategias de E-Sports, alineaciones y discusiones competitivas.",
    banner_url:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
    members_count: "120.3k",
    online_count: "14.2k",
    featured_text: "Finales del VCT Masters",
    is_verified: true,
    avatar_url: "/descargar.png",
    created_at: "2023",
    owner_uuid: "usr_master_7842", // El usuario maestro es el dueño
    categories: categories,
    roles: ROLES_TABLE,
    members: [
      { user_uuid: "usr_master_7842", roles_ids: ["role_owner"] },
      { user_uuid: "usr_rel_4521", roles_ids: ["role_admin"] },
    ],
  }),
  new ClubData({
    uuid: "club_005",
    name: "Elden Ring Hub",
    category_tag: "RPG",
    description:
      "Lore, builds y ayuda cooperativa para todos los juegos de Soulsborne.",
    banner_url:
      "https://images.unsplash.com/photo-1517936800027-11566f8f89ce?q=80&w=800",
    members_count: "84.1k",
    online_count: "5.3k",
    featured_text: "Hype por Shadow of the Erdtree",
    is_verified: true,
    avatar_url: "/elden_ring_logo.png",
    created_at: "2022",
    owner_uuid: "usr_master_7842",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_006",
    name: "Expedition 33",
    category_tag: "GOTY 2025",
    description: "La comunidad del Galardonado Juego del Año 2025.",
    banner_url: "/descargar.jpg",
    members_count: "250.5k",
    online_count: "42.1k",
    featured_text: "Discusión del parche 14.5",
    is_verified: true,
    avatar_url: "/4b5f99944dc65b9029122b4639e430b5.jpg",
    created_at: "2018",
    owner_uuid: "usr_rel_8834",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_007",
    name: "Minecraft Builders",
    category_tag: "Sandbox",
    description:
      "Comparte tus construcciones, mecanismos de redstone e IPs de servidores.",
    banner_url:
      "https://images.unsplash.com/photo-1697479670670-d2a299df749c?q=80&w=800",
    members_count: "1.2M",
    online_count: "120k",
    featured_text: "¡Nueva temporada de Hermitcraft!",
    is_verified: false,
    avatar_url: "/minecraft-launcher.svg",
    created_at: "2015",
    owner_uuid: "usr_rel_1190",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_008",
    name: "Cyberpunk 2077",
    category_tag: "Action",
    description:
      "Ciudadanos de Night City. Consejos, builds y capturas del modo foto.",
    banner_url:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=800",
    members_count: "45.8k",
    online_count: "2.1k",
    featured_text: "Mejores finales de Phantom Liberty",
    is_verified: true,
    avatar_url: "/ddf4bea6021462282d95375c7281bfd5.jpg",
    created_at: "2020",
    owner_uuid: "usr_rel_6673",
    categories: categories,
  }),
];

