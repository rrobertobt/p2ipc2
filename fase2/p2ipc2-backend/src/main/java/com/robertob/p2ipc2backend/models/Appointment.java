package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    private int id;
    private int medic_id;
    private int speciality_id;

    private String speciality_name;
    private int patient_id;
    private String patient_name;
    private String date;
    private String schedule;
    private String status;
    private String report;
    private double price;
    private double commission;
    private String created_at;
}
