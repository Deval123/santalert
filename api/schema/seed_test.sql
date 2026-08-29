-- Sant'alert — jeu de données de test (premier test santalert.habitechsolutions.cm)
-- À importer APRÈS deploy_santalert.sql (schéma), dans la base habitftf_santalert.
-- Mots de passe = identifiant : le backend accepte l'égalité en clair (lib/auth.php).
--   phpMyAdmin > base > Importer ce fichier
--   ou : mysql -u <user> -p habitftf_santalert < seed_test.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------- Référentiels ----------
INSERT INTO `pays` (`id`,`pays`,`capitale`) VALUES
 (1,'Cameroun','Yaoundé'),(2,'Gabon','Libreville'),(3,'Tchad','N''Djaména'),
 (4,'Sénégal','Dakar'),(5,'Côte d''Ivoire','Yamoussoukro');
INSERT INTO `regions` (`id`,`name`) VALUES (1,'Littoral');
INSERT INTO `departement` (`id`,`name`,`regions_id`) VALUES (1,'Wouri',1);
INSERT INTO `city` (`id`,`name`,`departement_id`) VALUES (1,'Douala',1),(2,'Bonabéri',1);

-- ---------- Établissement / personnel / admin ----------
INSERT INTO `etablissement` (`id`,`statut`,`nom`,`code`,`telephone`,`email`,`type`,`adresse`,`ville`) VALUES
 (1,'actif','Hôpital de District Deido','hpdeido','233000000','contact@hpdeido.cm','hopital','Rue 1','Douala');
INSERT INTO `departement_geo` (`id`,`nom`,`etablissement_id`,`description`,`code`) VALUES
 (1,'Cardiologie',1,'Consultations et explorations cardiovasculaires.','hpdeido'),
 (2,'Pédiatrie',1,'Suivi et soins des enfants.','hpdeido'),
 (3,'Laboratoire',1,'Analyses biologiques et examens.','hpdeido');
INSERT INTO `personel_ets` (`id`,`nom`,`password`,`matricule`,`telephone`,`email`,`type_personnel`,`etablissement_id`) VALUES
 (1,'medecin1','medecin1','MAT-001','233000001','medecin1@hpdeido.cm','medecin',1),
 (2,'pharma1','pharma1','MAT-002','233000002','pharma1@hpdeido.cm','Pharmacien',1),
 (3,'labo1','labo1','MAT-003','233000003','labo1@hpdeido.cm','laborentin',1);
INSERT INTO `admin` (`id`,`nom`,`login`,`password`,`description`,`email`,`telephone`,`gender`) VALUES
 (1,'Administrateur','admin','admin','Compte admin de test','admin@habitechsolutions.cm','233000009','masculin');

-- ---------- Pharmacies de garde ----------
INSERT INTO `pharmacie` (`id`,`nom`,`localisation`,`tel`,`telephone`,`quartier`,`city_id`,`deGarde`,`heure_ouverture`,`heure_fermeture`) VALUES
 (1,'Pharmacie du Fleuve','Bonanjo','233111111','233111111','Bonanjo',1,1,'08:00','20:00'),
 (2,'Pharmacie Akwa Nord','Akwa','233222222','233222222','Akwa',1,1,'00:00','23:59');

-- ---------- Patients : (1) toi, (2) Georges Eyidi ----------
INSERT INTO `patients`
 (`id`,`nom`,`password`,`prenom`,`sexe`,`telephone`,`mobile1`,`email`,`email1`,`country`,
  `anneeNais`,`lieuNais`,`profession`,`residencePrincipal`,`groupeSanguin`,`rhesus`,`allergie`,`medecinFamille`,`assurance`) VALUES
 (1,'deval','deval','Devalère','masculin','676467228','694965269','devalerek@gmail.com','devalerek@yahoo.com','Cameroun',
  '1990','Bafang','Développeur','Douala, Deido','O','+','Aucune connue','Dr Nana','—'),
 (2,'georges','georges','Georges Eyidi','masculin','677000000','699000000','georges.eyidi@habitechsolutions.cm',NULL,'Cameroun',
  '1980','Douala','Gérant (Habitech Solutions & Services)','Douala, Bonapriso','A','+','Pénicilline','Dr Kamga','CNPS');

-- ---------- Dossier — patient 1 (deval) ----------
INSERT INTO `bilan` (`intitule`,`temperature`,`taille`,`tension`,`dateCreate`,`patients_id`,`poidsActuel`,`poidsNormal`,`imc`) VALUES
 ('Bilan initial','37','88','12/8','2026-08-20T09:30',1,'73','70','24.1'),
 ('Contrôle mensuel','36.8','86','12/7','2026-08-27T10:00',1,'72','70','23.7');
INSERT INTO `regime`
 (`id`,`type_regime`,`datedebut`,`poidsDepart`,`imc`,`taille`,`patients_id`,`natureRegime`,`restrictions`,`alimentationRecommande`,`typeTraitement`,`dateFin`) VALUES
 (1,'hypocalorique','2026-08-20','73','24.1','176',1,'équilibré','Sel < 5 g/j ; sucres rapides limités',
  'Fruits, légumes, poisson, céréales complètes','diététique','2026-11-20');
INSERT INTO `param_regime` (`regime_id`,`dateParam`,`poids`,`temperature`,`tension`,`observation`) VALUES
 (1,'2026-08-20T09:00','73','37','12/8','Point de départ'),
 (1,'2026-08-27T09:00','72','36.8','12/7','Bonne évolution, -1 kg');
INSERT INTO `auto_med` (`datecreate`,`symtome`,`traitement`,`evaluation`,`observation`,`cout_traitement`,`patients_id`) VALUES
 ('2026-08-22T18:00','Céphalées légères','Paracétamol 1 g','Amélioration en 1 h','RAS','500',1);
INSERT INTO `patientsagenda` (`patients_id`,`datedebut`,`datefin`,`nature`,`lieu`,`observation`,`tiers`,`cout`) VALUES
 (1,'2026-09-05T08:00','2026-09-05T09:00','consultation','Hôpital de District Deido','Contrôle tension','Dr Nana','5000'),
 (1,'2026-09-12T10:00',NULL,'vaccin','Centre de santé Bonabéri','Rappel','Infirmier','2000');
INSERT INTO `maladie_chronique` (`patients_id`,`nom`,`medecin_traitant`,`restriction`,`recommandation`,`commentaire`) VALUES
 (1,'Hypertension','Dr Nana','Sel limité','Marche 30 min/j, contrôle mensuel','Suivi trimestriel');
INSERT INTO `vaccin` (`patients_id`,`nom`,`date_realisation`,`nom_hopital`) VALUES
 (1,'Fièvre jaune','2019-05-10','Hôpital de District Deido');
INSERT INTO `visite` (`patients_id`,`nom`,`date_realisation`,`nom_hopital`) VALUES
 (1,'Visite d''aptitude','2026-01-15','Hôpital de District Deido');

-- ---------- Dossier — patient 2 (Georges Eyidi) ----------
INSERT INTO `bilan` (`intitule`,`temperature`,`taille`,`tension`,`dateCreate`,`patients_id`,`poidsActuel`,`poidsNormal`,`imc`) VALUES
 ('Bilan initial','37','95','13/8','2026-08-21T11:00',2,'82','78','25.3');
INSERT INTO `maladie_chronique` (`patients_id`,`nom`,`medecin_traitant`,`restriction`,`recommandation`,`commentaire`) VALUES
 (2,'Diabète type 2','Dr Kamga','Sucres rapides','Activité physique régulière, HbA1c / 3 mois','Sous metformine');

-- ---------- Recommandations (globales, lecture seule) ----------
INSERT INTO `recommandation` (`categorie`,`titre`,`contenu`) VALUES
 ('Nutrition','Sel','Limiter le sel à moins de 5 g par jour et privilégier fruits et légumes.'),
 ('Activité physique','Marche','Au moins 30 minutes de marche rapide, 5 jours par semaine.'),
 ('Suivi médical','Tension','Contrôler sa tension au moins une fois par mois.'),
 ('Hydratation','Eau','Boire 1,5 à 2 litres d''eau par jour, davantage en cas de forte chaleur.');

SET FOREIGN_KEY_CHECKS = 1;
