package com.rebu.menu.controller.dto;

import com.rebu.menu.dto.MenuCreateDto;
import com.rebu.menu.validation.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuCreateRequest {
    @Title
    private String title;
    @Content
    private String content;
    @Price
    private Integer price;
    @TimeTaken
    private Integer timeTaken;
    @Category
    private String category;
    @Images
    private List<MultipartFile> images;

    public MenuCreateDto toDto(String profileNickname){
         return MenuCreateDto.builder()
            .title(this.title)
            .content(this.content)
            .price(this.price)
            .timeTaken(this.timeTaken)
            .category(this.category)
            .images(this.images)
            .profileNickname(profileNickname)
            .build();
    }

}
