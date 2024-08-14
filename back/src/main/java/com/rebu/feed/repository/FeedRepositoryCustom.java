package com.rebu.feed.repository;

import com.rebu.feed.dto.FeedSearchDto;
import com.rebu.feed.dto.FeedOrReviewDto;

import java.util.List;

public interface FeedRepositoryCustom {
    List<FeedOrReviewDto> searchFeeds(FeedSearchDto dto);
}
