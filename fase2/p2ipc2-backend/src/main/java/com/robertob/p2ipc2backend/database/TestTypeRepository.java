package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.TestType;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

public class TestTypeRepository {
    private Connection connection;

    public TestTypeRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public List<TestType> findAll(){
        String query = "SELECT * FROM test_types";
        List<TestType> testTypes = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                TestType testType = TestType.builder()
                        .id(resultSet.getInt("id"))
                        .name(resultSet.getString("name"))
                        .description(resultSet.getString("description"))
                        .build();
                testTypes.add(testType);
                System.out.println("log: test type listed");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return null;
        }
        return testTypes;
    }
}
