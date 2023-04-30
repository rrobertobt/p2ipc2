package com.robertob.p2ipc2backend.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private Connection connection = null;
    private final String dbUrl = "jdbc:mysql://localhost/clinic";
    private final String dbUser = "robertob";
    private final String dbPassword = "robertob";

    public Connection getConnection (){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            System.out.println("log: database connection successful");
            return connection;
        } catch (SQLException | ClassNotFoundException ex){
            System.out.println("log: error on database connection: "+ex);
        }
        return null;
    }

    public void disconnect() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("log: connection closed");
            } catch (SQLException se) {
                System.out.println("log: error on closing connection: "+se);
                se.printStackTrace();
            }
        }
    }
}
