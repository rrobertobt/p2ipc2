package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.Appointment;
import com.robertob.p2ipc2backend.models.NewAppointment;
import com.robertob.p2ipc2backend.models.UpdateAppointment;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

public class AppointmentsRepository {
    private final Connection connection;
    private final AdministratorRepository administratorRepository;

    public AppointmentsRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
        administratorRepository = new AdministratorRepository();
    }

    public boolean create(NewAppointment newAppointment) {
        double commission = administratorRepository.findCommission();
        String query = "INSERT INTO appointments (medic_id, speciality_id, patient_id, date, schedule, report, price, commission) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, newAppointment.getMedic_id());
            preparedStatement.setInt(2, newAppointment.getSpeciality_id());
            preparedStatement.setInt(3, newAppointment.getPatient_id());
            preparedStatement.setString(4, newAppointment.getDate());
            preparedStatement.setString(5, newAppointment.getSchedule());
            preparedStatement.setString(6, newAppointment.getReport());
            preparedStatement.setDouble(7, newAppointment.getPrice());
            preparedStatement.setDouble(8, commission);
            preparedStatement.executeUpdate();
            System.out.println("log: appointment created");

            // subtract the price from the patient's balance
            String query2 = "UPDATE users SET balance = balance - ? WHERE id = (SELECT user_id from patients WHERE id = ?)";
            var preparedStatement2 = connection.prepareStatement(query2);
            preparedStatement2.setDouble(1, newAppointment.getPrice());
            preparedStatement2.setInt(2, newAppointment.getPatient_id());
            preparedStatement2.executeUpdate();
            System.out.println("log: patient's balance updated");

            // add the balance to the medic's balance
            String query3 = "UPDATE users SET balance = balance + ? WHERE id = (SELECT user_id from medics WHERE id = ?)";
            var preparedStatement3 = connection.prepareStatement(query3);
            preparedStatement3.setDouble(1, newAppointment.getPrice());
            preparedStatement3.setInt(2, newAppointment.getMedic_id());
            preparedStatement3.executeUpdate();
            System.out.println("log: medic's balance updated");

            // add the commission percentage of the price to the administrator's balance
            String query4 = "UPDATE users SET balance = balance + ? WHERE id = (SELECT user_id from administrator WHERE id = 1)";
            var preparedStatement4 = connection.prepareStatement(query4);
            preparedStatement4.setDouble(1, newAppointment.getPrice() * commission);
            preparedStatement4.executeUpdate();
            System.out.println("log: administrator's balance updated");

            return true;

        } catch (Exception e) {
            System.out.println("log: error on creating appointment"+e);
            return false;
        }
    }
    public List<Appointment> findAllMedicAppointments(int medic_id, String date) {
        String query = "SELECT appointments.*, specialities.name, users.name AS patient_name FROM appointments JOIN specialities ON appointments.speciality_id = specialities.id JOIN patients ON appointments.patient_id = patients.id JOIN users ON patients.user_id = users.id WHERE appointments.medic_id = ? AND date = ?";
        List<Appointment> appointments = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, medic_id);
            preparedStatement.setString(2, date);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getBigDecimal("commission"));
                Appointment appointment = Appointment.builder()
                        .id(resultSet.getInt("id"))
                        .medic_id(resultSet.getInt("medic_id"))
                        .speciality_id(resultSet.getInt("speciality_id"))
                        .speciality_name(resultSet.getString("name"))
                        .patient_id(resultSet.getInt("patient_id"))
                        .patient_name(resultSet.getString("patient_name"))
                        .date(resultSet.getString("date"))
                        .schedule(resultSet.getString("schedule"))
                        .status(resultSet.getString("status"))
                        .report(resultSet.getString("report"))
                        .price(resultSet.getDouble("price"))
                        .commission(resultSet.getDouble("commission"))
                        .created_at(resultSet.getString("created_at"))
                        .build();
                System.out.println("log: appointment found");
                appointments.add(appointment);
            }
            return appointments;
        } catch (Exception e) {
            System.out.println("log: error on finding appointments"+e);
            return null;
        }
    }
    public Appointment findOne(int id) {
        String query = "SELECT appointments.*, specialities.name, users.name AS patient_name FROM appointments JOIN specialities ON appointments.speciality_id = specialities.id JOIN patients ON appointments.patient_id = patients.id JOIN users ON patients.user_id = users.id WHERE appointments.id = ?";
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id);
            var resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Appointment appointment = Appointment.builder()
                        .id(resultSet.getInt("id"))
                        .medic_id(resultSet.getInt("medic_id"))
                        .speciality_id(resultSet.getInt("speciality_id"))
                        .speciality_name(resultSet.getString("name"))
                        .patient_id(resultSet.getInt("patient_id"))
                        .patient_name(resultSet.getString("patient_name"))
                        .date(resultSet.getString("date"))
                        .schedule(resultSet.getString("schedule"))
                        .status(resultSet.getString("status"))
                        .report(resultSet.getString("report"))
                        .price(resultSet.getDouble("price"))
                        .commission(resultSet.getDouble("commission"))
                        .created_at(resultSet.getString("created_at"))
                        .build();
                System.out.println("log: appointment found");
                return appointment;
            }
            return null;
        } catch (Exception e) {
            System.out.println("log: error on finding appointment"+e);
            return null;
        }
    }

    public void update(int id, UpdateAppointment updateAppointment){
        String query = "UPDATE appointments SET report = ?, status = ? WHERE id = ?";
        try {
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, updateAppointment.getReport());
            preparedStatement.setString(2, updateAppointment.getStatus());
            preparedStatement.setInt(3, id);
            preparedStatement.executeUpdate();
            System.out.println("log: appointment updated");
        } catch (Exception e) {
            System.out.println("log: error on updating appointment"+e);
        }
    }
}
