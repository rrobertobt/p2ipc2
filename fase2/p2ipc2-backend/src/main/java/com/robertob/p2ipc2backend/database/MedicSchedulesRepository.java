package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.InitialSetupMedic;

import java.sql.Connection;

public class MedicSchedulesRepository {
    private Connection connection;

    public MedicSchedulesRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public boolean insert(InitialSetupMedic initialSetupMedic){
        int medic_id = initialSetupMedic.getMedic_id();
        String query = "INSERT INTO medic_schedules (medic_id, schedule) VALUES (?, ?)";
        try {
            for ( var schedule : initialSetupMedic.getSchedules()) {
                var preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, medic_id);
                preparedStatement.setString(2, schedule);
                preparedStatement.executeUpdate();
                System.out.println("log: schedule inserted");
            }
            return true;
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return false;
        }
    }


}
