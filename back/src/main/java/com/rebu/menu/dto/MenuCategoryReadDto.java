package com.rebu.menu.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MenuCategoryReadDto {
    private List<String> categoryList;

    public static MenuCategoryReadDto from(List<String> categoryList) {
        return MenuCategoryReadDto.builder()
                .categoryList(categoryList)
                .build();
    }

}