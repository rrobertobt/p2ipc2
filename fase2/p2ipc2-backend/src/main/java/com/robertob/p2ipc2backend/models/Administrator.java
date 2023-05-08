package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Administrator {
    private int id;
    private String name;
    private String email;
    private String password;
    private String username;
    private String birthdate;
    private double balance;

}
