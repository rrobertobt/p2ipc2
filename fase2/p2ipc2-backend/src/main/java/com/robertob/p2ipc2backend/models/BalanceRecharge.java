package com.robertob.p2ipc2backend.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BalanceRecharge {
    private int user_id;
    private double amount;
}
