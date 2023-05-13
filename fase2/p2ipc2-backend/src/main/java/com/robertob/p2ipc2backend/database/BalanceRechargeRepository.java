package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.BalanceRecharge;
import com.robertob.p2ipc2backend.models.BalanceRechargeHistory;
import com.robertob.p2ipc2backend.models.CommissionHistory;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

public class BalanceRechargeRepository {
    private final Connection connection;

    public BalanceRechargeRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public boolean create(BalanceRecharge balanceRecharge) {
        try {
            String query = "UPDATE users SET balance = balance + ? WHERE id = ?";
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setDouble(1, balanceRecharge.getAmount());
            preparedStatement.setInt(2, balanceRecharge.getUser_id());
            preparedStatement.executeUpdate();

            String query2 = "INSERT INTO balance_recharges (user_id, amount) VALUES (?, ?)";
            var preparedStatement2 = connection.prepareStatement(query2);
            preparedStatement2.setInt(1, balanceRecharge.getUser_id());
            preparedStatement2.setDouble(2, balanceRecharge.getAmount());
            preparedStatement2.executeUpdate();
            System.out.println("log: balanceRecharge created");
            return true;
        } catch (Exception e) {
            System.out.println("log: error on creating balanceRecharge"+e);
            return false;
        }
    }

    public List<BalanceRechargeHistory> findAllByUserId(int id) {
        String query = "select * from balance_recharges where balance_recharges.user_id = ? order by balance_recharges.created_at desc";
        List<BalanceRechargeHistory> balanceRechargeHistories = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                BalanceRechargeHistory balanceRechargeHistory = BalanceRechargeHistory.builder()
                        .id(preparedStatement.getResultSet().getInt("id"))
                        .user_id(preparedStatement.getResultSet().getInt("user_id"))
                        .amount(preparedStatement.getResultSet().getDouble("amount"))
                        .created_at(preparedStatement.getResultSet().getString("created_at"))
                        .build();
                balanceRechargeHistories.add(balanceRechargeHistory);
            }
        } catch (Exception e) {
            System.out.println("log: error on getting balanceRecharge"+e);
            return null;
        }
        return balanceRechargeHistories;
    }

    public boolean updateAdminCommission(double newCommission) {
        double oldCommission = 0;
        try {
            // first we get the old commission
            String query1 = "select commission from administrator";
            var preparedStatement1 = connection.prepareStatement(query1);
            var resultSet1 = preparedStatement1.executeQuery();
            while (resultSet1.next()) {
                oldCommission = preparedStatement1.getResultSet().getDouble("commission");
            }
            // then we update the commission
            String query = "UPDATE administrator SET commission = ?";
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setDouble(1, newCommission);
            preparedStatement.executeUpdate();

            // then we insert the commission history
            // first, lets update the end_date of the last commission history
            String query3 = "UPDATE commission_history SET end_date = now() WHERE end_date is null";
            var preparedStatement3 = connection.prepareStatement(query3);
            preparedStatement3.executeUpdate();
            // then we insert the new commission history
            String query2 = "INSERT INTO commission_history (start_date, end_date, old_commission, new_commission) VALUES (now(), null, ?, ?)";
            var preparedStatement2 = connection.prepareStatement(query2);
            preparedStatement2.setDouble(1, oldCommission);
            preparedStatement2.setDouble(2, newCommission);
            preparedStatement2.executeUpdate();

            System.out.println("log: admin commission updated" + newCommission);
            return true;
        } catch (Exception e) {
            System.out.println("log: error on updating admin commission"+e);
            return false;
        }
    }


    public List<CommissionHistory> findAllCommissionHistory() {
        String query = "select * from commission_history order by commission_history.created_at desc";
        List<CommissionHistory> commissionHistories = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                CommissionHistory commissionHistory = CommissionHistory.builder()
                        .id(preparedStatement.getResultSet().getInt("id"))
                        .start_date(preparedStatement.getResultSet().getString("start_date"))
                        .end_date(preparedStatement.getResultSet().getString("end_date"))
                        .old_commission(preparedStatement.getResultSet().getDouble("old_commission"))
                        .new_commission(preparedStatement.getResultSet().getDouble("new_commission"))
                        .build();
                commissionHistories.add(commissionHistory);
            }
        } catch (Exception e) {
            System.out.println("log: error on getting commission history"+e);
            return null;
        }
        return commissionHistories;
    }
}
