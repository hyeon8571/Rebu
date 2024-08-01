
INSERT INTO member (email, password, birth, reg_date, gender, name, status)
VALUES ('zx8571@naver.com', 'shvhsy8571@', '1999-06-19', NOW(), 'MALE', '원승현', 'ROLE_NORMAL');

INSERT INTO profile (nickname, member_id, type, image_src, introduction, recent_time, phone, is_private, status)
VALUES ('seunghyeon123', 1, 'COMMON', 'http://example.com/profile.jpg', 'Hello, I am John Doe.', NOW(), '010-8591-4442', FALSE, 'ROLE_NORMAL');
