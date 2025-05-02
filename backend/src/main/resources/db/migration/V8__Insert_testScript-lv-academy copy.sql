INSERT INTO source_type (alias) VALUES ('lv-academy');

INSERT INTO script (original_title, video_url, source_type) 
VALUES ('[LIVE] custom Live Academy English Class', 'https://i.ytimg.com/vi/sample1/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'TEST-lv-academy'));



INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] custom Advanced English Lesson', 'https://i.ytimg.com/vi/sample2/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'TEST-lv-academy'));

INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] custom Advanced English Lesson', 'https://i.ytimg.com/vi/sample2/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'TEST-lv-academy'));

