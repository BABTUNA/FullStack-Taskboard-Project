INSERT INTO users (name, email, password_hash)
VALUES ('Demo User', 'demo@example.com', '$2a$10$development.hash.placeholder');

INSERT INTO tasks (owner_id, title, description, status, priority)
SELECT id, 'Plan the first sprint', 'Break the project into small tasks.', 'doing', 'high'
FROM users WHERE email = 'demo@example.com';

INSERT INTO tasks (owner_id, title, status, priority)
SELECT id, 'Write project notes', 'todo', 'normal'
FROM users WHERE email = 'demo@example.com';
