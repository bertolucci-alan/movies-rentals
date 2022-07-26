-- CreateTable
CREATE TABLE `movies_image` (
    `id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,
    `image_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `movies_image_movie_id_key`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies_image` ADD CONSTRAINT `movies_image_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
