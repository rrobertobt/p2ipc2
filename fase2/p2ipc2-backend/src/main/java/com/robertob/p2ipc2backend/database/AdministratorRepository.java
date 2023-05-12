package com.robertob.p2ipc2backend.database;

import java.sql.Connection;

public class AdministratorRepository {

    private final Connection connection;

    public AdministratorRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public double findCommission() {
        String query = "SELECT commission FROM administrator";
        try {
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getDouble("commission");
            } else {
                return 0;
            }
        } catch (Exception e) {
            System.out.println("log: error on finding administrator"+e);
            return 0;
        }
    }
}
