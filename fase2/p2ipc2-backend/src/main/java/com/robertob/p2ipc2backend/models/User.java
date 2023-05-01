package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter @Setter @ToString @Builder
@NoArgsConstructor @AllArgsConstructor
public class User {
    private int id;
    private String name;
    private String username;
    private String password;
    private String address;
    private String phone;
    private String email;
    private String cui;
    private String birthdate;
    private String type;
    private boolean initial_setup;
    private int patient_id;
    private int medic_id;
    private int laboratory_id;
    private double balance;
}
