CREATE DATABASE IF NOT EXISTS creatures;
USE creatures ;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 03 déc. 2024 à 22:47
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `creatures`
--

-- --------------------------------------------------------

--
-- Structure de la table `gadget`
--

CREATE TABLE `gadget` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `target` enum('MY_ATTACK','OPPONENT_ATTACK','TYPE_IMPACT','CREDIT') NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `gadget`
--

INSERT INTO `gadget` (`id`, `name`, `target`, `points`) VALUES
(2, 'Power Booster', 'MY_ATTACK', 50),
(3, 'Shield Enhancer', 'OPPONENT_ATTACK', -30),
(4, 'Type Changer', 'TYPE_IMPACT', 20),
(5, 'Credit Multiplier', 'CREDIT', 10),
(6, 'Attack Amplifier', 'MY_ATTACK', 70),
(7, 'Disruptor', 'OPPONENT_ATTACK', -40),
(8, 'Type Defender', 'TYPE_IMPACT', -10),
(9, 'Credit Doubler', 'CREDIT', 15);

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

CREATE TABLE `pokemon` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('normal','fire','water','grass') NOT NULL,
  `power` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pokemon`
--

INSERT INTO `pokemon` (`id`, `name`, `type`, `power`) VALUES
(1, 'pokemon3', 'water', 8),
(2, 'pokemon2', 'water', 8),
(5, 'pokemon6', 'fire', 10),
(8, 'Pikachu', 'fire', 55),
(9, 'Charizard', 'water', 84),
(10, 'Bulbasaur', 'grass', 49),
(11, 'Squirtle', 'water', 48),
(12, 'Gengar', 'water', 65),
(13, 'Jigglypuff', 'fire', 45),
(14, 'Machamp', 'grass', 90),
(15, 'Alakazam', 'water', 120);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `gadget
`
--
ALTER TABLE `gadget`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `gadgets`
--
ALTER TABLE `gadget`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
