package com.rebu.menu.dto;

import com.rebu.menu.entity.Menu;
import com.rebu.profile.employee.entity.EmployeeProfile;
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

    public Menu toEntity(Long menuId, EmployeeProfile employee) {
        return Menu.builder()
                .id(menuId)
                .employee(employee)
                .title(this.title)
                .content(this.content)
                .price(this.price)
                .timeTaken(this.timeTaken)
                .category(this.category)
                .build();
    }
}
