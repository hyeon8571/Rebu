package com.rebu.profile.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetProfileResponse {
    private String imageSrc;
    private Long followersCnt;
    private Long followingCnt;
    private String nickname;
    private String introduction;
    private Long reviewCnt;
    private Long scrapCnt;
    private Long favoritesCnt;
    private boolean isPrivate;
    private Relation relation;

    public GetProfileResponse(String imageSrc, Long followersCnt, Long followingCnt, String nickname, String introduction, Long reviewCnt, Long scrapCnt, Long favoritesCnt, boolean isPrivate) {
        this.imageSrc = imageSrc;
        this.followersCnt = followersCnt;
        this.followingCnt = followingCnt;
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