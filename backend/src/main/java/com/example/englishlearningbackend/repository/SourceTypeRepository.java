package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.SourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SourceTypeRepository extends JpaRepository<SourceType, Long> {
    Optional<SourceType> findByAlias(String alias);
} 