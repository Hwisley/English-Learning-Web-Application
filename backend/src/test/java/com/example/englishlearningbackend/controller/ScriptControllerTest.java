package com.example.englishlearningbackend.controller;

// import com.example.englishlearningbackend.entity.Script;
import com.example.englishlearningbackend.entity.SourceType;
import com.example.englishlearningbackend.dto.ScriptsBySourceTypeDto;
import com.example.englishlearningbackend.repository.ScriptRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScriptController.class)
public class ScriptControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ScriptRepository scriptRepository;
    
    @Test
    @DisplayName("SourceType별 스크립트 조회 - 성공 케이스")
    public void getAllScripts_success() throws Exception {
        SourceType sourceType = new SourceType();
        sourceType.setId(1L);
        sourceType.setAlias("TEST_YOUTUBE");
        sourceType.setHomeUrl("https://www.youtube.com/");

        // 테스트 데이터 준비
        ScriptsBySourceTypeDto script1 = new ScriptsBySourceTypeDto(1L, "Test Script 1", "https://youtu.be/KGcna7MdIho?feature=shared");
        // script1.setId(1L);
        // script1.setOriginalTitle("Test Script 1");
        // // script1.setAliasTitle("Test Script 1");
        // script1.setVideoUrl("https://youtu.be/KGcna7MdIho?feature=shared");
        // script1.setSourceType(sourceType);
        
        ScriptsBySourceTypeDto script2 = new ScriptsBySourceTypeDto(2L, "Test Script 2", "https://youtu.be/KGcna7MdIho?feature=shared");
        // script2.setId(2L);
        // script2.setOriginalTitle("Test Script 2");
        // // script2.setAliasTitle("Test Script 2");
        // script2.setVideoUrl("https://youtu.be/KGcna7MdIho?feature=shared");
        // script2.setSourceType(sourceType);
        
        List<ScriptsBySourceTypeDto> scripts = Arrays.asList(script1, script2);
        
        // Mock 동작 설정
        when(scriptRepository.findBySourceType("TEST_YOUTUBE")).thenReturn(scripts);
        
        // API 호출 및 결과 검증
        mockMvc.perform(get("/api/contents?sourceType=TEST_YOUTUBE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].originalTitle").value("Test Script 1"))
                .andExpect(jsonPath("$[0].videoUrl").value("https://youtu.be/KGcna7MdIho?feature=shared"))
                // .andExpect(jsonPath("$[0].aliasTitle").value("테스트 스크립트 1"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].originalTitle").value("Test Script 2"))
                .andExpect(jsonPath("$[1].videoUrl").value("https://youtu.be/KGcna7MdIho?feature=shared"));
                // .andExpect(jsonPath("$[1].aliasTitle").value("테스트 스크립트 2"));
    }
    
    // @Test
    // @DisplayName("ID로 스크립트 조회 - 성공 케이스")
    // public void getScriptById_success() throws Exception {
    //     mockMvc.perform(get("/api/scripts/1"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.id").value(1))
    //             .andExpect(jsonPath("$.originalTitle").exists())
    //             .andExpect(jsonPath("$.aliasTitle").exists());
    // }
}
