package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.InitialSetupMedic;

import java.sql.Connection;

public class MedicsSpecialitiesRepository {

    private final Connection connection;

    public MedicsSpecialitiesRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public void insert(InitialSetupMedic initialSetupMedic){
        int medic_id = initialSetupMedic.getMedic_id();
        String query = "INSERT INTO medics_specialities (medic_id, speciality_id) VALUES (?, ?)";
        try {
            for ( var speciality : initialSetupMedic.getSpecialities()) {
                var preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, medic_id);
                preparedStatement.setInt(2, speciality.getId());
                preparedStatement.executeUpdate();
                System.out.println("log: speciality inserted");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
        }
    }

}
