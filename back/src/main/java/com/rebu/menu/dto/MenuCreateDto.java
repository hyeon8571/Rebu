package com.rebu.menu.dto;

import com.rebu.menu.entity.Menu;
import com.rebu.profile.employee.entity.EmployeeProfile;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuCreateDto {
    private String profileNickname;
    private String title;
    private String content;
    private Integer price;
    private Integer timeTaken;
    private String category;
    private List<MultipartFile> images;

    public Menu toEntity(EmployeeProfile employee) {
        return Menu.builder()
                .employee(employee)
                .title(this.title)
                .content(this.content)
                .price(this.price)
                .timeTaken(this.timeTaken)
                .category(this.category)
                .build();
    }
}
