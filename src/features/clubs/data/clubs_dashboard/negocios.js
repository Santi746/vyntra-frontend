import { ClubData } from "@/features/clubs/types/club_data";
import { categories } from "@/features/clubs/data/categories";

/**
 * NEGOCIOS_CLUBS contiene una lista de clubes ficticios categorizados bajo negocios.
 * Cada club es una instancia de la clase ClubData.
 * 
 * @constant
 * @type {Array<import("@/features/clubs/types/club_data").ClubData>}
 */
export const NEGOCIOS_CLUBS = [
    new ClubData({
        uuid: "club_034",
        name: "SaaS Founders",
        category_tag: "Business",
        description: "Métricas, hacks de crecimiento y escalado de tu producto SaaS.",
        banner_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        members_count: "5.4k",
        online_count: "120",
        featured_text: "Cómo alcanzamos los 10k de MRR",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2022",
        owner_uuid: "usr_rel_1190",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_035",
        name: "Crypto Whale",
        category_tag: "Trading",
        description: "Estrategias de trading, alertas y señales para cripto.",
        banner_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800",
        members_count: "32.1k",
        online_count: "1.5k",
        featured_text: "Predicción del Halving de Bitcoin",
        is_verified: false,
        avatar_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2021",
        owner_uuid: "usr_master_7842",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_036",
        name: "Stock Market",
        category_tag: "Invest",
        description: "Analizando Wall Street y los movimientos del mercado global.",
        banner_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800",
        members_count: "15.4k",
        online_count: "850",
        featured_text: "Mejores acciones de dividendos",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2019",
        owner_uuid: "usr_rel_6673",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_037",
        name: "E-Commerce",
        category_tag: "Sales",
        description: "Dropshipping, Shopify y estrategias de marketing.",
        banner_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800",
        members_count: "24.5k",
        online_count: "1.1k",
        featured_text: "Anuncios que convierten bien",
        is_verified: false,
        avatar_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2020",
        owner_uuid: "usr_rel_2201",
        categories: categories,
    }),
    new ClubData({
        uuid: "club_038",
        name: "Solopreneurs",
        category_tag: "Growth",
        description: "Construye un negocio unipersonal. Comunidad y recursos.",
        banner_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
        members_count: "12.3k",
        online_count: "420",
        featured_text: "Automatizando tu flujo de trabajo",
        is_verified: true,
        avatar_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200&q=80",
        created_at: "2023",
        owner_uuid: "usr_rel_4521",
        categories: categories,
    })
];

