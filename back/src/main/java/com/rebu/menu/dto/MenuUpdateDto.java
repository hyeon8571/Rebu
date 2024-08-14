package com.rebu.menu.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuUpdateDto {
    private String title;
    private String content;
    private Integer price;
    private Integer timeTaken;
    private String category;
    private List<MultipartFile> images;
    private Long menuId;
    private String profileNickname;
}
