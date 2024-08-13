package com.rebu.profile.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetProfileResponse {
    private String imageSrc;
    private Long followingCnt;
    private Long followerCnt;
    private String nickname;
    private String introduction;
    private Long reviewCnt;
    private Long scrapCnt;
    private Long favoritesCnt;
    private boolean isPrivate;
    private Relation relation;
    private Long followId;

    public GetProfileResponse(String imageSrc, Long followingCnt, Long followerCnt, String nickname, String introduction, Long reviewCnt, Long scrapCnt, Long favoritesCnt, boolean isPrivate) {
        this.imageSrc = imageSrc;
        this.followingCnt = followingCnt;
        this.followerCnt = followerCnt;
        this.nickname = nickname;
        this.introduction = introduction;
        this.reviewCnt = reviewCnt;
        this.scrapCnt = scrapCnt;
        this.favoritesCnt = favoritesCnt;
        this.isPrivate = isPrivate;
    }

    public enum Relation {
        OWN, FOLLOWING, NONE
    }
}