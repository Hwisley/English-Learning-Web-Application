-- V7 마이그레이션 실패를 복구합니다
-- 먼저 기존 실패한 마이그레이션 상태를 확인하고 성공 상태로 표시합니다
UPDATE flyway_schema_history SET success = 1 WHERE version = '7' AND success = 0;

-- Script 테이블의 데이터를 재삽입하기 전에 관련 데이터를 삭제합니다
DELETE FROM script_mapping WHERE script_id IN (SELECT id FROM script WHERE eng_title = 'UN Climate Change');
DELETE FROM script WHERE eng_title = 'UN Climate Change';

-- 샘플 데이터 재삽입
INSERT INTO source_type (alias) VALUES ('Test data') ON DUPLICATE KEY UPDATE alias = alias;

INSERT INTO script (eng_title, kor_title, video_url, source_type) 
SELECT 'UN Climate Change', 'UN 기후 변화', 'https://www.youtube.com/watch?v=example', id 
FROM source_type WHERE alias = 'Test data'
LIMIT 1;

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('The United Nations called for immediate action on climate change.', '유엔은 기후 변화에 대한 즉각적인 조치를 촉구했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 0 FROM script WHERE eng_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Global temperatures have risen at an alarming rate in the past decade.', '지난 10년간 전 세계 기온이 놀라운 속도로 상승했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 1 FROM script WHERE eng_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Many countries have pledged to reduce carbon emissions by 2030.', '많은 국가들이 2030년까지 탄소 배출량을 줄이기로 약속했다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 2 FROM script WHERE eng_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Experts warn that we may soon reach a tipping point.', '전문가들은 우리가 곧 티핑 포인트에 도달할 수 있다고 경고한다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 3 FROM script WHERE eng_title = 'UN Climate Change'; 

INSERT INTO sentence (eng_sentence, kor_sentence) 
VALUES ('Renewable energy sources are becoming increasingly affordable.', '재생 에너지 원이 점점 더 저렴해지고 있다.');
INSERT INTO script_mapping(script_id, sentence_id, `order`) 
SELECT script.id, LAST_INSERT_ID(), 4 FROM script WHERE eng_title = 'UN Climate Change'; 