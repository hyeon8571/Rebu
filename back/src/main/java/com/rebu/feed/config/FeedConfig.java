package com.rebu.feed.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class FeedConfig {
    @Value("${feed.cnt_image_max_limit}")
    private int cntImageMaxLimit;

    @Value("${feed.cnt_hashtag_max_limit}")
    private int cntHashtagMaxLimit;

    @Value("${feed.storage_base_url}")
    private String baseUrl;

    @Value("${feed.cnt_review_keyword_max_limit}")
    private int cntReviewKeywordMaxLimit;
}
