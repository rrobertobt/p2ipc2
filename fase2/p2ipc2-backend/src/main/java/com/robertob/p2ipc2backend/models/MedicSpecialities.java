package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicSpecialities {
    private int speciality_id;
    private String speciality_name;
    private String description;

    private double price;
}
