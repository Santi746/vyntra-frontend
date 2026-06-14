import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * TECNOLOGIA_CLUBS contiene una lista de clubes ficticios categorizados bajo tecnologia.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const TECNOLOGIA_CLUBS = [
    new ClubData({
        uuid: "club_009",
        name: "Next.js Masters",
        category_tag: "Engineering",
        description: "Arquitectura avanzada de React y Next.js, optimización de rendimiento.",
        banner_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
        members_count: "18.9k",
        online_count: "2.1k",
        featured_text: "Inmersión profunda en Server Actions",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2023",
        owner_uuid: "usr_master_7842",
        categories: categories
    }),
    new ClubData({
        uuid: "club_010",
        name: "AI Researchers",
        category_tag: "Tech",
        description: "Discusión sobre los últimos artículos en LLMs y modelos de difusión.",
        banner_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800",
        members_count: "24.5k",
        online_count: "4.2k",
        featured_text: "Rumores sobre la arquitectura de GPT-5",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2024",
        owner_uuid: "usr_rel_8834",
        categories: categories
    }),
    new ClubData({
        uuid: "club_011",
        name: "Pythonistas",
        category_tag: "Backend",
        description: "Django, FastAPI y ciencia de datos con Python.",
        banner_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
        members_count: "28.4k",
        online_count: "3.1k",
        featured_text: "Funciones de Python 3.13",
        is_verified: false,
        avatar_url: "https://images.unsplash.com/photo-1526374870839-e155464bb9b2?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2010",
        owner_uuid: "usr_rel_1190",
        categories: categories
    }),
    new ClubData({
        uuid: "club_012",
        name: "Cyber Security",
        category_tag: "Security",
        description: "Hacking ético, pentesting y protocolos de seguridad.",
        banner_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
        members_count: "15.2k",
        online_count: "1.2k",
        featured_text: "Nuevo exploit de día cero encontrado",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2019",
        owner_uuid: "usr_rel_2201",
        categories: categories
    }),
    new ClubData({
        uuid: "club_013",
        name: "Cloud Legends",
        category_tag: "Infra",
        description: "Escalado en plataformas AWS, Azure y Google Cloud.",
        banner_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
        members_count: "12.1k",
        online_count: "850",
        featured_text: "Configuración básica de Kubernetes",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2021",
        owner_uuid: "usr_rel_3347",
        categories: categories
    })
];

