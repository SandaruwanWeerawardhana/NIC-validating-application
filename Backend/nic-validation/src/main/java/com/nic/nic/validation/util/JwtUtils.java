package com.nic.nic.validation.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.util.Date;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;

import static io.jsonwebtoken.Jwts.*;

@Component
public class JwtUtils {
    private final SecretKey key;

    public JwtUtils(@Value("${jwt.secret}") String base64Secret) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
    }
    public String generateToken(String username) {
        long expirationMs = 3_600_000L;
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(username)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMs)))
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception err) {
            return false;
        }
    }

    public String extractUsername(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception err) {
            return null;
        }
    }
}
