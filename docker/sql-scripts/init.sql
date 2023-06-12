create database kriegerdigital;
GO
use kriegerdigital;
GO
CREATE TABLE Sellers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    rating DECIMAL(3, 1)
);

-- Create the Items table
CREATE TABLE Items (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    sellerId INT,
    FOREIGN KEY (sellerId) REFERENCES Sellers(id)
);

INSERT INTO Sellers (id, name, rating) VALUES
(1, 'Penny', 4.5),
(2, 'Leonard', 3.8),
(3, 'Sheldon', 4.9),
(4, 'Amy', 4.2);

-- Insert data into the Items table
INSERT INTO Items (id, name, sellerId) VALUES
(1, 'Notebook', 1),
(2, 'Pencil', 1),
(3, 'Eraser', 2),
(4, 'Pen', 3),
(5, 'Highlighter', 3),
(6, 'Ruler', 4);

GO