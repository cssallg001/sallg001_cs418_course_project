-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 07:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_advising`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_tag` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `credit_hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_tag`, `course_name`, `credit_hours`) VALUES
(1, 'ENGL 110C', 'English Composition', 3),
(2, 'MATH 211', 'Calculus I', 4),
(3, 'MATH 163', 'Precalculus II', 3),
(4, 'MATH 162M', 'Precalculus I', 3),
(5, 'MATH 102M', 'College Algebra', 3),
(6, 'MATH 103M', 'College Algebra with Supplemental Instruction', 3),
(7, 'MATH 100', 'The Math Cooperative', 1),
(8, 'MATH 166', 'Precalculus I and II', 4),
(9, 'CS 151', 'Introduction to Programming with Java', 4),
(10, 'CS 153', 'Introduction to Programming with Python', 4),
(11, 'ENGL 211C', 'Writing, Rhetoric, and Research', 3),
(12, 'ENGL 231C', 'Writing, Rhetoric, and Research: Special Topics', 3),
(13, 'MATH 212', 'Calculus II', 4),
(14, 'CS 170', 'Introduction to Computer Architecture I', 3),
(15, 'CS 150', 'Introduction to Programming with C++', 4),
(16, 'ENGN 150', 'Computer Programming for Engineering Problem Solving', 4),
(17, 'CS 251', 'Programming with Java', 4),
(18, 'CS 252', 'Introduction to Unix for Programmers', 1),
(19, 'IT 205', 'Introduction to Object-Oriented Programming', 3),
(20, 'MATH 316', 'Introductory Linear Algebra', 3),
(21, 'CS 270', 'Introduction to Computer Architecture II', 3),
(22, 'CS 330', 'Object-Oriented Design and Programming', 3),
(23, 'CS 253', 'Transfer Credit for Programming with Python', 4),
(24, 'CS 250', 'Programming with C++', 4),
(25, 'COMM 101R', 'Public Speaking', 3),
(26, 'PHIL 160R', 'Raising Moral Issues in STEM', 3),
(27, 'STAT 330', 'An Introduction to Probability and Statistics', 3),
(28, 'CS 260', 'C++ for Programmers', 1),
(29, 'CS 361', 'Data Structures and Algorithms', 3),
(30, 'CS 261', 'Java for Programmers', 1),
(31, 'CS 121G', 'Introduction to Information Literacy and Research for Scientists', 3),
(32, 'CS 202G', 'Information Literacy for Cybersecurity', 3),
(33, 'CS 315', 'Computer Science Undergraduate Colloquium', 1),
(34, 'CS 355', 'Principles of Programming Languages', 3),
(35, 'CS 381', 'Introduction to Discrete Structures', 3),
(36, 'CS 350', 'Introduction to Software Engineering', 3),
(37, 'CS 390', 'Introduction to Theoretical Computer Science', 3),
(38, 'CS 450', 'Database Concepts', 3),
(39, 'CS 418', 'Web Programming', 3),
(40, 'CS 312', 'Internet Concepts', 3),
(41, 'CS 410', 'Professional Workforce Development I', 3),
(42, 'CS 417', 'Computational Methods and Software', 3),
(43, 'CS 411W', 'Professional Workforce Development II', 3),
(44, 'ENGL 221C', 'Introduction to Writing in Business, Education and Social Sciences', 3),
(45, 'CS 471', 'Operating Systems', 3),
(46, 'ECE 346', 'Microcontrollers', 3),
(47, 'ECE 241', 'Fundamentals of Computer Engineering', 4),
(48, 'ENGN 122', 'Computer Programming for Engineering', 4),
(49, 'ECE 443', 'Computer Architecture', 3),
(50, 'ECE 342', 'Field Programmable Gate Arrays Design Laboratory', 2),
(51, 'ECE 341', 'Digital System Design', 3);

-- --------------------------------------------------------

--
-- Table structure for table `course_mapping`
--

CREATE TABLE `course_mapping` (
  `course_mapping_id` int(11) NOT NULL,
  `advising_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_prereqs`
--

CREATE TABLE `course_prereqs` (
  `course_id` int(11) NOT NULL,
  `prereq_set_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_prereqs`
--

INSERT INTO `course_prereqs` (`course_id`, `prereq_set_num`) VALUES
(0, 0),
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20),
(21, 21),
(22, 22),
(23, 23),
(24, 24),
(25, 25),
(26, 26),
(27, 27),
(28, 28),
(29, 29),
(30, 30),
(31, 31),
(32, 32),
(33, 33),
(34, 34),
(35, 35),
(36, 36),
(37, 37),
(38, 38),
(39, 39),
(40, 40),
(41, 41),
(42, 42),
(43, 43),
(44, 44),
(45, 45),
(46, 46),
(47, 47),
(48, 48),
(49, 49),
(50, 50),
(51, 51);

-- --------------------------------------------------------

--
-- Table structure for table `course_sets`
--

CREATE TABLE `course_sets` (
  `course_set_num` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prerequisites`
--

CREATE TABLE `prerequisites` (
  `prereq_id` int(11) NOT NULL,
  `prereq_level` int(11) NOT NULL,
  `prereq_tag` varchar(255) NOT NULL,
  `prereq_name` varchar(255) NOT NULL,
  `credit_hours` int(11) NOT NULL,
  `enable_disable` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prerequisites`
--

INSERT INTO `prerequisites` (`prereq_id`, `prereq_level`, `prereq_tag`, `prereq_name`, `credit_hours`, `enable_disable`) VALUES
(1, 0, '', '', 0, 0),
(2, 100, 'ENGL 110C', 'English Composition', 3, 1),
(3, 200, 'MATH 211', 'Calculus I', 4, 0),
(4, 100, 'MATH 163', 'Precalculus II', 3, 1),
(5, 100, 'MATH 162M', 'Precalculus I', 3, 0),
(6, 100, 'MATH 102M', 'College Algebra', 3, 1),
(7, 100, 'MATH 103M', 'College Algebra with Supplemental Instruction', 3, 1),
(8, 100, 'MATH 100', 'The Math Cooperative', 1, 0),
(9, 100, 'MATH 166', 'Precalculus I and II', 4, 1),
(10, 100, 'CS 151', 'Introduction to Programming with Java', 4, 0),
(11, 100, 'CS 153', 'Introduction to Programming with Python', 4, 1),
(12, 200, 'ENGL 211C', 'Writing, Rhetoric, and Research', 3, 0),
(13, 200, 'ENGL 231C', 'Writing, Rhetoric, and Research: Special Topics', 3, 0),
(14, 200, 'MATH 212', 'Calculus II', 4, 1),
(15, 100, 'CS 170', 'Introduction to Computer Architecture I', 3, 0),
(16, 100, 'CS 150', 'Introduction to Programming with C++', 4, 1),
(17, 100, 'ENGN 150', 'Computer Programming for Engineering Problem Solving', 4, 1),
(18, 200, 'CS 251', 'Programming with Java', 4, 1),
(19, 200, 'CS 252', 'Introduction to Unix for Programmers', 1, 0),
(20, 200, 'IT 205', 'Introduction to Object-Oriented Programming', 3, 0),
(21, 300, 'MATH 316', 'Introductory Linear Algebra', 3, 0),
(22, 200, 'CS 270', 'Introduction to Computer Architecture II', 3, 0),
(23, 300, 'CS 330', 'Object-Oriented Design and Programming', 3, 1),
(24, 200, 'CS 253', 'Transfer Credit for Programming with Python', 4, 1),
(25, 200, 'CS 250', 'Programming with C++', 4, 0),
(26, 100, 'COMM 101R', 'Public Speaking', 3, 0),
(27, 100, 'PHIL 160R', 'Raising Moral Issues in STEM', 3, 0),
(28, 300, 'STAT 330', 'An Introduction to Probability and Statistics', 3, 1),
(29, 200, 'CS 260', 'C++ for Programmers', 1, 0),
(30, 300, 'CS 361', 'Data Structures and Algorithms', 3, 0),
(31, 200, 'CS 261', 'Java for Programmers', 1, 1),
(32, 100, 'CS 121G', 'Introduction to Information Literacy and Research for Scientists', 3, 1),
(33, 200, 'CS 202G', 'Information Literacy for Cybersecurity', 3, 1),
(34, 300, 'CS 315', 'Computer Science Undergraduate Colloquium', 1, 0),
(35, 300, 'CS 355', 'Principles of Programming Languages', 3, 0),
(36, 300, 'CS 381', 'Introduction to Discrete Structures', 3, 1),
(37, 300, 'CS 350', 'Introduction to Software Engineering', 3, 0),
(38, 300, 'CS 390', 'Introduction to Theoretical Computer Science', 3, 1),
(39, 400, 'CS 450', 'Database Concepts', 3, 0),
(40, 400, 'CS 418', 'Web Programming', 3, 1),
(41, 300, 'CS 312', 'Internet Concepts', 3, 0),
(42, 400, 'CS 410', 'Professional Workforce Development I', 3, 0),
(43, 400, 'CS 417', 'Computational Methods and Software', 3, 1),
(44, 400, 'CS 411W', 'Professional Workforce Development II', 3, 0),
(45, 200, 'ENGL 221C', 'Introduction to Writing in Business, Education and Social Sciences', 3, 0),
(46, 400, 'CS 471', 'Operating Systems', 3, 1),
(47, 300, 'ECE 346', 'Microcontrollers', 3, 0),
(48, 200, 'ECE 241', 'Fundamentals of Computer Engineering', 4, 1),
(49, 100, 'ENGN 122', 'Computer Programming for Engineering', 4, 0),
(50, 400, 'ECE 443', 'Computer Architecture', 3, 1),
(51, 300, 'ECE 342', 'Field Programmable Gate Arrays Design Laboratory', 2, 1),
(52, 300, 'ECE 341', 'Digital System Design', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prerequisite_sets`
--

CREATE TABLE `prerequisite_sets` (
  `prereq_set_num` int(11) NOT NULL,
  `prereq_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prerequisite_sets`
--

INSERT INTO `prerequisite_sets` (`prereq_set_num`, `prereq_id`) VALUES
(0, 0),
(1, 1),
(2, 4),
(3, 5),
(4, 6),
(5, 1),
(6, 8),
(7, 1),
(8, 6),
(9, 5),
(10, 5),
(11, 2),
(12, 2),
(13, 3),
(14, 5),
(14, 16),
(15, 5),
(16, 4),
(17, 4),
(17, 16),
(18, 16),
(19, 1),
(20, 14),
(21, 15),
(22, 19),
(22, 25),
(23, 1),
(24, 4),
(24, 16),
(25, 1),
(26, 1),
(27, 3),
(28, 18),
(29, 19),
(29, 3),
(29, 18),
(30, 25),
(31, 1),
(32, 2),
(33, 16),
(34, 19),
(34, 25),
(35, 4),
(35, 16),
(36, 19),
(36, 23),
(37, 36),
(37, 25),
(38, 19),
(38, 36),
(38, 23),
(39, 41),
(39, 23),
(40, 19),
(41, 23),
(42, 21),
(42, 25),
(43, 23),
(43, 37),
(43, 42),
(43, 12),
(44, 2),
(45, 17),
(45, 47),
(46, 48),
(47, 16),
(48, 4),
(49, 47),
(49, 51),
(50, 52),
(50, 47),
(51, 48);

-- --------------------------------------------------------

--
-- Table structure for table `prerequisite_status`
--

CREATE TABLE `prerequisite_status` (
  `prereq_id` int(11) NOT NULL,
  `enable/disable` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prereq_mapping`
--

CREATE TABLE `prereq_mapping` (
  `prereq_mapping_id` int(11) NOT NULL,
  `advising_id` int(11) NOT NULL,
  `prereq_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `advising_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `last_term` varchar(255) NOT NULL,
  `last_gpa` double NOT NULL,
  `current_term` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_submitted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL,
  `semester_term` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_courses`
--

CREATE TABLE `semester_courses` (
  `user_id` bigint(20) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `course_set_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_status`
--

CREATE TABLE `semester_status` (
  `user_id` bigint(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `semester_gpa` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_status_request`
--

CREATE TABLE `semester_status_request` (
  `request_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `request_date` date NOT NULL,
  `previous_term` varchar(255) NOT NULL,
  `current_term` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_status_request`
--

INSERT INTO `semester_status_request` (`request_id`, `status`, `request_date`, `previous_term`, `current_term`) VALUES
(1, '', '0000-00-00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_information`
--

CREATE TABLE `user_information` (
  `user_id` bigint(20) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Is_Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_information`
--

INSERT INTO `user_information` (`user_id`, `First_Name`, `Last_Name`, `Email`, `Password`, `Is_Admin`) VALUES
(0, 'Sean', 'Allgaier', 'sean.g.allgaier.99@gmail.com', '$2b$10$Ku52WNEqzl7p1CMQJHIqdObVCEiryZQkrW7mk62sLiGav1Ug38gmq', 1),
(45, 'Sean', 'Allgaier', 'seanallgaier@yahoo.com', '$2b$10$0EGsI.VKTaZeQtcY93XeQuTLzxToGnyE5EHcb2TBjZrYaRdMamZv6', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `course_sets`
--
ALTER TABLE `course_sets`
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `prerequisites`
--
ALTER TABLE `prerequisites`
  ADD PRIMARY KEY (`prereq_id`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `semester_courses`
--
ALTER TABLE `semester_courses`
  ADD KEY `semester_id` (`semester_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `semester_status`
--
ALTER TABLE `semester_status`
  ADD KEY `semester_id` (`semester_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `semester_status_request`
--
ALTER TABLE `semester_status_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `user_information`
--
ALTER TABLE `user_information`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `prerequisites`
--
ALTER TABLE `prerequisites`
  MODIFY `prereq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `semester_status_request`
--
ALTER TABLE `semester_status_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_information`
--
ALTER TABLE `user_information`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_sets`
--
ALTER TABLE `course_sets`
  ADD CONSTRAINT `course_sets_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `semester_courses`
--
ALTER TABLE `semester_courses`
  ADD CONSTRAINT `semester_courses_ibfk_1` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`semester_id`),
  ADD CONSTRAINT `semester_courses_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_information` (`user_id`);

--
-- Constraints for table `semester_status`
--
ALTER TABLE `semester_status`
  ADD CONSTRAINT `semester_status_ibfk_1` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`semester_id`),
  ADD CONSTRAINT `semester_status_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_information` (`user_id`),
  ADD CONSTRAINT `semester_status_ibfk_3` FOREIGN KEY (`request_id`) REFERENCES `semester_status_request` (`request_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
