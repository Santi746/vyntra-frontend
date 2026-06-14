import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * FEATURED_CLUBS contiene una lista de clubes ficticios categorizados bajo featured.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const FEATURED_CLUBS = [
    new ClubData({
        uuid: "club_001",
        name: "Vyne Creators",
        category_tag: "is_verified",
        description: "Comunidad oficial para creadores de Vyne. Comparte consejos y obtén acceso anticipado a funciones.",
        banner_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800",
        members_count: "45.2k",
        online_count: "3.4k",
        featured_text: "Nuevas herramientas de monetización anunciadas",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=200",
        created_at: "2024",
        owner_uuid: "usr_master_7842",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_002",
        name: "Indie Hackers",
        category_tag: "Startup",
        description: "Impulsa tu startup. Comparte hitos, ingresos y obtén feedback.",
        banner_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
        members_count: "8.7k",
        online_count: "840",
        featured_text: "Sesión de crítica de landing pages",
        is_verified: false,
        avatar_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200",
        created_at: "2023",
        owner_uuid: "usr_rel_4521",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_003",
        name: "Digital Nomads",
        category_tag: "Travel",
        description: "Conecta con trabajadores remotos que viajan por el mundo. Guías de configuración, visados y quedadas.",
        banner_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        members_count: "32.1k",
        online_count: "1.8k",
        featured_text: "¡Quedada en Bali este fin de semana!",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=200",
        created_at: "2022",
        owner_uuid: "u-ana-1190",
        categories: categories,
    })
];

