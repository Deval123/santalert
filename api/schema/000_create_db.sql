-- À exécuter UNE FOIS avec le compte root MySQL :
--   mysql -u root -p < api/schema/000_create_db.sql
-- Crée la base + un utilisateur dédié (identifiants repris dans api/.env).

CREATE DATABASE IF NOT EXISTS `santalert`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'santalert'@'localhost' IDENTIFIED BY 'santalert';
CREATE USER IF NOT EXISTS 'santalert'@'127.0.0.1' IDENTIFIED BY 'santalert';

GRANT ALL PRIVILEGES ON `santalert`.* TO 'santalert'@'localhost';
GRANT ALL PRIVILEGES ON `santalert`.* TO 'santalert'@'127.0.0.1';
FLUSH PRIVILEGES;
