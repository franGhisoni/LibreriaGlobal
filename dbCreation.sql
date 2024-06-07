-- Crear la base de datos
CREATE DATABASE Biblioteca;
GO

-- Usar la base de datos creada
USE Biblioteca;
GO

-- Crear la tabla Direcciones
CREATE TABLE Direcciones (
    Pk_Direcciones_ID INT IDENTITY(1,1) PRIMARY KEY,
    Calle VARCHAR(100),
    Numero INT,
    Piso INT,
    Departamento VARCHAR(10),
    Ciudad VARCHAR(50),
    Provincia VARCHAR(50),
    Codigo_Postal VARCHAR(10)
);
GO

-- Crear la tabla Editoriales
CREATE TABLE Editoriales (
    PK_Editorial_Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50),
    FK_Editoriales_Direccion_Id INT,
    CUIT INT,
    FOREIGN KEY (FK_Editoriales_Direccion_Id) REFERENCES Direcciones(Pk_Direcciones_ID)
);
GO

-- Crear la tabla Autores
CREATE TABLE Autores (
    PK_Autor_ID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    DNI INT,
    Nacionalidad VARCHAR(50)
);
GO

-- Crear la tabla Libros
CREATE TABLE Libros (
    PK_Libros_ID INT IDENTITY(1,1) PRIMARY KEY,
    FK_Libros_Editorial_ID INT,
    Titulo VARCHAR(100),
    Categoria_Literaria VARCHAR(100),
    Precio DECIMAL(10,2),
    Fecha_Lanzamiento DATE,
    Descripcion TEXT,  -- SQL Server no tiene MEDIUMTEXT, usamos TEXT
    FOREIGN KEY (FK_Libros_Editorial_ID) REFERENCES Editoriales(PK_Editorial_Id)
);
GO

-- Crear la tabla Libros-Autores (Tabla de relación)
CREATE TABLE Libros_Autores (
    FK_Autor_ID INT,
    FK_Libros_ID INT,
    PRIMARY KEY (FK_Autor_ID, FK_Libros_ID),
    FOREIGN KEY (FK_Autor_ID) REFERENCES Autores(PK_Autor_ID),
    FOREIGN KEY (FK_Libros_ID) REFERENCES Libros(PK_Libros_ID)
);
GO
