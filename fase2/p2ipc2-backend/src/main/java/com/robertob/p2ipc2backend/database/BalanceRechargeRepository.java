package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.BalanceRecharge;
import com.robertob.p2ipc2backend.models.BalanceRechargeHistory;

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
        try {
            String query = "UPDATE administrator SET commission = ?";
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setDouble(1, newCommission);
            preparedStatement.executeUpdate();
            System.out.println("log: admin commission updated" + newCommission);
            return true;
        } catch (Exception e) {
            System.out.println("log: error on updating admin commission"+e);
            return false;
        }
    }
}
