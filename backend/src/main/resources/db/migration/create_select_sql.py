import csv
import os

# CSV 파일 경로 설정
csv_file_path = '../phrasal_verbs_merged_full.csv'

# 출력 파일 경로 설정
output_file = 'select_words.sql'

# CSV 파일 읽기 및 SQL 생성
with open(csv_file_path, 'r', encoding='utf-8') as csvfile, \
     open(output_file, 'w', encoding='utf-8') as sqlfile:
    
    # SQL 헤더 작성
    sqlfile.write('-- Select words from the word table\n')
    sqlfile.write('SELECT word as phrasal_verb\n')
    sqlfile.write('FROM word\n')
    sqlfile.write('WHERE is_phrasal_verb = 1\n')
    sqlfile.write('ORDER BY word;\n')

print(f"SQL 스크립트가 생성되었습니다: {output_file}") 