package com.example.englishlearningbackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.englishlearningbackend.dto.ScriptsBySourceTypeDto;
import com.example.englishlearningbackend.repository.ScriptRepository;

@RestController
public class ScriptController {
    
    private final ScriptRepository scriptRepository;
    
    public ScriptController(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
    }
    
    @GetMapping("/api/contents")
    public ResponseEntity<List<ScriptsBySourceTypeDto>> getScriptsBySourceType(@RequestParam String sourceType) {
        return ResponseEntity.ok(scriptRepository.findBySourceType(sourceType));
    }

    // @GetMapping
    // public ResponseEntity<List<Script>> getAllScripts() {
    //     return ResponseEntity.ok(scriptRepository.findAll());
    // }
    
    // @GetMapping("/{id}")
    // public ResponseEntity<Script> getScriptById(@PathVariable Long id) {
    //     // TDD 단계에서는 테스트를 통과하기 위한 최소한의 코드만 작성
    //     Script script = new Script();
    //     script.setId(id);
    //     script.setOriginalTitle("샘플 원본 제목");
    //     script.setAliasTitle("샘플 별칭 제목");
        
    //     return ResponseEntity.ok(script);
    }