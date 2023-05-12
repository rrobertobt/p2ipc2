package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllMedicsSpecialities {
    private int medic_id;
    private String medic_name;
    private int speciality_id;
    private String speciality_name;
    private double price;

}
