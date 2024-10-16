package com.rebu.feed.review.entity;

import com.rebu.feed.entity.Feed;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reviewkeyword.entity.SelectedReviewKeyword;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Getter
@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Review extends Feed {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private EmployeeProfile employeeProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private ShopProfile shopProfile;

    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<SelectedReviewKeyword> selectedReviewKeywords;

    private Integer rating;

    public void changeRating(Integer rating){
        this.rating = rating;
    }
}
