package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.Sentence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceRepository extends JpaRepository<Sentence, Long> {
} 