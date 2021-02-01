USE [master]
GO
IF db_id('DiscStats') IS NULL
  CREATE DATABASE [DiscStats]
GO
USE [DiscStats]
GO

DROP TABLE IF EXISTS [Shot];
DROP TABLE IF EXISTS [Scorecard];
DROP TABLE IF EXISTS [Hole];
DROP TABLE IF EXISTS [Course];
DROP TABLE IF EXISTS [Disc];
DROP TABLE IF EXISTS [DiscType];
DROP TABLE IF EXISTS [Conditions];
DROP TABLE IF EXISTS [ShotType];
DROP TABLE IF EXISTS [ShotRange];
DROP TABLE IF EXISTS [ShotSelection];
DROP TABLE IF EXISTS [QualityOfShot];
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Email] nvarchar(200) NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL
)
GO

CREATE TABLE [Scorecard] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [CourseId] integer NOT NULL,
  [ConditionsId] integer NOT NULL,
  [UserId] integer NOT NULL
)
GO

CREATE TABLE [Conditions] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Course] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Location] nvarchar(200) NOT NULL,
  [Description] nvarchar(500)
)
GO

CREATE TABLE [Hole] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Number] integer NOT NULL,
  [Par] integer NOT NULL,
  [Distance] integer NOT NULL,
  [CourseId] integer NOT NULL
)
GO

CREATE TABLE [Shot] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [ScorecardId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [HoleId] integer NOT NULL,
  [QualityOfShotId] integer NOT NULL,
  [DiscId] integer NOT NULL,
  [ShotRangeId] integer NOT NULL,
  [ShotTypeId] integer NOT NULL,
  [ShotSelectionId] integer NOT NULL,
  [IsObstructed] bit NOT NULL
)
GO

CREATE TABLE [ShotType] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [ShotRange] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL,
)
GO

CREATE TABLE [ShotSelection] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [QualityOfShot] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Disc] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserId] integer NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Weight] integer,
  [Plastic] nvarchar(50),
  [DiscTypeId] integer NOT NULL
)
GO

CREATE TABLE [DiscType] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Label] nvarchar(50) NOT NULL
)
GO

ALTER TABLE [Scorecard] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Scorecard] ADD FOREIGN KEY ([CourseId]) REFERENCES [Course] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([ScorecardId]) REFERENCES [Scorecard] ([Id])
GO

ALTER TABLE [Scorecard] ADD FOREIGN KEY ([ConditionsId]) REFERENCES [Conditions] ([Id])
GO

ALTER TABLE [Hole] ADD FOREIGN KEY ([CourseId]) REFERENCES [Course] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([HoleId]) REFERENCES [Hole] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([QualityOfShotId]) REFERENCES [QualityOfShot] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([DiscId]) REFERENCES [Disc] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([ShotRangeId]) REFERENCES [ShotRange] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([ShotTypeId]) REFERENCES [ShotType] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([ShotSelectionId]) REFERENCES [ShotSelection] ([Id])
GO

ALTER TABLE [Disc] ADD FOREIGN KEY ([DiscTypeId]) REFERENCES [DiscType] ([Id])
GO

ALTER TABLE [Shot] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Disc] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO