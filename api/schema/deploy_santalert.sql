-- Sant'alert — schéma courant + jeu de test (déploiement santalert.habitechsolutions.cm)
-- Généré depuis la base de dev. Cible : MariaDB 10.6 (collation ramenée à utf8mb4_unicode_ci).
-- Import : phpMyAdmin > base habitftf_santalert > Importer, ou :
--   mysql -u <user> -p habitftf_santalert < deploy_santalert.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(190) DEFAULT NULL,
  `login` varchar(190) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `agenda_personel_ets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_personel_ets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personel_ets_id` int DEFAULT NULL,
  `etablissement_id` int DEFAULT NULL,
  `patients_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `datedebut` varchar(50) DEFAULT NULL,
  `datefin` varchar(50) DEFAULT NULL,
  `nature` varchar(190) DEFAULT NULL,
  `lieu` varchar(190) DEFAULT NULL,
  `observation` text,
  `tiers` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `auscultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auscultation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contenu` text,
  `datecreate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `auto_med`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auto_med` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datecreate` varchar(50) DEFAULT NULL,
  `symtome` text,
  `traitement` text,
  `evaluation` text,
  `observation` text,
  `cout_traitement` varchar(50) DEFAULT NULL,
  `patients_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_auto_med_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `bilan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) DEFAULT NULL,
  `temperature` varchar(50) DEFAULT NULL,
  `taille` varchar(50) DEFAULT NULL,
  `tension` varchar(50) DEFAULT NULL,
  `dateCreate` varchar(50) DEFAULT NULL,
  `patients_id` int DEFAULT NULL,
  `poidsActuel` varchar(50) DEFAULT NULL,
  `poidsNormal` varchar(50) DEFAULT NULL,
  `imc` varchar(50) DEFAULT NULL,
  `tgc` varchar(50) DEFAULT NULL,
  `masseMinEraleOsseuse` varchar(50) DEFAULT NULL,
  `pourcentageEau` varchar(50) DEFAULT NULL,
  `masseMusculaire` varchar(50) DEFAULT NULL,
  `evaluationSihouette` varchar(190) DEFAULT NULL,
  `tgViscerale` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_bilan_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(190) NOT NULL,
  `departement_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `personel_ets_id` int DEFAULT NULL,
  `nom_medecin` varchar(190) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `datecreate` varchar(50) DEFAULT NULL,
  `hopital_id` int DEFAULT NULL,
  `observation` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(190) NOT NULL,
  `regions_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `departement_geo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departement_geo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(190) DEFAULT NULL,
  `etablissement_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `etablissement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etablissement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `statut` varchar(120) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `code` varchar(120) NOT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `type` varchar(120) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_etablissement_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `personel_ets_id` int DEFAULT NULL,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contenu` text,
  `datecreate` varchar(50) DEFAULT NULL,
  `resultat` text,
  `image` longtext,
  `date_resultat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `grossesse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grossesse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `hospitalisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitalisation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `personel_ets_id` int DEFAULT NULL,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hopital_id` int DEFAULT NULL,
  `date_entree` varchar(50) DEFAULT NULL,
  `date_sortie` varchar(50) DEFAULT NULL,
  `symptome` text,
  `causes` text,
  `medecinTraitant` varchar(190) DEFAULT NULL,
  `diagnostique` text,
  `recommandationsAlimentaire` text,
  `numeroChambre` varchar(50) DEFAULT NULL,
  `numeroLit` varchar(50) DEFAULT NULL,
  `numeroDossier` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `infos_urgence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infos_urgence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `maladie_chronique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maladie_chronique` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `nom` varchar(190) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `medecin_traitant` varchar(190) DEFAULT NULL,
  `restriction` text,
  `recommandation` text,
  `commentaire` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ordonnance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordonnance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contenu` text,
  `datecreate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `param_regime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `param_regime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regime_id` int DEFAULT NULL,
  `patients_id` int DEFAULT NULL,
  `libelle` varchar(190) DEFAULT NULL,
  `valeur` varchar(190) DEFAULT NULL,
  `datecreate` varchar(50) DEFAULT NULL,
  `dateParam` varchar(50) DEFAULT NULL,
  `poids` varchar(50) DEFAULT NULL,
  `temperature` varchar(50) DEFAULT NULL,
  `tension` varchar(50) DEFAULT NULL,
  `observation` text,
  PRIMARY KEY (`id`),
  KEY `k_param_regime` (`regime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `parametres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `datecreate` varchar(50) DEFAULT NULL,
  `ta` varchar(50) DEFAULT NULL,
  `db` varchar(50) DEFAULT NULL,
  `bg` varchar(50) DEFAULT NULL,
  `pouls` varchar(50) DEFAULT NULL,
  `taille` varchar(50) DEFAULT NULL,
  `ddr` varchar(50) DEFAULT NULL,
  `dpa` varchar(50) DEFAULT NULL,
  `poids` varchar(50) DEFAULT NULL,
  `tension` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `particularites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `particularites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `hospitalisation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `chirurgicale` text,
  `anesthesie` text,
  `soinsIntensifs` text,
  `urgences` text,
  `autres` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `sexe` varchar(20) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `mobile1` varchar(50) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `email1` varchar(190) DEFAULT NULL,
  `country` varchar(120) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `anneeNais` varchar(50) DEFAULT NULL,
  `lieuNais` varchar(190) DEFAULT NULL,
  `profession` varchar(190) DEFAULT NULL,
  `lieuService` varchar(190) DEFAULT NULL,
  `telBureau` varchar(50) DEFAULT NULL,
  `residencePrincipal` varchar(190) DEFAULT NULL,
  `residenceSecondaire` varchar(190) DEFAULT NULL,
  `nomPere` varchar(190) DEFAULT NULL,
  `telPere` varchar(50) DEFAULT NULL,
  `emailPere` varchar(190) DEFAULT NULL,
  `professionPere` varchar(190) DEFAULT NULL,
  `quartierPere` varchar(190) DEFAULT NULL,
  `ruePere` varchar(190) DEFAULT NULL,
  `nomMere` varchar(190) DEFAULT NULL,
  `telMere` varchar(50) DEFAULT NULL,
  `emailMere` varchar(190) DEFAULT NULL,
  `professionMere` varchar(190) DEFAULT NULL,
  `quartierMere` varchar(190) DEFAULT NULL,
  `rueMere` varchar(190) DEFAULT NULL,
  `nomTuteur` varchar(190) DEFAULT NULL,
  `telTuteur` varchar(50) DEFAULT NULL,
  `emailTuteur` varchar(190) DEFAULT NULL,
  `professionTuteur` varchar(190) DEFAULT NULL,
  `quartierTuteur` varchar(190) DEFAULT NULL,
  `rueTuteur` varchar(190) DEFAULT NULL,
  `proche1` varchar(190) DEFAULT NULL,
  `tel_proche1` varchar(50) DEFAULT NULL,
  `emailProche1` varchar(190) DEFAULT NULL,
  `residenceProche1` varchar(190) DEFAULT NULL,
  `professionProche1` varchar(190) DEFAULT NULL,
  `proche2` varchar(190) DEFAULT NULL,
  `tel_proche2` varchar(50) DEFAULT NULL,
  `emailProche2` varchar(190) DEFAULT NULL,
  `residenceProche2` varchar(190) DEFAULT NULL,
  `professionProche2` varchar(190) DEFAULT NULL,
  `proche3` varchar(190) DEFAULT NULL,
  `tel_proche3` varchar(50) DEFAULT NULL,
  `emailProche3` varchar(190) DEFAULT NULL,
  `residenceProche3` varchar(190) DEFAULT NULL,
  `professionProche3` varchar(190) DEFAULT NULL,
  `groupeSanguin` varchar(10) DEFAULT NULL,
  `rhesus` varchar(10) DEFAULT NULL,
  `allergie` text,
  `incapacite` text,
  `medecinFamille` varchar(190) DEFAULT NULL,
  `assurance` varchar(190) DEFAULT NULL,
  `observationPhisyque` text,
  `signeParticulier` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `patientsagenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patientsagenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `datedebut` varchar(50) DEFAULT NULL,
  `datefin` varchar(50) DEFAULT NULL,
  `datefin1` varchar(50) DEFAULT NULL,
  `datefin2` varchar(50) DEFAULT NULL,
  `datefin3` varchar(50) DEFAULT NULL,
  `nature` varchar(190) DEFAULT NULL,
  `lieu` varchar(190) DEFAULT NULL,
  `observation` text,
  `tiers` varchar(190) DEFAULT NULL,
  `cout` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_patientsagenda_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pays` varchar(190) NOT NULL,
  `capitale` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personel_ets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personel_ets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `matricule` varchar(120) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `type_personnel` varchar(120) DEFAULT NULL,
  `etablissement_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_personel_ets` (`etablissement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pharmacie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(190) NOT NULL,
  `localisation` varchar(190) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `quartier` varchar(190) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `deGarde` tinyint(1) DEFAULT '0',
  `filename` varchar(255) DEFAULT NULL,
  `heure_ouverture` varchar(20) DEFAULT NULL,
  `heure_fermeture` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `rdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rdv` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `consultation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `datedebut` varchar(50) DEFAULT NULL,
  `datefin` varchar(50) DEFAULT NULL,
  `nature` varchar(190) DEFAULT NULL,
  `lieu` varchar(190) DEFAULT NULL,
  `observation` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `recommandation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommandation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categorie` varchar(190) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `contenu` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `regime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_regime` varchar(190) DEFAULT NULL,
  `datedebut` varchar(50) DEFAULT NULL,
  `poidsDepart` varchar(50) DEFAULT NULL,
  `imc` varchar(50) DEFAULT NULL,
  `restrictions` text,
  `taille` varchar(50) DEFAULT NULL,
  `patients_id` int DEFAULT NULL,
  `natureRegime` varchar(190) DEFAULT NULL,
  `alimentationRecommande` text,
  `typeTraitement` varchar(190) DEFAULT NULL,
  `dateFin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_regime_patient` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(190) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `traitement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traitement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultation_id` int DEFAULT NULL,
  `hospitalisation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contenu` text,
  `datecreate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `vaccin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nom` varchar(190) DEFAULT NULL,
  `date_realisation` varchar(50) DEFAULT NULL,
  `nom_hopital` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `visite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nom` varchar(190) DEFAULT NULL,
  `date_realisation` varchar(50) DEFAULT NULL,
  `nom_hopital` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

