package com.robertob.p2ipc2backend.database;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.robertob.p2ipc2backend.models.User;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UserRepository {
    private Connection connection;

    public UserRepository() {
        DatabaseConnection dbConnection = new DatabaseConnection();
        connection = dbConnection.getConnection();
    }

    public boolean insert(User user) {
        String query = "INSERT INTO users (name, username, encrypted_password, address, phone, email, cui, birthdate, type) VALUES (?,?,?,?,?,?,?,?,?)";
        String query2 = "";
        try{
            switch (user.getType()) {
                case "patient" -> query2 = "INSERT INTO patients (user_id) VALUES (?)";
                case "medic" -> query2 = "INSERT INTO medics (user_id) VALUES (?)";
                case "laboratory" -> query2 = "INSERT INTO laboratories (user_id) VALUES (?)";
                default -> {}
            }
            var preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getName());
            preparedStatement.setString(2, user.getUsername());
            String encryptedPassword = BCrypt.withDefaults().hashToString(10, user.getPassword().toCharArray());
            preparedStatement.setString(3, encryptedPassword);
            preparedStatement.setString(4, user.getAddress());
            preparedStatement.setString(5, user.getPhone());
            preparedStatement.setString(6, user.getEmail());
            preparedStatement.setString(7, user.getCui());
            preparedStatement.setString(8, user.getBirthdate());
            preparedStatement.setString(9, user.getType());
            preparedStatement.executeUpdate();

            ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
            int userId = 0;
            if(generatedKeys.next()){
                userId = generatedKeys.getInt(1);
            }
            var preparedStatement2 = connection.prepareStatement(query2);
            preparedStatement2.setInt(1, userId);
            preparedStatement2.executeUpdate();
            System.out.println("log: user inserted");
            return true;
        } catch (Exception e){
            System.out.println("log: error on inserting user: "+e);
            return false;
        }
    }

    public List<User> list(){
        String query = "SELECT * FROM users";
        List<User> users = new ArrayList<>();
        try{
            var preparedStatement = connection.prepareStatement(query);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                User user = User.builder()
                        .id(resultSet.getInt("id"))
                        .name(resultSet.getString("name"))
                        .username(resultSet.getString("username"))
                        .address(resultSet.getString("address"))
                        .phone(resultSet.getString("phone"))
                        .email(resultSet.getString("email"))
                        .cui(resultSet.getString("cui"))
                        .birthdate(resultSet.getString("birthdate"))
                        .balance(resultSet.getDouble("balance"))
                        .type(resultSet.getString("type"))
                        .build();
                users.add(user);
                System.out.println("log: user listed");
            }
        } catch (Exception e){
            System.out.println("log: error on listing users: "+e);
        }
        return users;
    }

    public User findOne(String username){
        String query = "SELECT * FROM users WHERE username = ?";
        User user = null;
        try{
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, username);
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                user = User.builder()
                        .id(resultSet.getInt("id"))
                        .name(resultSet.getString("name"))
                        .username(resultSet.getString("username"))
                        .password(resultSet.getString("encrypted_password"))
                        .address(resultSet.getString("address"))
                        .phone(resultSet.getString("phone"))
                        .email(resultSet.getString("email"))
                        .cui(resultSet.getString("cui"))
                        .birthdate(resultSet.getString("birthdate"))
                        .balance(resultSet.getDouble("balance"))
                        .type(resultSet.getString("type"))
                        .build();
                System.out.println("log: user found");
            }
        } catch (Exception e){
            System.out.println("log: error on finding user: "+e);
        }
        return user;
    }

    public boolean update(User user) {
        String query = "";
        if (user.getPassword().equals("")) {
            query = "UPDATE users SET name = ?, username = ?, address = ?, phone = ?, email = ?, cui = ?, birthdate = ? WHERE id = ?";
        } else {
            query = "UPDATE users SET name = ?, username = ?, encrypted_password = ? , address = ?, phone = ?, email = ?, cui = ?, birthdate = ? WHERE id = ?";
        }
        try{
            var preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, user.getName());
            preparedStatement.setString(2, user.getUsername());
            if (!user.getPassword().equals("")) {
                String encryptedPassword = BCrypt.withDefaults().hashToString(10, user.getPassword().toCharArray());
                preparedStatement.setString(3, encryptedPassword);
                preparedStatement.setString(4, user.getAddress());
                preparedStatement.setString(5, user.getPhone());
                preparedStatement.setString(6, user.getEmail());
                preparedStatement.setString(7, user.getCui());
                preparedStatement.setString(8, user.getBirthdate());
                preparedStatement.setInt(9, user.getId());
                System.out.println("log: password updated");
            } else {
                preparedStatement.setString(3, user.getAddress());
                preparedStatement.setString(4, user.getPhone());
                preparedStatement.setString(5, user.getEmail());
                preparedStatement.setString(6, user.getCui());
                preparedStatement.setString(7, user.getBirthdate());
                preparedStatement.setInt(8, user.getId());
                System.out.println("log: password not updated");
            }
            preparedStatement.executeUpdate();
            System.out.println("log: user updated");
            return true;
        } catch (Exception e){
            System.out.println("log: error on updating user: "+e);
            return false;
        }
    }
}
