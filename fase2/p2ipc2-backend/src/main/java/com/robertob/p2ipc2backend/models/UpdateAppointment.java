package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAppointment {
    private int appointment_id;
    private String status;
    private String report;

    private AppointmentTests[] appointment_tests;

}
