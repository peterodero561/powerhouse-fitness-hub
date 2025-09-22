INSERT INTO "Features" ("title", "description", "images", "createdAt", "updatedAt", "deletedAt")
VALUES
  ('Best Equipment',
   'State-of-the-art fitness equipment from the world''s leading manufacturers, maintained to perfection.',
   '["best-equipment.jpg"]',
   '2025-09-19 10:00:00', '2025-09-19 10:00:00', NULL),

  ('Expert Trainers',
   'Certified personal trainers with years of experience helping clients achieve their fitness goals.',
   '["expert-trainers.jpg"]',
   '2025-09-19 10:00:00', '2025-09-19 10:00:00', NULL),

  ('Tailored Sessions',
   'Personalized workout plans designed specifically for your fitness level and goals.',
   '["tailored-sessions.jpg"]',
   '2025-09-19 10:00:00', '2025-09-19 10:00:00', NULL),

  ('Group Classes',
   'Energetic group classes to keep you motivated — from aerobics to HIIT and more.',
   '["group-classes.jpg"]',
   '2025-09-19 10:00:00', '2025-09-19 10:00:00', NULL)
ON CONFLICT DO NOTHING;
