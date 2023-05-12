package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.InitialSetupMedic;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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

    public List<String> getMedicSchedules(int medic_id) {
        String query = "SELECT schedule FROM medic_schedules WHERE medic_id = ?";
        List<String> schedules = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, medic_id);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String schedule = resultSet.getString("schedule");
                schedules.add(schedule);
                System.out.println("log: schedule found");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return null;
        }
        return schedules;
    }

    public List<String> getMedicSchedules(int medic_id, String date) {
        String query = """
                SELECT DISTINCT medic_schedules.schedule
                FROM medic_schedules
                         LEFT JOIN appointments ON medic_schedules.schedule = appointments.schedule AND appointments.medic_id = ? AND appointments.date = ?
                WHERE appointments.date <> ? OR appointments.date IS NULL
                    AND medic_schedules.medic_id = ?""";
        List<String> schedules = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, medic_id);
            preparedStatement.setString(2, date);
            preparedStatement.setString(3, date);
            preparedStatement.setInt(4, medic_id);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String schedule = resultSet.getString("schedule");
                schedules.add(schedule);
                System.out.println("log: schedule found");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return null;
        }
        return schedules;
    }

}
