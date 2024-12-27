-- Active: 1732787432524@@127.0.0.1@3306@flower_shop

CREATE DATABASE flower_shop ;



use flower_shop




CREATE TABLE `flowers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `color` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `flower_type` BIGINT NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `import_from` VARCHAR(255) NOT NULL
);




INSERT INTO `flowers` (`name`, `color`, `price`, `flower_type`, `photo`, `import_from`)
VALUES
    ('Atirgul', 'Qizil', 25000.00, 1, 'https://yuz.uz/file/news/d8381d3c7093a2fc9745666cbf7a861f.webp', 'Hindiston'),
    ('Lola', 'Oq', 15000.00, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfuEeG8RaUAAyRobY31ifVaH29BzxKDY52mQ&s', 'Niderlandiya'),
    ('Nargiz', 'Sariq', 20000.00, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98W7lX26Vb2-aWkcNINbyKD3PYpnqpk_idQ&s', 'Turkiya'),
    ('Orxideya', 'Binafsha', 75000.00, 4, 'https://xabar.uz/static/crop/2/3/736_736_95_2374050395.jpg', 'Malayziya'),
    ('Atirgul', 'Pushti', 30000.00, 1, 'https://by.floristum.com/uploads/products/632x632/350/p193_1620303969_38081.jpg', 'Eron');




CREATE TABLE `customers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL
);

INSERT INTO `customers` (`first_name`, `last_name`, `phone`, `email`, `address`)
VALUES
    ('Akmal', 'Rasulov', '+998901234567', 'akmal.rasulov@example.com', 'Toshkent, Chilonzor tumani, 5-uy'),
    ('Nodira', 'Yusupova', '+998933210987', 'nodira.yusupova@example.com', 'Samarqand, Registon ko‘chasi, 12-uy'),
    ('Jamshid', 'Karimov', '+998941112233', 'jamshid.karimov@example.com', 'Buxoro, Sharq ko‘chasi, 8-uy'),
    ('Dilafruz', 'Saidova', '+998977654321', 'dilafruz.saidova@example.com', 'Andijon, Bobur shoh ko‘chasi, 20-uy'),
    ('Sherzod', 'Ismoilov', '+998993456789', 'sherzod.ismoilov@example.com', 'Farg‘ona, Qo‘qon shahar, Navbahor ko‘chasi, 15-uy');


CREATE TABLE `orders`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `total_price` DECIMAL(8, 2) NOT NULL,
    `order_date` DATETIME NOT NULL,
    `status_id` BIGINT UNSIGNED NOT NULL
);


CREATE TABLE `order_details`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `flower_id` BIGINT UNSIGNED NOT NULL,
    `quantity` BIGINT NOT NULL
);



CREATE TABLE `status`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

DESCRIBE status

DROP TABLE status












ALTER TABLE
    `orders` ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `status`(`id`);
ALTER TABLE
    `order_details` ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`id`);
ALTER TABLE
    `order_details` ADD CONSTRAINT `order_details_flower_id_foreign` FOREIGN KEY(`flower_id`) REFERENCES `flowers`(`id`);



CREATE PROCEDURE getAllWorkers()
BEGIN 
    SELECT * FROM workers ;
END

CREATE PROCEDURE selectWorkerById(IN workerId INT)
BEGIN
    SELECT * FROM workers WHERE id=workerId ;
END


CALL selectWorkerById(3)





CREATE PROCEDURE getWorkerName(IN workerId INT , OUT workerName VARCHAR(255))
BEGIN 
    SELECT name INTO workerName FROM workers WHERE id=workerId ;
END

CALL getWorkerName(2 ,@workerName)

SELECT @workerName



CREATE PROCEDURE resOut(INOUT res INT)
BEGIN
    set res= res + 100  ;
END


set @res= 50 

CALL resOut(@res)

SELECT @res



CREATE FUNCTION getRolesCount() RETURNS INT DETERMINISTIC
BEGIN 
    DECLARE counter INT DEFAULT 0 ;
    SELECT COUNT(*) INTO counter FROM workers ;
    RETURN counter ;
END



SELECT getRolesCount()

show DATABASES

use flower_shop


CREATE PROCEDURE upperCase()
BEGIN 
    UPDATE  flowers SET name = UPPER(name) ;
END

CALL upperCase

SELECT * FROM flowers  

use flower_shop ;



CREATE TRIGGER update_flower
AFTER UPDATE on flowers
FOR EACH ROW
BEGIN 
    INSERT INTO flower_log SET msg="Updated  row ", row_id= NEW.id ;
END

CREATE TRIGGER insert_flowers
AFTER INSERT on flowers
FOR EACH ROW
BEGIN 
    INSERT INTO flower_log SET msg="Inserted new row ", row_id= NEW.id ;
END



CREATE TRIGGER delete_flower
BEFORE DELETE on flowers
FOR EACH ROW
BEGIN 
    INSERT INTO flower_log SET msg="DELETED row ", row_id= OLD.id ;
END


CREATE TABLE flowers_backup (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    row_id INT (11) UNSIGNED NOT NULL ,
    `name` VARCHAR(255) NULL,
    `color` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `flower_type` BIGINT NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `import_from` VARCHAR(255) NOT NULL
)

CREATE TRIGGER updated_flower
BEFORE UPDATE on flowers 
FOR EACH ROW
BEGIN 
    INSERT INTO flowers_backup
        SET row_id = OLD.id ,
        name = OLD.name, 
        color = OLD.color, 
        price = OLD.price, 
        flower_type = OLD.flower_type, 
        photo = OLD.photo, 
        import_from = OLD.import_from;
END;



SELECT * FROM flowers_backup




