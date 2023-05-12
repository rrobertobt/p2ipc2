package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewAppointment {
    private int medic_id;
    private int speciality_id;
    private int patient_id;
    private String report;
    private String date;
    private String schedule;
    private double price;
}
