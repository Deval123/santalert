-- Sant'alert — lot "domaines restants" (param-regime détaillé, départements, établissements).
-- À appliquer UNE FOIS après 001_schema.sql :
--   mysql -u santalert -psantalert santalert < schema/002_remaining_domains.sql
-- (MySQL 8 ne supporte pas `ADD COLUMN IF NOT EXISTS` : à ne rejouer qu'après un
--  rechargement complet du schéma.)

SET NAMES utf8mb4;

-- ---- param_regime : relevés de suivi d'un régime (poids / température / tension) ----
-- Le front (`add-param-regime`) envoie : regime_id, dateParam, poids, temperature, tension, observation.
ALTER TABLE `param_regime`
  ADD COLUMN `dateParam`   VARCHAR(50)  NULL,
  ADD COLUMN `poids`       VARCHAR(50)  NULL,
  ADD COLUMN `temperature` VARCHAR(50)  NULL,
  ADD COLUMN `tension`     VARCHAR(50)  NULL,
  ADD COLUMN `observation` TEXT         NULL;

-- ---- departement_geo : services / départements rattachés à un établissement ----
-- Le front (`ajout-departement`) envoie : nom, description, code (code établissement).
ALTER TABLE `departement_geo`
  ADD COLUMN `description` VARCHAR(255) NULL,
  ADD COLUMN `code`        VARCHAR(120) NULL;

-- ---- etablissement : table déjà complète (001_schema.sql) ----
