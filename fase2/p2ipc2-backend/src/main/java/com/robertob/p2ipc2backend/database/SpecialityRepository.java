package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.Speciality;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

public class SpecialityRepository {
    private Connection connection;

    public SpecialityRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }


    public List<Speciality> findAll() {
        String query = "SELECT * FROM specialities";
        List<Speciality> specialities = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Speciality speciality = Speciality.builder()
                        .id(resultSet.getInt("id"))
                        .name(resultSet.getString("name"))
                        .description(resultSet.getString("description"))
                        .build();
                specialities.add(speciality);
                System.out.println("log: speciality listed");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return null;
        }
        return specialities;
    }
}
