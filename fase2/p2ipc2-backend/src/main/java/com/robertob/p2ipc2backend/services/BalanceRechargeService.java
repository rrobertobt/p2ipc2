package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.BalanceRechargeRepository;
import com.robertob.p2ipc2backend.models.BalanceRecharge;
import com.robertob.p2ipc2backend.models.BalanceRechargeHistory;
import com.robertob.p2ipc2backend.models.CommissionHistory;

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

    public boolean updateAdminCommission(double newCommission){
        return balanceRechargeRepository.updateAdminCommission(newCommission);
    }

    public List<CommissionHistory> findAllCommissionHistory(){
        return balanceRechargeRepository.findAllCommissionHistory();
    }
}
