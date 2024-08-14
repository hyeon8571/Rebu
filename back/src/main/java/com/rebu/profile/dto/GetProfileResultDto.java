package com.rebu.profile.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetProfileResultDto {
    private String imageSrc;
    private Long followingCnt;
    private Long followerCnt;
    private String nickname;
    private String introduction;
    private Long reviewCnt;
    private Long scrapCnt;
    private Long favoritesCnt;
    private Boolean isPrivate;
    private Relation relation;
    private Long followId;

    public GetProfileResultDto(String imageSrc, Long followingCnt, Long followerCnt, String nickname, String introduction, Long reviewCnt, Long scrapCnt, Long favoritesCnt, Boolean isPrivate) {
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