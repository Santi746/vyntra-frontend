import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * ENTRETENIMIENTO_CLUBS contiene una lista de clubes ficticios categorizados bajo entretenimiento.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const ENTRETENIMIENTO_CLUBS = [
  new ClubData({
    uuid: "club_029",
    name: "Cinephiles",
    category_tag: "Movie",
    description:
      "Películas indie, superproducciones y análisis profundos de directores.",
    banner_url:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800",
    members_count: "21.6k",
    online_count: "1.1k",
    featured_text: "Predicciones de los Oscars",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2018",
    owner_uuid: "usr_rel_8834",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_030",
    name: "Anime Nation",
    category_tag: "Anime",
    description:
      "Desde Shonen hasta Seinen. Discusiones semanales de episodios.",
    banner_url:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=800",
    members_count: "340k",
    online_count: "52k",
    featured_text: "Filtración de la película de Demon Slayer",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2020",
    owner_uuid: "usr_rel_1190",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_031",
    name: "Series Addicted",
    category_tag: "TV",
    description: "Centro de series de HBO, Netflix y Amazon Prime.",
    banner_url:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800",
    members_count: "85.2k",
    online_count: "3.2k",
    featured_text: "Mejores series de 2024",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2023",
    owner_uuid: "usr_master_7842",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_032",
    name: "Book Club",
    category_tag: "Books",
    description: "Lectura de clásicos y novelas fantásticas contemporáneas.",
    banner_url:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800",
    members_count: "12.4k",
    online_count: "850",
    featured_text: "Recomendados de este mes",
    is_verified: true,
    avatar_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&h=200&q=80",
    created_at: "2021",
    owner_uuid: "usr_rel_4521",
    categories: categories,
  }),
  new ClubData({
    uuid: "club_033",
    name: "Standup Comedy",
    category_tag: "Comedy",
    description: "Entusiastas del roast, stand-up y sketches cómicos.",
    banner_url:
      "https://images.unsplash.com/photo-1611956425642-d5a8169abd63?q=80&w=800",
    members_count: "18.1k",
    online_count: "420",
    featured_text: "Reseña del especial de Louis CK",
    is_verified: false,
    avatar_url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=200",
    created_at: "2019",
    owner_uuid: "usr_rel_9910",
    categories: categories,
  }),
];

