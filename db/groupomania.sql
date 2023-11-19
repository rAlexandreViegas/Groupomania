SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+01:00";

-- --------------------------------------------------------
--
-- Database: `groupomania`
--
CREATE DATABASE IF NOT EXISTS `groupomania` DEFAULT CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_general_ci;

USE `groupomania`;

-- --------------------------------------------------------
--
-- Table structure for table `likes`
--
DROP TABLE IF EXISTS `likes`;

CREATE TABLE
  `likes` (
    `id` int (11) NOT NULL,
    `user_id` int (11) NOT NULL,
    `post_id` int (11) NOT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `comments`
--
DROP TABLE IF EXISTS `comments`;

CREATE TABLE
  `comments` (
    `id` int (11) NOT NULL,
    `message` varchar(255) NOT NULL,
    `user_id` int (11) NOT NULL,
    `post_id` int (11) NOT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `posts`
--
DROP TABLE IF EXISTS `posts`;

CREATE TABLE
  `posts` (
    `id` int (11) NOT NULL,
    `message` varchar(255) NOT NULL,
    `imageUrl` varchar(255) DEFAULT NULL,
    `user_id` int (11) NOT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `users_roles`
--
DROP TABLE IF EXISTS `users_roles`;

CREATE TABLE
  `users_roles` (
    `user_id` int (11) NOT NULL,
    `role_id` int (11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `roles`
--
DROP TABLE IF EXISTS `roles`;

CREATE TABLE
  `roles` (
    `id` int (11) NOT NULL,
    `name` varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

CREATE TABLE
  `users` (
    `id` int (11) NOT NULL,
    `firstName` varchar(40) NOT NULL,
    `lastName` varchar(40) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `avatarUrl` varchar(255) DEFAULT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Indexes for dumped tables
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `roles` ADD PRIMARY KEY (`id`);

ALTER TABLE `users_roles` ADD PRIMARY KEY (`user_id`, `role_id`),
ADD KEY `users_roles_ibfk1` (`user_id`),
ADD KEY `users_roles_ibfk2` (`role_id`);

ALTER TABLE `posts` ADD PRIMARY KEY (`id`),
ADD KEY `posts_ibfk1` (`user_id`);

ALTER TABLE `comments` ADD PRIMARY KEY (`id`),
ADD KEY `comments_ibfk1` (`user_id`),
ADD KEY `comments_ibfk2` (`post_id`);

ALTER TABLE `likes` ADD PRIMARY KEY (`id`),
ADD KEY `likes_ibfk1` (`user_id`),
ADD KEY `likes_ibfk2` (`post_id`);

-- --------------------------------------------------------
--
-- AUTO_INCREMENT for dumped tables
--
ALTER TABLE `comments` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `likes` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `posts` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `roles` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------
--
-- Constraints for dumped tables
--
ALTER TABLE `users_roles` ADD CONSTRAINT `users_roles_ibfk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `users_roles_ibfk2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `posts` ADD CONSTRAINT `posts_ibfk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `comments_ibfk2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `likes` ADD CONSTRAINT `likes_ibfk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `likes_ibfk2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- --------------------------------------------------------
--
-- Dumping data
--
INSERT INTO
  `users` (
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `avatarUrl`
  )
VALUES
  (
    'COMPTE',
    'ADMIN',
    'admin@groupomania.fr',
    '$2a$10$V154N4RM4TiXQqWp1ilt7uCGvi7SReQVtQAx2HjRksvSY0WcZDDbW',
    '/images/avatars/default.jpg'
  );

INSERT INTO
  `roles` (`name`)
VALUES
  ('ADMIN'),
  ('USER');

INSERT INTO
  `users_roles` (`user_id`, `role_id`)
VALUES
  (1, 1);

COMMIT;