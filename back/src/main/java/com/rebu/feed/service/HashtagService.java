package com.rebu.feed.service;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.entity.Hashtag;
import com.rebu.feed.repository.HashtagRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HashtagService {
    private final HashtagRepository hashtagRepository;

    /**
     * HashtagService :: createHashTags method
     * 해시태그를 받아 특정 피드에 등록
     * @param tags 등록할 해시태그 리스트
     * @param feed 해시태그를 저장할 대상 Feed
     */
    public void createHashTags(List<String> tags, Feed feed) {
        if(tags == null || tags.isEmpty())
            return;
        List<Hashtag> hashtag = ListUtils.applyFunctionToElements(tags, element-> Hashtag.builder().tag(element).feed(feed).build());
        hashtagRepository.saveAll(hashtag);
    }

    /**
     * HashtagService :: deleteHashTags method
     * 피드 ID를 받아 해시태그를 모두 삭제
     * @param feedId 삭제할 피드 Id
     */
    public void deleteHashTags(Long feedId) {
        hashtagRepository.deleteByFeedId(feedId);
    }

}
