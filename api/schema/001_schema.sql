-- Sant'alert — schéma reconstruit (MySQL 8, utf8mb4).
-- Les noms de colonnes reprennent 1:1 les champs envoyés par le front.
-- Les tables des lots ultérieurs sont créées minimales ; leurs colonnes seront
-- ajoutées (ALTER TABLE) au moment de porter les endpoints correspondants.

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- ===================== AUTH / IDENTITÉS =====================

DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NULL,
  `sexe` VARCHAR(20) NULL,
  `telephone` VARCHAR(50) NULL,
  `mobile1` VARCHAR(50) NULL,
  `email` VARCHAR(190) NULL,
  `email1` VARCHAR(190) NULL,
  `country` VARCHAR(120) NULL,
  `filename` VARCHAR(255) NULL,
  `anneeNais` VARCHAR(50) NULL,
  `lieuNais` VARCHAR(190) NULL,
  `profession` VARCHAR(190) NULL,
  `lieuService` VARCHAR(190) NULL,
  `telBureau` VARCHAR(50) NULL,
  `residencePrincipal` VARCHAR(190) NULL,
  `residenceSecondaire` VARCHAR(190) NULL,
  `nomPere` VARCHAR(190) NULL, `telPere` VARCHAR(50) NULL, `emailPere` VARCHAR(190) NULL,
  `professionPere` VARCHAR(190) NULL, `quartierPere` VARCHAR(190) NULL, `ruePere` VARCHAR(190) NULL,
  `nomMere` VARCHAR(190) NULL, `telMere` VARCHAR(50) NULL, `emailMere` VARCHAR(190) NULL,
  `professionMere` VARCHAR(190) NULL, `quartierMere` VARCHAR(190) NULL, `rueMere` VARCHAR(190) NULL,
  `nomTuteur` VARCHAR(190) NULL, `telTuteur` VARCHAR(50) NULL, `emailTuteur` VARCHAR(190) NULL,
  `professionTuteur` VARCHAR(190) NULL, `quartierTuteur` VARCHAR(190) NULL, `rueTuteur` VARCHAR(190) NULL,
  `proche1` VARCHAR(190) NULL, `tel_proche1` VARCHAR(50) NULL, `emailProche1` VARCHAR(190) NULL,
  `residenceProche1` VARCHAR(190) NULL, `professionProche1` VARCHAR(190) NULL,
  `proche2` VARCHAR(190) NULL, `tel_proche2` VARCHAR(50) NULL, `emailProche2` VARCHAR(190) NULL,
  `residenceProche2` VARCHAR(190) NULL, `professionProche2` VARCHAR(190) NULL,
  `proche3` VARCHAR(190) NULL, `tel_proche3` VARCHAR(50) NULL, `emailProche3` VARCHAR(190) NULL,
  `residenceProche3` VARCHAR(190) NULL, `professionProche3` VARCHAR(190) NULL,
  `groupeSanguin` VARCHAR(10) NULL,
  `rhesus` VARCHAR(10) NULL,
  `allergie` TEXT NULL,
  `incapacite` TEXT NULL,
  `medecinFamille` VARCHAR(190) NULL,
  `assurance` VARCHAR(190) NULL,
  `observationPhisyque` TEXT NULL,
  `signeParticulier` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(50) NULL,
  `email` VARCHAR(190) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `etablissement`;
CREATE TABLE `etablissement` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `statut` VARCHAR(120) NULL,
  `nom` VARCHAR(255) NOT NULL,
  `code` VARCHAR(120) NOT NULL,
  `telephone` VARCHAR(50) NULL,
  `email` VARCHAR(190) NULL,
  `type` VARCHAR(120) NULL,
  `adresse` VARCHAR(255) NULL,
  `ville` VARCHAR(190) NULL,
  UNIQUE KEY `uq_etablissement_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `personel_ets`;
CREATE TABLE `personel_ets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `matricule` VARCHAR(120) NULL,
  `telephone` VARCHAR(50) NULL,
  `email` VARCHAR(190) NULL,
  `type_personnel` VARCHAR(120) NULL,
  `etablissement_id` INT NULL,
  KEY `k_personel_ets` (`etablissement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(190) NULL,
  `login` VARCHAR(190) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL,
  `email` VARCHAR(190) NULL,
  `telephone` VARCHAR(50) NULL,
  `gender` VARCHAR(20) NULL,
  UNIQUE KEY `uq_admin_login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== RÉFÉRENTIELS =====================

DROP TABLE IF EXISTS `pays`;
CREATE TABLE `pays` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `pays` VARCHAR(190) NOT NULL,
  `capitale` VARCHAR(190) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(190) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `departement`;
CREATE TABLE `departement` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(190) NOT NULL,
  `regions_id` INT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(190) NOT NULL,
  `departement_id` INT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `pharmacie`;
CREATE TABLE `pharmacie` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(190) NOT NULL,
  `localisation` VARCHAR(190) NULL,
  `tel` VARCHAR(50) NULL,
  `telephone` VARCHAR(50) NULL,
  `quartier` VARCHAR(190) NULL,
  `heure_ouverture` VARCHAR(20) NULL,
  `heure_fermeture` VARCHAR(20) NULL,
  `city_id` INT NULL,
  `deGarde` TINYINT(1) DEFAULT 0,
  `filename` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== DOSSIER MÉDICAL (colonnes connues) =====================

DROP TABLE IF EXISTS `bilan`;
CREATE TABLE `bilan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `intitule` VARCHAR(255) NULL,
  `temperature` VARCHAR(50) NULL,
  `taille` VARCHAR(50) NULL,
  `tension` VARCHAR(50) NULL,
  `dateCreate` VARCHAR(50) NULL,
  `patients_id` INT NULL,
  `poidsActuel` VARCHAR(50) NULL,
  `poidsNormal` VARCHAR(50) NULL,
  `imc` VARCHAR(50) NULL,
  `tgc` VARCHAR(50) NULL,
  `masseMinEraleOsseuse` VARCHAR(50) NULL,
  `pourcentageEau` VARCHAR(50) NULL,
  `masseMusculaire` VARCHAR(50) NULL,
  `evaluationSihouette` VARCHAR(190) NULL,
  `tgViscerale` VARCHAR(50) NULL,
  KEY `k_bilan_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `regime`;
CREATE TABLE `regime` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type_regime` VARCHAR(190) NULL,
  `datedebut` VARCHAR(50) NULL,
  `poidsDepart` VARCHAR(50) NULL,
  `imc` VARCHAR(50) NULL,
  `restrictions` TEXT NULL,
  `taille` VARCHAR(50) NULL,
  `patients_id` INT NULL,
  `natureRegime` VARCHAR(190) NULL,
  `alimentationRecommande` TEXT NULL,
  `typeTraitement` VARCHAR(190) NULL,
  `dateFin` VARCHAR(50) NULL,
  KEY `k_regime_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `auto_med`;
CREATE TABLE `auto_med` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `datecreate` VARCHAR(50) NULL,
  `symtome` TEXT NULL,
  `traitement` TEXT NULL,
  `evaluation` TEXT NULL,
  `observation` TEXT NULL,
  `cout_traitement` VARCHAR(50) NULL,
  `patients_id` INT NULL,
  KEY `k_auto_med_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `patientsagenda`;
CREATE TABLE `patientsagenda` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `patients_id` INT NULL,
  `datedebut` VARCHAR(50) NULL,
  `datefin` VARCHAR(50) NULL,
  `datefin1` VARCHAR(50) NULL,
  `datefin2` VARCHAR(50) NULL,
  `datefin3` VARCHAR(50) NULL,
  `nature` VARCHAR(190) NULL,
  `lieu` VARCHAR(190) NULL,
  `observation` TEXT NULL,
  `tiers` VARCHAR(190) NULL,
  `cout` VARCHAR(50) NULL,
  KEY `k_patientsagenda_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `param_regime`;
CREATE TABLE `param_regime` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `regime_id` INT NULL,
  `patients_id` INT NULL,
  `libelle` VARCHAR(190) NULL,
  `valeur` VARCHAR(190) NULL,
  `datecreate` VARCHAR(50) NULL,
  KEY `k_param_regime` (`regime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== LOTS ULTÉRIEURS (créées minimales) =====================
-- Colonnes ajoutées via ALTER TABLE au moment du portage de chaque endpoint.

CREATE TABLE IF NOT EXISTS `maladie_chronique` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL,
  `nom` VARCHAR(190) NULL, `medecin_traitant` VARCHAR(190) NULL,
  `restriction` TEXT NULL, `recommandation` TEXT NULL, `commentaire` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY `k_maladie_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `rdv` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `consultation` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `personel_ets_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `hospitalisation` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `personel_ets_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `examen` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `personel_ets_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `visite` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `vaccin` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `grossesse` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `recommandation` (`id` INT AUTO_INCREMENT PRIMARY KEY, `categorie` VARCHAR(190) NULL, `titre` VARCHAR(255) NULL, `contenu` TEXT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `infos_urgence` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `parametres` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `particularites` (`id` INT AUTO_INCREMENT PRIMARY KEY, `patients_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `agenda_personel_ets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `personel_ets_id` INT NULL, `etablissement_id` INT NULL, `patients_id` INT NULL,
  `datedebut` VARCHAR(50) NULL, `datefin` VARCHAR(50) NULL,
  `nature` VARCHAR(190) NULL, `lieu` VARCHAR(190) NULL,
  `observation` TEXT NULL, `tiers` VARCHAR(190) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY `k_agenda_ets` (`etablissement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `departement_geo` (`id` INT AUTO_INCREMENT PRIMARY KEY, `nom` VARCHAR(190) NULL, `etablissement_id` INT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `traitement` (`id` INT AUTO_INCREMENT PRIMARY KEY, `consultation_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `ordonnance` (`id` INT AUTO_INCREMENT PRIMARY KEY, `consultation_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS `auscultation` (`id` INT AUTO_INCREMENT PRIMARY KEY, `consultation_id` INT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET foreign_key_checks = 1;
