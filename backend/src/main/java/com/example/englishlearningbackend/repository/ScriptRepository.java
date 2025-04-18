package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
    Optional<Script> findByEngTitle(String engTitle);
    
    @Query("SELECT s FROM Script s LEFT JOIN FETCH s.scriptMappings sm LEFT JOIN FETCH sm.sentence WHERE s.id = :scriptId")
    Optional<Script> findByIdWithSentences(Long scriptId);
    
    @Query("SELECT s FROM Script s LEFT JOIN FETCH s.scriptMappings sm LEFT JOIN FETCH sm.sentence WHERE s.engTitle = :engTitle")

    Optional<Script> findByEngTitleWithSentences(String engTitle);
} 