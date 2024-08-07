package com.rebu.menu.controller.dto;

import com.rebu.menu.dto.MenuUpdateDto;
import com.rebu.menu.validation.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuUpdateRequest {
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

    public MenuUpdateDto toDto(String profileNickname, Long menuId) {
        return MenuUpdateDto.builder()
            .title(this.title)
            .content(this.content)
            .price(this.price)
            .timeTaken(this.timeTaken)
            .category(this.category)
            .images(this.images)
            .profileNickname(profileNickname)
            .menuId(menuId)
            .build();
    }

}
