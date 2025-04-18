-- 실패한 마이그레이션 상태를 확인합니다
SELECT * FROM english.flyway_schema_history;

-- 방법 1: 실패한 V7 마이그레이션 레코드를 삭제합니다
DELETE FROM english.flyway_schema_history WHERE version = '7';

-- 방법 2: 실패한 V7 마이그레이션 레코드의 상태를 성공으로 변경합니다
-- UPDATE english.flyway_schema_history SET success = 1 WHERE version = '7';

-- 변경사항 확인
SELECT * FROM english.flyway_schema_history; 