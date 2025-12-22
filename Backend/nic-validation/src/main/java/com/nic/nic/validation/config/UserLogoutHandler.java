package com.nic.nic.validation.config;

import com.nic.nic.validation.entity.User;
import com.nic.nic.validation.repository.UserRepository;
import com.nic.nic.validation.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserLogoutHandler implements LogoutHandler {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, @Nullable Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String token = authHeader.substring(7);
        String username = jwtUtils.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user != null) {
            user.setToken(null);
            userRepository.save(user);
        }

        SecurityContextHolder.clearContext();
    }
}
