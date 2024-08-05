package com.rebu.menu.entity;

import com.rebu.profile.employee.entity.EmployeeProfile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private EmployeeProfile employee;

    @Column(nullable = false)
    private String title;

    private String content;
    private Integer price;

    @Column(nullable = false)
    private Integer timeTaken;

    private String category;

}
