package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
    
    Optional<Script> findByEngTitle(String engTitle);
    
    @Query("SELECT DISTINCT s FROM Script s JOIN FETCH s.scriptMappings sm JOIN FETCH sm.sentence WHERE s.id = :id")
    Optional<Script> findByIdWithSentences(Long id);
    
    @Query("SELECT DISTINCT s FROM Script s JOIN FETCH s.scriptMappings sm JOIN FETCH sm.sentence WHERE s.engTitle = :engTitle")
    Optional<Script> findByEngTitleWithSentences(String engTitle);
} 