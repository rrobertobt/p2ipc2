package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InitialSetupMedic {
    int user_id;
    int medic_id;
    String[] schedules;
    SpecialityMedic[] specialities;
}

