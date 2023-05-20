CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token_pass` varchar(255) NOT NULL,
  `token_active` varchar(255) NOT NULL,
  `is_active` boolean DEFAULT false,
  `is_admin` boolean DEFAULT false
);

CREATE TABLE `community` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `has_paddle_court` boolean NOT NULL DEFAULT false,
  `has_tennis_court` boolean NOT NULL DEFAULT false,
  `has_pool` boolean NOT NULL DEFAULT false,
  `has_cameras` boolean NOT NULL DEFAULT false,
  `has_building_doorman` boolean NOT NULL DEFAULT false,
  `floors` int NOT NULL,
  `doors` int NOT NULL,
  `doorman_active` boolean DEFAULT false
);

CREATE TABLE `doors_floors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `user_id` int DEFAULT null,
  `role_id` int NOT NULL,
  `floor` int NOT NULL,
  `door` varchar(10) NOT NULL,
  `tickets` int DEFAULT 5,
  `is_available` boolean NOT NULL DEFAULT true
);

CREATE TABLE `bookings_p` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `door_floors_id` int DEFAULT null,
  `community_id` int NOT NULL,
  `time_zone` varchar(255) NOT NULL,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `bookings_t` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `door_floors_id` int DEFAULT null,
  `community_id` int NOT NULL,
  `time_zone` time,
  `is_available` boolean NOT NULL DEFAULT false
);

CREATE TABLE `bills` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `type_id` int NOT NULL,
  `date_p` varchar(255) NOT NULL,
  `amount` float NOT NULL
);

CREATE TABLE `payments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `deb_id` int NOT NULL,
  `type_bill` int,
  `is_spill` boolean,
  `amount` float NOT NULL,
  `d_payment` varchar(255) DEFAULT null,
  `description` varchar(255) DEFAULT null,
  `d_deb` varchar(255) DEFAULT null
);

CREATE TABLE `debs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `door_floors_id` int NOT NULL,
  `date_p` varchar(255) NOT NULL,
  `type_bill` int NOT NULL,
  `is_spill` boolean NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(255)
);

CREATE TABLE `spill_of_money` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(255) NOT NULL
);

ALTER TABLE `doors_floors` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `doors_floors` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `bookings_p` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `bookings_t` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `bookings_p` ADD FOREIGN KEY (`door_floors_id`) REFERENCES `doors_floors` (`id`);

ALTER TABLE `bookings_t` ADD FOREIGN KEY (`door_floors_id`) REFERENCES `doors_floors` (`id`);

ALTER TABLE `spill_of_money` ADD FOREIGN KEY (`community_id`) REFERENCES `doors_floors` (`community_id`);

ALTER TABLE `bills` ADD FOREIGN KEY (`community_id`) REFERENCES `doors_floors` (`community_id`);

ALTER TABLE `debs` ADD FOREIGN KEY (`door_floors_id`) REFERENCES `doors_floors` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`deb_id`) REFERENCES `debs` (`id`);
