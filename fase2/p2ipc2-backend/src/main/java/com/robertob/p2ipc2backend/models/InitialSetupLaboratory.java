package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InitialSetupLaboratory {
    int user_id;
    int laboratory_id;
    TestTypeLaboratory[] test_types;
}
