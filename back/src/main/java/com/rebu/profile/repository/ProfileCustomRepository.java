package com.rebu.profile.repository;

import com.rebu.profile.entity.Profile;

public interface ProfileCustomRepository {
    Profile findFirstByEmailOrderByRecentTimeDesc(String email);
}
