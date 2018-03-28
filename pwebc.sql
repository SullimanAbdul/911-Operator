-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 28 mars 2018 à 16:17
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pwebc`
--

-- --------------------------------------------------------

--
-- Structure de la table `eventennemi`
--

DROP TABLE IF EXISTS `eventennemi`;
CREATE TABLE IF NOT EXISTS `eventennemi` (
  `Nom` varchar(50) NOT NULL,
  `Latitude` varchar(50) NOT NULL,
  `Longitude` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `eventennemi`
--

INSERT INTO `eventennemi` (`Nom`, `Latitude`, `Longitude`) VALUES
('Incendie', '0', '0'),
('Meurtre', '0', '0'),
('Attentat', '0', '0'),
('Malaise', '0', '0'),
('Accident', '0', '0');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `nom` varchar(20) NOT NULL,
  `Latitude` varchar(50) DEFAULT NULL,
  `Longitude` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`nom`, `Latitude`, `Longitude`) VALUES
('POLICIER', '0', '0'),
('POMPIER', '0', '0'),
('AMBULANCIER', '0', '0');

-- --------------------------------------------------------

--
-- Structure de la table `gagnant`
--

DROP TABLE IF EXISTS `gagnant`;
CREATE TABLE IF NOT EXISTS `gagnant` (
  `Partiefinie` tinyint(4) NOT NULL,
  `nomGagnant` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
