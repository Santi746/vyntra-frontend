import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * MUSICA_CLUBS contiene una lista de clubes ficticios categorizados bajo musica.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const MUSICA_CLUBS = [
  new ClubData({
    uuid: "club_019",
    name: "Beatmakers",
    category_tag: "Audio",
    description: "FL Studio, Ableton y feedback sobre producción musical.",
    banner_url:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800",
    members_count: "42.1k",
    online_count: "2.4k",
    featured_text: "Sorteo de paquetes de samples",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200",
    created_at: "2017",
    owner_uuid: "usr_rel_2201",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_020",
    name: "Rock & Metal",
    category_tag: "Rock",
    description:
      "Discusión sobre clásicos y los últimos lanzamientos del género.",
    banner_url:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800",
    members_count: "28.4k",
    online_count: "1.2k",
    featured_text: "Rumores sobre la gira de Metallica",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2015",
    owner_uuid: "usr_rel_3347",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_021",
    name: "Jazz Collective",
    category_tag: "Classic",
    description: "Soul profundo, jazz clásico y discos de Blue Note.",
    banner_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800",
    members_count: "15.3k",
    online_count: "420",
    featured_text: "Nueva caja recopilatoria de Miles Davis",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2016",
    owner_uuid: "usr_master_7842",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_022",
    name: "Synth-wave",
    category_tag: "Electro",
    description: "Techno, synth-wave y vibras futuristas.",
    banner_url:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800",
    members_count: "22.1k",
    online_count: "950",
    featured_text: "Actualización de la lista Retrowave",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200",
    created_at: "2021",
    owner_uuid: "usr_rel_6673",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_023",
    name: "Vocalists Hub",
    category_tag: "Singing",
    description:
      "Consejos para cantantes, ejercicios vocales y tecnología de grabación.",
    banner_url:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800",
    members_count: "18.2k",
    online_count: "340",
    featured_text: "Cómo alcanzar las notas altas",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=200",
    created_at: "2022",
    owner_uuid: "usr_rel_9910",
    categories: categories,
  }),
];

