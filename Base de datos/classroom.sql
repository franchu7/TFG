-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2022 a las 18:12:04
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `classroom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(35) NOT NULL,
  `surname1` varchar(35) NOT NULL,
  `surname2` varchar(35) DEFAULT NULL,
  `dni` char(9) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `street` varchar(50) NOT NULL,
  `streetNum` varchar(3) NOT NULL,
  `floor` varchar(4) DEFAULT NULL,
  `zipCode` char(5) NOT NULL,
  `location` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `phoneNum` char(9) NOT NULL,
  `role` varchar(10) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `surname1`, `surname2`, `dni`, `gender`, `street`, `streetNum`, `floor`, `zipCode`, `location`, `province`, `phoneNum`, `role`, `avatar`) VALUES
(1, 'admin@gmail.com', '$2y$10$.UtmhPn94fgYwV4NF80e4.LS9O003cuO7A/qXt5c0EPcNI1VQ5My2', 'Francisco', 'Calles', 'Esteban', '09050894A', 'hombre', 'Av. Juan de Austria', '12', '6ºD', '28805', 'Alcalá de Henares', 'Madrid', '686597257', 'admin', 'assets/img/background.jpg'),
(2, 'user1@gmail.com', '$2y$10$ptzsHPwcAX/A/fO6ve6p8.xGQ7tHB.ZnFHm0QMGe5.R5.zyn2w5My', 'Pepito', 'Pérez', 'Gutíerrez', '35354543B', 'hombre', 'C. CalleA', '1', '', '28805', 'Alcalá de Henares', 'Madrid', '665463435', 'student', 'assets/img/user-avatar.png'),
(3, 'user2@gmail.com', '$2y$10$ER/vkPRccR7s8N3h6hvD5.TcMf0LZoQ7LMNL9E0lg5yawfYPSc2xy', 'Marta', 'García', 'López', '35354543C', 'mujer', 'C. CalleA', '2', '', '28805', 'Alcalá de Henares', 'Madrid', '600934435', 'student', 'assets/img/user-avatar.png'),
(4, 'user3@gmail.com', '$2y$10$XpXhRuZb3mJl.IZ1moHFDejhulWmYIuybTnmNPZQp0OIYRyZvRhCe', 'Adrian', 'Calles', 'Esteban', '00945373D', 'hombre', 'C. CalleA', '3', '', '28805', 'Alcalá de Henares', 'Madrid', '666342981', 'student', 'assets/img/user-avatar.png'),
(5, 'p.solis@gmail.com', '$2y$10$nh3Dzx6zyhO3UKdQ5iEWaO6HkUqFpPdNUdqQjROIlEmQJvhsAUwXe', 'Paula', 'Solis', '', '04346214G', 'mujer', 'Vía Complutense', '30', '4ºB', '28805', 'Alcalá de Henares', 'Madrid', '659264901', 'student', 'assets/img/user-avatar.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
