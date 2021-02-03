SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
  ([Id], [Name], [Email], [FirebaseUserId])
VALUES 
  (1, 'Rick', 'rick@mail.com', 'ziDhK8laHaMNnRGckNdUB9mQvqV2'),
  (2, 'Morgan', 'morgan@mail.com', 'GnBP8stdEnNEVQJZQ9QAL7C3BAq1');
SET IDENTITY_INSERT [User] OFF


SET IDENTITY_INSERT [Conditions] ON
INSERT INTO [Conditions]
  ([Id], [Label])
VALUES
  (1, 'Calm'),
  (2, 'Windy'),
  (3, 'Rainy'),
  (4, 'Snowy');
SET IDENTITY_INSERT [Conditions] OFF


SET IDENTITY_INSERT [Course] ON
INSERT INTO [Course]
  ([Id], [Name], [Location], [Description])
VALUES
  (1, 'Two Rivers', 'Nashville, TN', 'Open course that has a lot of elevation change.'),
  (2, 'Seven Oaks', 'Nashville, TN', 'While this course is mostly wooded, there are some open holes. Regardless, the fairways tend to stay relatively open throughout.'),
  (3, 'Cedar Hill', 'Nashville, TN', 'Technical course that demands both distance and the ability to navigate through its tightly wooded fairways.');
SET IDENTITY_INSERT [Course] OFF


SET IDENTITY_INSERT [Scorecard] ON
INSERT INTO [Scorecard]
  ([Id], [CourseId], [UserId], [ConditionsId], [CreateDateTime])
VALUES
  (1, 1, 1, 2, '06-22-2020'),
  (2, 2, 1, 1, '08-23-2020');
SET IDENTITY_INSERT [Scorecard] OFF


SET IDENTITY_INSERT [Hole] ON
INSERT INTO [Hole]
  ([Id], [Number], [Par], [Distance], [CourseId])
VALUES
  (1, 1, 4, 433, 1),
  (2, 2, 3, 305, 1),
  (3, 3, 4, 614, 1),
  (4, 4, 3, 239, 1),
  (5, 5, 3, 345, 1),
  (6, 6, 3, 310, 1),
  (7, 7, 3, 367, 1),
  (8, 8, 3, 259, 1),
  (9, 9, 3, 337, 1),
  (10, 10, 3, 239, 1),
  (11, 11, 3, 335, 1),
  (12, 12, 4, 423, 1),
  (13, 13, 3, 343, 1),
  (14, 14, 3, 385, 1),
  (15, 15, 3, 213, 1),
  (16, 16, 3, 307, 1),
  (17, 17, 3, 311, 1),
  (18, 18, 3, 307, 1),
  (19, 1, 3, 277, 2),
  (20, 2, 3, 373, 2),
  (21, 3, 3, 309, 2),
  (22, 4, 3, 207, 2),
  (23, 5, 3, 234, 2),
  (24, 6, 3, 258, 2),
  (25, 7, 3, 236, 2),
  (26, 8, 3, 296, 2),
  (27, 9, 3, 313, 2),
  (28, 10, 3, 300, 2),
  (29, 11, 3, 219, 2),
  (30, 12, 3, 251, 2),
  (31, 13, 3, 331, 2),
  (32, 14, 3, 410, 2),
  (33, 15, 3, 301, 2),
  (34, 16, 3, 314, 2),
  (35, 17, 3, 264, 2),
  (36, 18, 4, 427, 2),
  (37, 1, 4, 445, 3),
  (38, 2, 4, 322, 3),
  (39, 3, 3, 341, 3),
  (40, 4, 3, 267, 3),
  (41, 5, 3, 199, 3),
  (42, 6, 3, 228, 3),
  (43, 7, 4, 627, 3),
  (44, 8, 3, 287, 3),
  (45, 9, 3, 378, 3),
  (46, 10, 3, 291, 3),
  (47, 11, 3, 269, 3),
  (48, 12, 3, 331, 3),
  (49, 13, 3, 258, 3),
  (50, 14, 3, 329, 3),
  (51, 15, 4, 605, 3),
  (52, 16, 3, 319, 3),
  (53, 17, 3, 427, 3),
  (54, 18, 4, 509, 3);
SET IDENTITY_INSERT [Hole] OFF


SET IDENTITY_INSERT [ShotType] ON
INSERT INTO [ShotType]
  ([Id], [Label])
VALUES
  (1, 'Backhand'),
  (2, 'Forehand'),
  (3, 'Grenade'),
  (4, 'Thumber'),
  (5, 'Hammer');
SET IDENTITY_INSERT [ShotType] OFF


SET IDENTITY_INSERT [ShotRange] ON
INSERT INTO [ShotRange]
  ([Id], [Label])
VALUES
  (1, 'Drive'),
  (2, 'Fairway Drive'),
  (3, 'Approach'),
  (4, 'Putt'),
  (5, 'Pitch Out'),
  (6, 'Tap In');
SET IDENTITY_INSERT [ShotRange] OFF


SET IDENTITY_INSERT [ShotSelection] ON
INSERT INTO [ShotSelection]
  ([Id], [Label])
VALUES
  (1, 'Hyzer'),
  (2, 'Turnover'),
  (3, 'Flex'),
  (4, 'Straight'),
  (5, 'Spike Hyzer'),
  (6, 'Hyzerflip'),
  (7, 'Roller'),
  (8, 'Other');
SET IDENTITY_INSERT [ShotSelection] OFF


SET IDENTITY_INSERT [QualityOfShot] ON
INSERT INTO [QualityOfShot]
  ([Id], [Label])
VALUES
  (1, 'Good'),
  (2, 'Average'),
  (3, 'Bad');
SET IDENTITY_INSERT [QualityOfShot] OFF


SET IDENTITY_INSERT [DiscType] ON
INSERT INTO [DiscType]
  ([Id], [Label])
VALUES
  (1, 'Distance Driver'),
  (2, 'Fairway Driver'),
  (3, 'Midrange'),
  (4, 'Putter'),
  (5, 'Utility');
SET IDENTITY_INSERT [DiscType] OFF


SET IDENTITY_INSERT [Disc] ON
INSERT INTO [Disc]
  ([Id], [Name], [Weight], [Plastic], [DiscTypeId], [UserId], [IsActive])
VALUES
  (1, 'Discraft Buzz', 180, 'ESP', 3, 1, 1),
  (2, 'Discmania Link', 175, 'Exo Hard', 4, 1, 1),
  (3, 'Discmania Link', 173, 'Exo Soft', 4, 1, 1),
  (4, 'Discraft Surge', 172, 'ESP', 1, 1, 1),
  (5, 'Discmania FD', 175, 'S-Line', 2, 1, 1),
  (6, 'Innova Teebird', 174, 'Champion', 2, 1, 1),
  (7, 'Innova Firebird', 173, 'Champion Glow', 5, 1, 1),
  (8, 'Innova Destroyer', 175, 'Star', 1, 1, 1),
  (9, 'Discraft Meteor', 177, 'Z', 3, 1, 1),
  (10, 'Discraft Zone', 178, 'ESP', 4, 1, 1),
  (11, 'Innova Sidewinder', 174, 'Champion', 2, 1, 1),
  (12, 'Gateway Journey', 167, 'Diamond', 1, 1, 1);
SET IDENTITY_INSERT [Disc] OFF


SET IDENTITY_INSERT [Shot] ON
INSERT INTO [Shot]
  ([Id], [ScorecardId], [UserId], [HoleId], [QualityOfShotId], [DiscId], [ShotRangeId], [ShotTypeId], [ShotSelectionId], [IsObstructed])
VALUES
  (1, 1, 1, 1, 1, 4, 1, 1, 3, 0),
  (2, 1, 1, 1, 3, 2, 3, 1, 1, 0),
  (3, 1, 1, 1, 2, 3, 4, 1, 4, 0),
  (4, 1, 1, 1, 1, 3, 4, 1, 4, 0),
  (5, 1, 1, 2, 1, 5, 1, 1, 1, 0),
  (6, 1, 1, 2, 1, 3, 4, 1, 4, 0),
  (7, 1, 1, 3, 1, 1, 1, 1, 3, 0),
  (8, 1, 1, 3, 1, 11, 2, 2, 2, 0),
  (9, 1, 1, 3, 1, 3, 4, 1, 4, 0),
  (10, 1, 1, 4, 1, 4, 1, 1, 5, 0),
  (11, 1, 1, 4, 1, 3, 4, 1, 4, 0),
  (12, 1, 1, 5, 2, 4, 1, 1, 3, 0),
  (13, 1, 1, 5, 2, 2, 3, 1, 4, 0),
  (14, 1, 1, 5, 1, 3, 4, 1, 4, 0),
  (15, 1, 1, 6, 1, 4, 1, 1, 1, 0),
  (16, 1, 1, 6, 1, 2, 3, 1, 1, 0),
  (17, 1, 1, 6, 2, 3, 4, 1, 4, 0),
  (18, 1, 1, 7, 3, 4, 1, 2, 3, 0),
  (19, 1, 1, 7, 1, 1, 3, 1, 4, 0),
  (20, 1, 1, 7, 1, 3, 4, 1, 4, 0),
  (21, 1, 1, 8, 2, 8, 1, 1, 1, 0),
  (22, 1, 1, 8, 1, 2, 3, 1, 4, 0),
  (23, 1, 1, 8, 1, 3, 4, 1, 4, 0),
  (24, 1, 1, 9, 2, 4, 1, 1, 3, 0),
  (25, 1, 1, 9, 2, 2, 3, 1, 4, 0),
  (26, 1, 1, 9, 2, 3, 4, 1, 1, 0),
  (27, 1, 1, 10, 1, 1, 1, 1, 1, 0),
  (28, 1, 1, 10, 1, 3, 4, 1, 4, 0),
  (29, 1, 1, 11, 3, 4, 1, 1, 1, 0),
  (30, 1, 1, 11, 2, 8, 2, 2, 1, 1),
  (31, 1, 1, 11, 1, 3, 4, 1, 4, 0),
  (32, 1, 1, 12, 1, 4, 1, 1, 1, 0),
  (33, 1, 1, 12, 3, 5, 3, 1, 4, 0),
  (34, 1, 1, 12, 3, 3, 4, 1, 2, 0),
  (35, 1, 1, 12, 2, 3, 4, 1, 4, 0),
  (36, 1, 1, 13, 1, 4, 1, 1, 3, 0),
  (37, 1, 1, 13, 2, 3, 4, 1, 4, 0),
  (38, 1, 1, 13, 1, 3, 4, 1, 4, 0),
  (39, 1, 1, 14, 1, 4, 1, 1, 3, 0),
  (40, 1, 1, 14, 1, 2, 3, 1, 4, 0),
  (41, 1, 1, 14, 1, 3, 4, 1, 4, 0),
  (42, 1, 1, 15, 2, 4, 1, 1, 1, 0),
  (43, 1, 1, 15, 3, 3, 4, 1, 4, 0),
  (44, 1, 1, 15, 1, 3, 4, 1, 4, 0),
  (45, 1, 1, 16, 1, 4, 1, 2, 1, 0),
  (46, 1, 1, 16, 2, 3, 4, 1, 4, 0),
  (47, 1, 1, 16, 2, 3, 4, 1, 4, 0),
  (48, 1, 1, 17, 1, 4, 1, 1, 7, 0),
  (49, 1, 1, 17, 1, 3, 4, 1, 4, 0),
  (50, 1, 1, 18, 2, 5, 1, 1, 1, 0),
  (51, 1, 1, 18, 2, 3, 4, 1, 4, 0),
  (52, 1, 1, 18, 2, 3, 4, 1, 4, 0),
  (53, 2, 1, 19, 1, 4, 1, 2, 1, 0),
  (54, 2, 1, 19, 1, 3, 4, 1, 4, 0),
  (55, 2, 1, 20, 1, 12, 1, 1, 2, 0),
  (56, 2, 1, 20, 1, 3, 4, 1, 4, 0),
  (57, 2, 1, 21, 1, 5, 1, 1, 4, 0),
  (58, 2, 1, 21, 1, 3, 4, 1, 4, 0),
  (59, 2, 1, 22, 1, 1, 1, 1, 1, 0),
  (60, 2, 1, 22, 2, 3, 4, 1, 4, 0),
  (61, 2, 1, 23, 2, 5, 1, 1, 4, 0),
  (62, 2, 1, 23, 3, 10, 3, 2, 3, 1),
  (63, 2, 1, 23, 2, 3, 4, 1, 1, 0),
  (64, 2, 1, 23, 1, 3, 4, 1, 4, 0),
  (65, 2, 1, 24, 2, 9, 1, 1, 2, 0),
  (66, 2, 1, 24, 2, 10, 3, 2, 2, 1),
  (67, 2, 1, 24, 2, 3, 4, 1, 4, 0),
  (68, 2, 1, 24, 1, 3, 4, 1, 4, 0),
  (69, 2, 1, 25, 1, 2, 1, 1, 4, 0),
  (70, 2, 1, 25, 2, 3, 4, 1, 4, 0),
  (71, 2, 1, 26, 2, 9, 1, 1, 2, 0),
  (72, 2, 1, 26, 1, 2, 3, 1, 1, 1),
  (73, 2, 1, 26, 1, 3, 4, 1, 4, 0),
  (74, 2, 1, 27, 2, 4, 1, 1, 3, 0),
  (75, 2, 1, 27, 2, 2, 3, 1, 2, 1),
  (76, 2, 1, 27, 1, 3, 4, 1, 4, 0),
  (77, 2, 1, 28, 3, 5, 1, 1, 6, 0),
  (78, 2, 1, 28, 2, 1, 2, 1, 1, 1),
  (79, 2, 1, 28, 2, 3, 4, 1, 4, 0),
  (80, 2, 1, 28, 1, 3, 4, 1, 4, 0),
  (81, 2, 1, 29, 1, 9, 1, 1, 6, 0),
  (82, 2, 1, 29, 1, 3, 4, 1, 1, 1),
  (83, 2, 1, 30, 2, 1, 1, 1, 1, 0),
  (84, 2, 1, 30, 2, 2, 3, 1, 1, 0),
  (85, 2, 1, 30, 1, 3, 4, 1, 4, 0),
  (86, 2, 1, 31, 1, 4, 1, 1, 3, 0),
  (87, 2, 1, 31, 1, 3, 4, 1, 4, 0),
  (88, 2, 1, 32, 2, 4, 1, 1, 3, 0),
  (89, 2, 1, 32, 3, 2, 3, 1, 4, 0),
  (90, 2, 1, 32, 2, 2, 3, 1, 1, 1),
  (91, 2, 1, 32, 2, 3, 4, 1, 4, 0),
  (92, 2, 1, 33, 2, 8, 1, 2, 3, 0),
  (93, 2, 1, 33, 2, 2, 3, 1, 2, 0),
  (94, 2, 1, 33, 1, 3, 4, 1, 4, 0),
  (95, 2, 1, 34, 3, 4, 1, 1, 3, 0),
  (96, 2, 1, 34, 2, 11, 2, 2, 2, 1),
  (97, 2, 1, 34, 2, 3, 4, 1, 4, 0),
  (98, 2, 1, 34, 2, 3, 4, 1, 4, 0),
  (99, 2, 1, 35, 1, 4, 1, 2, 3, 0),
  (100, 2, 1, 35, 1, 3, 4, 1, 4, 0),
  (101, 2, 1, 36, 1, 12, 1, 1, 2, 0),
  (102, 2, 1, 36, 1, 10, 3, 2, 3, 0),
  (103, 2, 1, 36, 3, 3, 4, 1, 4, 0),
  (104, 2, 1, 36, 2, 3, 4, 1, 4, 0);
SET IDENTITY_INSERT [Shot] OFF