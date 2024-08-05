package com.rebu.menu.dto;

import com.rebu.menu.entity.Menu;
import com.rebu.menu.entity.MenuPhoto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuPhotoCreateDto {
    private String src;

    public MenuPhoto toEntity(Menu menu) {
        return MenuPhoto.builder()
                .menu(menu)
                .src(this.src)
                .build();
    }
}
