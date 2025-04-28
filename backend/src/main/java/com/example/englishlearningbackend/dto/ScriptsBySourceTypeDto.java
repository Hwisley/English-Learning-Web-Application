package com.example.englishlearningbackend.dto;

public class ScriptsBySourceTypeDto {
    private Long id;
    private String originalTitle;
    private String videoUrl;

    public ScriptsBySourceTypeDto() {}

    public ScriptsBySourceTypeDto(Long id, String originalTitle, String videoUrl) {
        this.id = id;
        this.originalTitle = originalTitle;
        this.videoUrl = videoUrl;
    }

    public Long getId() {
        return id;
    }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
