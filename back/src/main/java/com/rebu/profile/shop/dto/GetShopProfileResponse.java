package com.rebu.profile.shop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetShopProfileResponse {
    private String imageSrc;
    private String nickname;
    private String name;
    private String introduction;
    private String address;
    private String phone;
    private Long followingCnt;
    private Long followerCnt;
    private Long feedCnt;
    private Long reviewCnt;
    private Long reservationCnt;
    private boolean isPrivate;
    private Relation relation;
    private Long followId;

    public GetShopProfileResponse(String imageSrc, String nickname, String name, String introduction, String address, String phone, Long followingCnt, Long followerCnt, Long feedCnt, Long reviewCnt, Long reservationCnt, boolean isPrivate) {
        this.imageSrc = imageSrc;
        this.nickname = nickname;
        this.name = name;
        this.introduction = introduction;
        this.address = address;
        this.phone = phone;
        this.followingCnt = followingCnt;
        this.followerCnt = followerCnt;
        this.feedCnt = feedCnt;
        this.reviewCnt = reviewCnt;
        this.reservationCnt = reservationCnt;
        this.isPrivate = isPrivate;
    }

    public enum Relation {
        ONW, FOLLOWING, NONE
    }
}
