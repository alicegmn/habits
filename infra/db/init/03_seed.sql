-- Test user
INSERT INTO users (email, password)
VALUES ('alice@example.com', '$2a$10$KIXl2fS2pZx7vHk7Yc6wuOlYz3lF3z2nG7vVt6exj6lzN2nqW8XcK') 
ON CONFLICT (email) DO NOTHING;
-- Password is "password" hashed with bcrypt

-- Test habits connected to user with user with (id = 1)
INSERT INTO habits (user_id, title, description, frequency)
VALUES
  (1, 'Morning Run', 'Run 5 km every morning', 'daily'),
  (1, 'Read Book', 'Read 20 pages before bed', 'daily'),
  (1, 'Weekly Planning', 'Plan the week every Sunday evening', 'weekly')
ON CONFLICT DO NOTHING;
