-- Drop existing tables (drop in reverse order due to foreign key constraints)
DROP TABLE IF EXISTS script_mapping;
DROP TABLE IF EXISTS script;
DROP TABLE IF EXISTS word_sentence_mapping;
DROP TABLE IF EXISTS sentence;
DROP TABLE IF EXISTS meaning;
DROP TABLE IF EXISTS word;
DROP TABLE IF EXISTS source_type;

-- Create table: word
CREATE TABLE word (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    is_phrasal_verb TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create table: meaning
CREATE TABLE meaning (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    word_id BIGINT NOT NULL,
    meaning VARCHAR(255) NOT NULL,
    extra_meaning VARCHAR(255),
    word_class VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES word(id) ON DELETE CASCADE
);

-- Create table: sentence
CREATE TABLE sentence (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    eng_sentence TEXT NOT NULL,
    kor_sentence TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create table: word_sentence_mapping
CREATE TABLE word_sentence_mapping (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    word_id BIGINT NOT NULL,
    sentence_id BIGINT NOT NULL,
    FOREIGN KEY (word_id) REFERENCES word(id) ON DELETE CASCADE,
    FOREIGN KEY (sentence_id) REFERENCES sentence(id) ON DELETE CASCADE
);

-- Create table: source_type
CREATE TABLE source_type (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(255) NOT NULL,
    home_url VARCHAR(2048)
);

-- Create table: script
CREATE TABLE script (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(2048),
    source_type BIGINT,
    FOREIGN KEY (source_type) REFERENCES source_type(id)
);

-- Create table: script_mapping
CREATE TABLE script_mapping (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    script_id BIGINT NOT NULL,
    sentence_id BIGINT NOT NULL,
    `order` INT NOT NULL,
    FOREIGN KEY (script_id) REFERENCES script(id) ON DELETE CASCADE,
    FOREIGN KEY (sentence_id) REFERENCES sentence(id) ON DELETE CASCADE
);

