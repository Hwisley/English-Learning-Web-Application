INSERT INTO source_type (alias) VALUES ('TEST-lv-academy-toddler');

INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] Toddler English Class', 'https://i.ytimg.com/vi/sample4/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'TEST-lv-academy-toddler'));

INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] Toddler English Class', 'https://i.ytimg.com/vi/sample4/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'TEST-lv-academy-toddler'));
