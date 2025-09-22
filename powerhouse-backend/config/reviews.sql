INSERT INTO "Reviews" ("name", "rating", "image", "message", "is_top", "createdAt", "updatedAt")
VALUES
  ('Peter Odero',     5, 'peter-odero.jpg',
   'Fantastic program — I saw consistent progress in my lifts and the coaches are top-tier. Highly recommend!',
   true, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Manpushup',       4, 'manpushup.jpg',
   'Great classes and friendly trainers. The group sessions pushed me to improve my form and endurance.',
   false, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Omosh',           5, 'omosh.jpg',
   'Amazing environment — equipment is clean and the training plans are effective. I hit personal bests in weeks!',
   true, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Moses Makotsi',   4, 'moses-makotsi.jpg',
   'Well-structured classes and excellent support from trainers. Worth every shilling.',
   false, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Sammy ZK',        5, 'sammy-zk.jpg',
   'The aerobics program keeps me motivated and fit — friendly coaches and a welcoming community.',
   true, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Aisha N.',        5, 'aisha-n.jpg',
   'Loved the variety and energy of the sessions. I feel stronger and more confident than ever.',
   false, '2025-09-19 10:00:00', '2025-09-19 10:00:00')
ON CONFLICT DO NOTHING;
