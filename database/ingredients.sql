-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2026 at 01:29 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pbl_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ingredients`
--

CREATE TABLE `ingredients` (
  `food_name` varchar(100) NOT NULL,
  `protein_g` decimal(6,2) DEFAULT NULL,
  `fat_g` decimal(6,2) DEFAULT NULL,
  `carbohydrates_g` decimal(6,2) DEFAULT NULL,
  `calcium_mg` decimal(8,2) DEFAULT NULL,
  `phosphorus_mg` decimal(8,2) DEFAULT NULL,
  `zinc_mg` decimal(6,2) DEFAULT NULL,
  `vitamin_a_ug` decimal(10,2) DEFAULT NULL,
  `vitamin_d_ug` decimal(6,2) DEFAULT NULL,
  `thiamin_mg` decimal(6,2) DEFAULT NULL,
  `taurine_mg` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`food_name`, `protein_g`, `fat_g`, `carbohydrates_g`, `calcium_mg`, `phosphorus_mg`, `zinc_mg`, `vitamin_a_ug`, `vitamin_d_ug`, `thiamin_mg`, `taurine_mg`) VALUES
('brokuł', 2.57, 0.07, 6.27, 46.00, 67.00, 0.42, 8.00, 0.00, 0.08, 0.00),
('dorsz', 16.10, 0.67, 0.00, 7.00, 224.00, 0.31, 2.31, 2.50, 0.00, 30.00),
('dynia', 1.00, 0.10, 6.50, 21.00, 44.00, 0.32, 426.00, 0.00, 0.05, 0.00),
('fasolka szparagowa', 1.97, 0.28, 7.41, 40.00, 41.00, 0.35, 0.00, 0.00, 0.06, 0.00),
('groszek', 5.42, 0.40, 14.40, 25.00, 108.00, 1.24, 38.00, 0.00, 0.27, 0.00),
('jajka na twardo', 12.60, 10.60, 1.12, 50.00, 172.00, 1.05, 149.00, 2.20, 0.07, 0.00),
('jęczmień', 9.91, 1.16, 77.70, 29.00, 221.00, 2.13, 1.00, 0.00, 0.19, 0.00),
('marchewka', 0.94, 0.35, 10.30, 30.00, 40.00, 0.24, 8.00, 0.00, 0.07, 0.00),
('mielona wołowina', 17.50, 19.40, 0.00, 7.00, 144.00, 3.85, 0.00, 0.11, 0.05, 45.00),
('olej lniany', 0.00, 99.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00),
('owies', 17.30, 7.03, 66.20, 58.00, 734.00, 3.11, 0.00, 0.00, 1.17, 0.00),
('ryż', 12.80, 1.70, 75.70, 8.00, 355.00, 5.84, 0.00, 0.00, 0.34, 0.00),
('serce indyka', 16.70, 7.55, 0.40, 18.00, 183.00, 3.21, 82.00, 0.40, 0.17, 325.00),
('serce z kurczaka', 15.60, 9.33, 0.71, 12.00, 177.00, 6.59, 9.00, 0.20, 0.15, 330.00),
('skóra z piersi indyka', 21.90, 7.02, 0.00, 13.00, 186.00, 1.57, 2.00, 0.30, 0.06, 25.00),
('skóra z piersi kurczaka', 22.50, 1.93, 0.00, 4.00, 215.00, 0.65, 0.00, 0.00, 0.10, 20.00),
('szpinak', 2.86, 0.39, 3.63, 99.00, 49.00, 0.53, 469.00, 0.00, 0.08, 0.00),
('słodkie ziemniaki', 1.58, 0.38, 17.30, 22.00, 37.00, 0.34, 0.00, 0.00, 0.05, 0.00),
('tłuszcz z kurczaka', 0.00, 99.80, 0.00, 0.00, 0.00, 0.00, 0.00, 4.80, 0.00, 0.00),
('udko kurczaka ze skórą', 17.10, 13.40, 0.00, 6.00, 154.00, 1.20, 20.00, 1.25, 0.07, 180.00),
('wątróbka wołowa', 20.40, 3.53, 3.89, 5.00, 387.00, 4.00, 4970.00, 1.20, 0.19, 65.00),
('wątróbka z kurczaka', 16.90, 4.83, 0.73, 8.00, 297.00, 2.67, 3300.00, 0.00, 0.31, 110.00),
('ziemniaki', 2.27, 0.36, 17.80, 8.00, 55.00, 0.38, 0.00, 0.00, 0.07, 0.00),
('żołądek indyczy', 18.80, 3.37, 0.00, 16.00, 164.00, 3.03, 46.00, 0.50, 0.06, 175.00),
('żołądek z kurczaka', 17.70, 2.06, 0.00, 11.00, 148.00, 2.72, 19.00, 0.00, 0.03, 175.00),
('łosoś', 20.30, 13.10, 0.00, 9.00, 230.00, 0.34, 54.00, 5.00, 0.04, 110.00);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`food_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
