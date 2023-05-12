package com.robertob.p2ipc2backend.database;

import com.robertob.p2ipc2backend.models.AllMedicsSpecialities;
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

    public List<AllMedicsSpecialities> findAllMedicsSpecialities() {
        String query = "SELECT medics.id as medic_id, users.name AS medic_name, specialities.id as speciality_id, specialities.name AS speciality_name,  medics_specialities.price\n" +
                "FROM medics\n" +
                "         JOIN users ON medics.user_id = users.id\n" +
                "         JOIN medics_specialities ON medics.id = medics_specialities.medic_id\n" +
                "         JOIN specialities ON medics_specialities.speciality_id = specialities.id\n" +
                "         WHERE users.initial_setup = true;";
        List<AllMedicsSpecialities> allMedicsSpecialities = new ArrayList<>();
        try {
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                AllMedicsSpecialities allMedicsSpeciality = AllMedicsSpecialities.builder()
                        .medic_id(resultSet.getInt("medic_id"))
                        .medic_name(resultSet.getString("medic_name"))
                        .speciality_id(resultSet.getInt("speciality_id"))
                        .speciality_name(resultSet.getString("speciality_name"))
                        .price(resultSet.getDouble("price"))
                        .build();
                allMedicsSpecialities.add(allMedicsSpeciality);
                System.out.println(allMedicsSpeciality.toString());
                System.out.println("log: all medics specialities listed");
            }
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return null;
        }
        return allMedicsSpecialities;
    }
}
