package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.BalanceRechargeRepository;
import com.robertob.p2ipc2backend.models.BalanceRecharge;

public class BalanceRechargeService {
    private final BalanceRechargeRepository balanceRechargeRepository;

    public BalanceRechargeService() {
        this.balanceRechargeRepository = new BalanceRechargeRepository();
    }

    public boolean create(BalanceRecharge balanceRecharge) {
        return balanceRechargeRepository.create(balanceRecharge);
    }
}
