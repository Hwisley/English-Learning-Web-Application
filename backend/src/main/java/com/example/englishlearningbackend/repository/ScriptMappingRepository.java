package com.example.englishlearningbackend.repository;

import com.example.englishlearningbackend.entity.ScriptMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptMappingRepository extends JpaRepository<ScriptMapping, Long> {
    
    List<ScriptMapping> findByScriptIdOrderByOrder(Long scriptId);
} 