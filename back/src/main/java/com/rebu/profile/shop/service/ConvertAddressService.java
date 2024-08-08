package com.rebu.profile.shop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rebu.profile.shop.dto.ConvertAddressDto;
import com.rebu.profile.shop.exception.ConvertAddressFailException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConvertAddressService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private static final String KAKAO_API_URL = "https://dapi.kakao.com/v2/local/search/address.json";

    @Value("${kakao.api.key}")
    private String KAKAO_API_KEY;

    public ConvertAddressDto convert(String address) {
        String url = KAKAO_API_URL + "?query=" + address;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + KAKAO_API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        try {
            Map<String, Object> jsonResponse = objectMapper.readValue(response.getBody(), Map.class);

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> documents = (List<Map<String, Object>>) jsonResponse.get("documents");

            if (!documents.isEmpty()) {
                Map<String, Object> firstDocument = documents.get(0);
                double x = Double.parseDouble(firstDocument.get("x").toString());
                double y = Double.parseDouble(firstDocument.get("y").toString());
                return new ConvertAddressDto(x, y);
            }
        } catch (JsonProcessingException e) {
            throw new ConvertAddressFailException();
        }
        return new ConvertAddressDto();
    }
}
