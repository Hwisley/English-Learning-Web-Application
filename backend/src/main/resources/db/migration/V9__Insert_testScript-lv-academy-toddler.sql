INSERT INTO source_type (alias) VALUES ('lv-academy-toddler');

INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] custom Toddler English Class', 'https://i.ytimg.com/vi/sample4/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'lv-academy-toddler'));

INSERT INTO script (original_title, video_url, source_type) 
VALUES 
('[LIVE] custom Toddler English Class', 'https://i.ytimg.com/vi/sample4/hqdefault.jpg', (SELECT id FROM source_type WHERE alias = 'lv-academy-toddler'));
