package com.rebu.menu.dto;

import com.rebu.menu.entity.Menu;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuDto {
    private Long id;
    private String title;
    private String content;
    private Integer price;
    private Integer timeTaken;
    private String category;

    public static MenuDto from(Menu menu) {
        return MenuDto.builder()
                .id(menu.getId())
                .title(menu.getTitle())
                .content(menu.getContent())
                .price(menu.getPrice())
                .timeTaken(menu.getTimeTaken())
                .category(menu.getCategory())
                .build();
    }
}
