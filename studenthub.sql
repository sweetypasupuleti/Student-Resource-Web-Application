-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2023 at 06:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studenthub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(20) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `dob` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstname`, `lastname`, `dob`, `email`, `phone`, `password`) VALUES
(1, 'admin', 'admin', '120302', 'admin@gmail.com', 'admin', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(40) NOT NULL,
  `coursename` varchar(50) NOT NULL,
  `imgurl` varchar(1000) NOT NULL,
  `description` varchar(300) NOT NULL,
  `duration` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `coursename`, `imgurl`, `description`, `duration`) VALUES
(6, 'Dotnet', 'https://www.srishticampus.com/packageImages/dotnet_round.png', 'Harness the strength of a unified platform', '12 hours'),
(7, 'Javascript', 'https://miro.medium.com/v2/resize:fit:828/format:webp/1*98ydKJQSWDGwHZxUV_-kLw.png', 'Ignite your web creations ', '10 hours'),
(12, 'Javascript', 'https://miro.medium.com/v2/resize:fit:828/format:webp/1*98ydKJQSWDGwHZxUV_-kLw.png', 'Ignite your web creations ', '10 hours'),
(14, 'Dotnet', 'https://www.srishticampus.com/packageImages/dotnet_round.png', 'Harness the strength of a unified platform', '12 hours');

-- --------------------------------------------------------
--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(30) NOT NULL,
  `title` varchar(300) NOT NULL,
  `sourceurl` varchar(300) NOT NULL,
  `imageurl` varchar(500) NOT NULL,
  `author` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `sourceurl`, `imageurl`, `author`) VALUES
(1, 'Java', 'https://www.javatpoint.com/java-tutorial', 'https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png', 'Javatpoint'),
(2, 'Python', 'https://www.geeksforgeeks.org/python-programming-language/', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png', 'Geeks for Geeks'),
(3, 'C++', 'https://www.w3schools.com/cpp/', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ZStEOE4wgn4dwaAyhrF9XOcTa-us5u1n_V7vjXjXXA&s', 'W3Schools');

-- --------------------------------------------------------
--
-- Table structure for table `enroll`
--

CREATE TABLE `enroll` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `selectedcourse` varchar(250) NOT NULL,
  `duration` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`id`, `name`, `selectedcourse`, `duration`) VALUES
(1, 'ashok raj', 'Python Programming Language', '10 hours'),
(3, 'ashok raj', 'Dotnet Language', '12 hours'),
(4, 'ashok raj', 'Python Programming Language', '10 hours'),
(5, 'ashok raj', 'Dotnet', '12 hours'),
(6, 'Ganesh raj', 'Dotnet', '12 hours');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `link` text NOT NULL,
  `time` varchar(250) NOT NULL,
  `endtime` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`, `link`, `time`, `endtime`) VALUES
(1, 'Python', '2023-10-02', '2023-10-03', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', '10:30 P.M', '11:00 P.M'),
(2, 'Java', '2023-11-05', '2023-11-08', 'https://www.youtube.com/watch?v=eIrMbAQSU34', '10:15 A.M ', '11:30 A.M'),
(3, 'Hai', '2023-11-17', '2023-11-24', '', 'Hai', 'Hai'),
(4, 'Ganesh', '2023-11-17', '2023-11-18', '', 'Gani', 'Ga'),
(5, 'Ganesh 123', '2023-12-13', '2023-12-27', 'http://localhost/phpmyadmin/', 'Gani', 'Ga'),
(6, 'Pavan', '2023-11-10', '2023-11-11', '', 'Time1', 'Time 2'),
(7, 'Bharath', '2023-10-13', '2023-10-28', '', 'Bhar', 'Bha');

-- --------------------------------------------------------

--
-- Table structure for table `problems`
--

CREATE TABLE `problems` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `problem` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `stat` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problems`
--

INSERT INTO `problems` (`id`, `name`, `email`, `problem`, `solution`, `stat`) VALUES
(1, 'Pavan', 'pavan@gmail.com', 'i\'m facing course issue ', 'problem type here', 'unverified'),
(2, 'Ganesh', 'Ganesh@gmail.com', 'i am facing quizz problem', 'refresh the page then start the quiz', 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `quizscore`
--

CREATE TABLE `quizscore` (
  `title` text NOT NULL,
  `score` text NOT NULL,
  `correctans` text NOT NULL,
  `wrongans` text NOT NULL,
  `studentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizscore`
--

INSERT INTO `quizscore` (`title`, `score`, `correctans`, `wrongans`, `studentId`) VALUES
('Java', '5', '1', '3', 5),
('C Language', '10', '2', '2', 5),
('Javascript', '5', '1', '3', 5),
('Python', '0', '0', '4', 5),
('Python', '5', '1', '3', 4);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(20) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstname`, `lastname`, `dob`, `email`, `phone`, `password`, `profilePic`) VALUES
(1, 'hi', 'hi', '0000-00-00', 'hi@gmail.com', 'hi', 'hi@gmail.com', NULL),
(3, 'admin123', 'admin123', '0000-00-00', 'admin123@gmail.com', '1234567890', 'Pavan@180602', NULL),
(4, 'ram', 'ram', '0000-00-00', 'ram@gmail.com', '9874561235', 'ram', NULL),
(5, 'ashok', 'raj', '2023-10-06', 'raj@gmail.com', '9874563212', 'rajrajraj', '/uploads/apartment.jpg'),
(6, 'admin', 'admin', '2023-10-06', 'admin@gmail.com', '9876543213', 'admin', NULL),
(7, 'Pavan', 'Chintakayala', '2023-11-16', 'pa1chintakayala@gmail.com', '7671831838', 'pa1chintakayala@gmai', NULL),
(8, 'Empty', 'Empty', '2023-11-13', 'empty@gmail.com', '1234567890', '1234567890', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enroll`
--
ALTER TABLE `enroll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `problems`
--
ALTER TABLE `problems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `enroll`
--
ALTER TABLE `enroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `problems`
--
ALTER TABLE `problems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
