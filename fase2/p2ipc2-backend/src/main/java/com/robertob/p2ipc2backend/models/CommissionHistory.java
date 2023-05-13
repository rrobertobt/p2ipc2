package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommissionHistory {
    private int id;
    private String start_date;
    private String end_date;
    private double old_commission;
    private double new_commission;
}
