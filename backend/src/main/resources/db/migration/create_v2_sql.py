import csv
import os

# CSV 파일 경로 설정
csv_file_path = '../phrasal_verbs_merged_full.csv'

# 출력 파일 경로 설정
output_file = 'V2__insert_words.sql'

# CSV 파일 읽기 및 SQL 생성
with open(csv_file_path, 'r', encoding='utf-8') as csvfile, \
     open(output_file, 'w', encoding='utf-8') as sqlfile:
    
    # SQL 헤더 작성
    sqlfile.write('-- Insert words into the word table with INSERT IGNORE\n')
    sqlfile.write('INSERT IGNORE INTO word (word, is_phrasal_verb) VALUES\n')
    
    # CSV 파일 읽기
    reader = csv.DictReader(csvfile)
    rows = list(reader)  # 모든 행을 리스트로 저장
    
    # 마지막 행을 제외한 모든 행에 대해 콤마 추가
    for i, row in enumerate(rows[:-1]):
        word = row['phrasal_verb'].replace("'", "''")  # SQL 문자열 이스케이프
        sqlfile.write(f"('{word}', 1),\n")
    
    # 마지막 행은 콤마 없이 작성
    if rows:
        last_word = rows[-1]['phrasal_verb'].replace("'", "''")
        sqlfile.write(f"('{last_word}', 1);\n")

print(f"SQL 스크립트가 생성되었습니다: {output_file}") 