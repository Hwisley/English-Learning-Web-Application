package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.Script;
import com.example.englishlearningbackend.dto.ScriptsBySourceTypeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {

    @Query("SELECT new com.example.englishlearningbackend.dto.ScriptsBySourceTypeDto(s.id, s.originalTitle, s.videoUrl) FROM Script s WHERE s.sourceType.alias = :alias")
    List<ScriptsBySourceTypeDto> findBySourceType(String alias);

    // Optional<Script> findByOriginalTitle(String originalTitle);
    
    // @Query("SELECT s FROM Script s LEFT JOIN FETCH s.scriptMappings sm LEFT JOIN FETCH sm.sentence WHERE s.id = :scriptId")
    // Optional<Script> findByIdWithSentences(Long scriptId);
    
    // @Query("SELECT s FROM Script s LEFT JOIN FETCH s.scriptMappings sm LEFT JOIN FETCH sm.sentence WHERE s.originalTitle = :originalTitle")
    // Optional<Script> findByOriginalTitleWithSentences(String originalTitle);
} 