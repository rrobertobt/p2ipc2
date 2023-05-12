package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.BalanceRechargeRepository;
import com.robertob.p2ipc2backend.models.BalanceRecharge;
import com.robertob.p2ipc2backend.models.BalanceRechargeHistory;

import java.util.List;

public class BalanceRechargeService {
    private final BalanceRechargeRepository balanceRechargeRepository;

    public BalanceRechargeService() {
        this.balanceRechargeRepository = new BalanceRechargeRepository();
    }

    public boolean create(BalanceRecharge balanceRecharge) {
        return balanceRechargeRepository.create(balanceRecharge);
    }

    public List<BalanceRechargeHistory> findAllByUserId(int id) {
        return balanceRechargeRepository.findAllByUserId(id);
    }
}
