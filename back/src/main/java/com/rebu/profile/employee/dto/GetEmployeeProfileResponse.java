package com.rebu.profile.employee.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetEmployeeProfileResponse {
    private String imageSrc;
    private String nickname;
    private String introduction;
    private boolean isPrivate;
    private String workingName;
    private Long followingCnt;
    private Long followerCnt;
    private Long feedCnt;
    private Long reviewCnt;
    private Long scrapCnt;
    private Relation relation;

    public GetEmployeeProfileResponse(String imageSrc, String nickname, String introduction, boolean isPrivate, String workingName, Long followingCnt, Long followerCnt, Long feedCnt, Long reviewCnt, Long scrapCnt) {
        this.imageSrc = imageSrc;
        this.nickname = nickname;
        this.introduction = introduction;
        this.isPrivate = isPrivate;
        this.workingName = workingName;
        this.followingCnt = followingCnt;
        this.followerCnt = followerCnt;
        this.feedCnt = feedCnt;
        this.reviewCnt = reviewCnt;
        this.scrapCnt = scrapCnt;
    }

    public enum Relation {
        OWN, FOLLOWING, NONE
    }
}
