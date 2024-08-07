package com.rebu.security.dto;

import com.rebu.profile.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class AuthProfileInfo implements UserDetails {

    private final Profile profile;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return profile.getMember().getStatus().toString();
            }
        });
        return authorities;
    }

    @Override
    public String getPassword() {
        return profile.getMember().getPassword();
    }

    @Override
    public String getUsername() {
        return profile.getMember().getEmail();
    }

    public String getEmail() {
        return profile.getMember().getEmail();
    }

    public String getNickname() {
        return profile.getNickname();
    }

    public String getType() {
        return profile.getType().toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
