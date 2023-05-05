package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.InitialSetupLaboratory;

import java.sql.Connection;

public class LaboratoryTestTypesRepository {
    private final Connection connection;

    public LaboratoryTestTypesRepository (){
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public void insert (InitialSetupLaboratory initialSetupLaboratory){
        int laboratory_id = initialSetupLaboratory.getLaboratory_id();
        String query = "INSERT INTO laboratory_test_type (laboratory_id, test_type_id, price) VALUES (?, ?, ?)";
        try {
            for ( var testType : initialSetupLaboratory.getTest_types()) {
                var preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, laboratory_id);
                preparedStatement.setInt(2, testType.getId());
                preparedStatement.setDouble(3, testType.getPrice());
                preparedStatement.executeUpdate();
                System.out.println("log: test type inserted");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
        }
    }
}
