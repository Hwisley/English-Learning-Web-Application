INSERT INTO source_type (alias) VALUES ('ybm-cnn');

INSERT INTO script (original_title, alias_title, source_type) 
SELECT 'UN Climate Change', '유엔 기후 변화', id 
FROM source_type 
WHERE alias = 'TEST-ybm-cnn';

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('The United Nations called for immediate action on climate change.', 
        '유엔은 기후 변화에 대한 즉각적인 조치를 촉구했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 0 
FROM script 
WHERE original_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Global temperatures have risen at an alarming rate in the past decade.',
        '지난 10년간 전 세계 기온이 놀라운 속도로 상승했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 1 
FROM script 
WHERE original_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Many countries have pledged to reduce carbon emissions by 2030.',
        '많은 국가들이 2030년까지 탄소 배출량을 줄이기로 약속했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 2 
FROM script 
WHERE original_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Experts warn that we may soon reach a tipping point.',
        '전문가들은 우리가 곧 티핑 포인트에 도달할 수 있다고 경고한다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 3 
FROM script 
WHERE original_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Renewable energy sources are becoming increasingly affordable.',
        '재생 에너지 원이 점점 더 저렴해지고 있다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 4 
FROM script 
WHERE original_title = 'UN Climate Change'; 