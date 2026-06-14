/**
 * @file user_data.js
 * @description Clase que representa la estructura de un usuario en el sistema.
 * Alineada con la tabla 'users' de PostgreSQL.
 */

export class User {
  constructor({
    uuid,
    first_name,
    last_name,
    username,
    user_tag,
    avatar_url,
    banner_url,
    bio = "",
    location = "",
    created_at = new Date().toISOString(),
    is_online = false,
    mutual_friends_count = 0,
    club_uuids = [],
    category_tag = "",
  }) {
    this.uuid = uuid;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.user_tag = user_tag;
    this.avatar_url = avatar_url;
    this.banner_url = banner_url;
    this.bio = bio;
    this.location = location;
    this.created_at = created_at;
    this.is_online = is_online;
    this.mutual_friends_count = mutual_friends_count;
    this.club_uuids = club_uuids;

    // Propiedades calculadas para asegurar compatibilidad con JSON planos y spreads
    this.display_name = `${first_name} ${last_name}`;
    this.handle = `@${username}${category_tag}`;

    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const date = new Date(this.created_at);
    this.joined_date = `${months[date.getMonth()]} ${date.getFullYear()}`;
  }




}
