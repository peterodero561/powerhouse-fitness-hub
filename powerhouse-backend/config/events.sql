INSERT INTO "Events" ("id", "title", "date", "status", "image", "description", "createdAt", "updatedAt", "deletedAt")
VALUES
  (1, 'Weightlifting Championship', '2025-04-01', 'previous', 'summer-challenge.jpg',
   'Join us for chest, squats and deadlift', '2025-03-20 11:45:21', '2025-06-20 11:45:21', NULL),
  (2, 'Weightlifting Championship', '2025-08-24', 'previous', 'weightlifting.jpg',
   'Join us for chest, shoulder, squats and deadlift', '2025-07-12 11:45:21', '2025-06-20 11:45:21', NULL)
ON CONFLICT (id) DO NOTHING;
