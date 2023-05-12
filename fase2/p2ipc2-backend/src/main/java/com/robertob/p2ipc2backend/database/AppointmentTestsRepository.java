package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.AppointmentTests;

import java.sql.Connection;

public class AppointmentTestsRepository {
    private final Connection connection;

    public AppointmentTestsRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public boolean create(AppointmentTests[] appointmentTests) {
        try {
            for (AppointmentTests appointmentTest : appointmentTests) {
                String query = "INSERT INTO appointment_tests (appointment_id, test_type_id) values (?, ?)";
                var preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, appointmentTest.getAppointment_id());
                preparedStatement.setInt(2, appointmentTest.getTest_type_id());
                preparedStatement.executeUpdate();
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
