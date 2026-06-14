import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * ARTE_CLUBS contiene una lista de clubes ficticios categorizados bajo arte.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const ARTE_CLUBS = [
  new ClubData({
    uuid: "club_014",
    name: "UI/UX Designers",
    category_tag: "Design",
    description:
      "Consejos de Figma, revisiones de portafolios y retos diarios de UI.",
    banner_url:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    members_count: "34.2k",
    online_count: "1.2k",
    featured_text: "Crítica de diseño semanal",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2017",
    owner_uuid: "usr_rel_6673",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_015",
    name: "Digital Painters",
    category_tag: "Art",
    description: "Consejos de Photoshop, Procreate y escultura en Blender.",
    banner_url:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800",
    members_count: "19.5k",
    online_count: "950",
    featured_text: "Sorteo de pinceles hoy",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200",
    created_at: "2019",
    owner_uuid: "usr_rel_3347",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_016",
    name: "3D Architects",
    category_tag: "3D",
    description: "Modelando el futuro con Unreal y Blender.",
    banner_url:
      "https://images.unsplash.com/photo-1574848296471-28f79a036f79?q=80&w=800",
    members_count: "12.4k",
    online_count: "420",
    featured_text: "Lanzamiento de Unreal Engine 5.4",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=200",
    created_at: "2022",
    owner_uuid: "usr_rel_4521",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_017",
    name: "Motion Graphics",
    category_tag: "Videos",
    description: "Tutoriales de animación en After Effects y Cinema 4D.",
    banner_url:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    members_count: "8.2k",
    online_count: "180",
    featured_text: "Serie de tutoriales de VFX",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=200",
    created_at: "2020",
    owner_uuid: "usr_rel_8834",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_018",
    name: "Photography Pro",
    category_tag: "Photo",
    description: "Desde tomas con el móvil hasta obras maestras full-frame.",
    banner_url:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800",
    members_count: "52.3k",
    online_count: "2.5k",
    featured_text: "Reto fotográfico de la hora dorada",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200",
    created_at: "2018",
    owner_uuid: "usr_rel_9910",
    categories: categories,
  }),
];

