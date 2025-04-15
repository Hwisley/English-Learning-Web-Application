import csv
import os

# CSV 파일 경로 설정
csv_file_path = "../phrasal_verbs_merged_full.csv"

# 출력 파일 경로 설정
output_dir = "./"
sentence_sql_file = os.path.join(output_dir, "V4__insert_sentence.sql")
mapping_sql_file = os.path.join(output_dir, "V5__insert_word_sentence_mapping.sql")

# 각 단어의 ID를 추적하는 딕셔너리
word_ids = {}

# SQL 파일 생성
with open(csv_file_path, 'r', encoding='utf-8') as csv_file, \
     open(sentence_sql_file, 'w', encoding='utf-8') as sentence_file, \
     open(mapping_sql_file, 'w', encoding='utf-8') as mapping_file:
    
    # CSV 파일 읽기
    csv_reader = csv.DictReader(csv_file)
    
    # sentence SQL 파일 헤더 작성
    sentence_file.write("-- Insert sentences into the sentence table\n")
    sentence_file.write("INSERT INTO sentence (eng_sentence, kor_sentence) VALUES\n")
    
    # mapping SQL 파일 헤더 작성
    mapping_file.write("-- Insert word-sentence mappings into the word_sentence_mapping table\n")
    mapping_file.write("INSERT INTO word_sentence_mapping (word_id, sentence_id) VALUES\n")
    
    sentences = []
    mappings = []
    sentence_id = 1
    
    for i, row in enumerate(csv_reader):
        if row['eng_example'] and row['kor_example']:
            # 문장 데이터 추가
            eng_sentence = row['eng_example'].replace("'", "''")  # SQL 문자열 이스케이프
            kor_sentence = row['kor_example'].replace("'", "''")
            
            sentences.append(f"('{eng_sentence}', '{kor_sentence}')")
            
            # 단어와 문장 매핑 데이터 추가
            word = row['phrasal_verb']
            
            # word_id 찾기 위한 SQL 참조 작성
            mappings.append(f"((SELECT id FROM word WHERE word = '{word}'), {sentence_id})")
            
            sentence_id += 1
    
    # 문장 데이터 SQL 작성
    sentence_file.write(",\n".join(sentences))
    sentence_file.write(";\n")
    
    # 매핑 데이터 SQL 작성
    mapping_file.write(",\n".join(mappings))
    mapping_file.write(";\n")

print(f"SQL 스크립트가 생성되었습니다: {sentence_sql_file}, {mapping_sql_file}") 