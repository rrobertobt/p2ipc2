package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Speciality {
    private int id;
    private String name;
    private String description;
}
