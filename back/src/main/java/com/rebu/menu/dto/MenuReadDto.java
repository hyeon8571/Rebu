package com.rebu.menu.dto;

import com.rebu.menu.entity.Menu;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MenuReadDto {
    private Long id;
    private String title;
    private String content;
    private Integer price;
    private Integer timeTaken;
    private String category;
    private List<String> images;

    public static MenuReadDto from(Menu menu, List<String> images) {
        return MenuReadDto.builder()
                .id(menu.getId())
                .title(menu.getTitle())
                .content(menu.getContent())
                .price(menu.getPrice())
                .timeTaken(menu.getTimeTaken())
                .category(menu.getCategory())
                .images(images)
                .build();
    }

}
