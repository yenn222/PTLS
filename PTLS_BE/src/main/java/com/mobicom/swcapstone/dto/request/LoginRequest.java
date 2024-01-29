package com.mobicom.swcapstone.dto.request;

import com.mobicom.swcapstone.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LoginRequest {

    private String userId;
    private String password;

    private Role role;
}
