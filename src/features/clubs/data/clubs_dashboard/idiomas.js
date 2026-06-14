import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * IDIOMAS_CLUBS contiene una lista de clubes ficticios categorizados bajo idiomas.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const IDIOMAS_CLUBS = [
  new ClubData({
    uuid: "club_039",
    name: "Polyglots",
    category_tag: "Culture",
    description:
      "Intercambio de idiomas, ayuda gramatical y conocimientos culturales.",
    banner_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    members_count: "14.3k",
    online_count: "890",
    featured_text: "Grupo de estudio de japonés N5",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=200",
    created_at: "2020",
    owner_uuid: "usr_rel_3347",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_040",
    name: "Learn English",
    category_tag: "Study",
    description: "Domina la gramática, modismos y pronunciación del inglés.",
    banner_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    members_count: "54.2k",
    online_count: "3.2k",
    featured_text: "Verbos frasales comunes",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1543165796-5426273eaab3?q=80&w=200",
    created_at: "2017",
    owner_uuid: "usr_rel_6673",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_041",
    name: "French Bistro",
    category_tag: "Travel",
    description: "¿Parlez-vous français? Aprende el lenguaje del amor.",
    banner_url:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
    members_count: "12.8k",
    online_count: "420",
    featured_text: "Planeando un viaje a París",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=200",
    created_at: "2021",
    owner_uuid: "usr_rel_2201",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_042",
    name: "Chinese Hub",
    category_tag: "Asia",
    description: "Domina el mandarín y aprende sobre la historia china.",
    banner_url:
      "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?q=80&w=800",
    members_count: "23.4k",
    online_count: "1.2k",
    featured_text: "Consejos de preparación para HSK 4",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2022",
    owner_uuid: "usr_rel_8834",
  }),
  new ClubData({
    uuid: "club_043",
    name: "Spanish Fiesta",
    category_tag: "Latam",
    description: "Aprende español. Frases prácticas para la vida diaria.",
    banner_url:
      "https://images.unsplash.com/photo-1664629406928-66e61673c947?q=80&w=800",
    members_count: "34.5k",
    online_count: "2.1k",
    featured_text: "Jerga para viajeros",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?q=80&w=200",
    created_at: "2018",
    owner_uuid: "usr_rel_4521",
  }),
];

