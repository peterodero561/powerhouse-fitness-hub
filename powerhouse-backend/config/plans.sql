INSERT INTO `plans`
  (`type`, `price`, `period`, `features`, `popular`, `createdAt`, `updatedAt`)
VALUES
  ('Weightlifting', '100',  'daily',
   '{"validity_days":1,"sessions_included":1,"access":"gym","trainer_access":true,"equipment":["barbells","plates", "machines"],"notes":"Drop-in access to weight area"}',
   0, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Weightlifting', '500',  'weekly',
   '{"validity_days":7,"sessions_included":6,"access":"gym","trainer_access":true,"equipment":["barbells","plates", "machines"],"notes":"Drop-in access to weight area"}',
   0, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Weightlifting', '2000', 'monthly',
   '{"validity_days":30,"sessions_included":24,"access":"gym","trainer_access":true,"equipment":["barbells","plates", "machines"],"notes":"Drop-in access to weight area"}',
   1, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Aerobics',      '120',  'daily',
   '{"validity_days":1,"sessions_included":1,"access":"studio","trainer_access":true,"equipment":["mat", "barbells","plates", "machines"],"notes":"Drop-in aerobics class"}',
   0, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Aerobics',      '600',  'weekly',
   '{"validity_days":7,"sessions_included":5,"access":"studio","trainer_access":true,"equipment":["mat", "barbells","plates", "machines"],"notes":"Drop-in aerobics class"}',
   0, '2025-09-19 10:00:00', '2025-09-19 10:00:00'),

  ('Aerobics',      '2400', 'monthly',
   '{"validity_days":30,"sessions_included":12,"access":"studio","trainer_access":true,"equipment":["mat", "barbells","plates", "machines"],"notes":"Drop-in aerobics class"}',
   1, '2025-09-19 10:00:00', '2025-09-19 10:00:00');