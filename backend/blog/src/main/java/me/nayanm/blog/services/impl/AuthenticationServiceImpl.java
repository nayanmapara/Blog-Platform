package me.nayanm.blog.services.impl;

import lombok.RequiredArgsConstructor;
import me.nayanm.blog.services.AuthenticationService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    @Override
    public UserDetails authenticate(String email, String password) {
        return null;
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return "";
    }
}
