package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.BalanceRecharge;

import java.sql.Connection;

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
            preparedStatement.setInt(1, balanceRecharge.getUser_id());
            preparedStatement.setDouble(2, balanceRecharge.getAmount());
            preparedStatement.executeUpdate();
            System.out.println("log: balanceRecharge created");
            return true;
        } catch (Exception e) {
            System.out.println("log: error on creating balanceRecharge"+e);
            return false;
        }
    }

}
