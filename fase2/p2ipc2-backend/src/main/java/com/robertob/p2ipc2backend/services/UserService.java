package com.robertob.p2ipc2backend.services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.robertob.p2ipc2backend.database.UserRepository;
import com.robertob.p2ipc2backend.models.Administrator;
import com.robertob.p2ipc2backend.models.User;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class UserService {
    private final UserRepository userRepository;

    public UserService() {
        this.userRepository = new UserRepository();
    }

    public boolean create(User user) {
        return userRepository.insert(user);
    }

    public boolean createAdmin(Administrator admin) {
        return userRepository.insertAdmin(admin);
    }

    public boolean update(User user) {
        return userRepository.update(user);
    }
    public User login(User user) {
        var existingUser = userRepository.findOne(user.getUsername());
        if (existingUser == null) {
            System.out.println("log: user not found");
            return null;
        }
        if (!BCrypt.verifyer().verify(user.getPassword().toCharArray(), existingUser.getPassword()).verified) {
            System.out.println("log: wrong password");
            return null;
        }
        existingUser.setPassword(null);
        return existingUser;
    }
    public User findOne(int id){
        return userRepository.findOne(id);
    }

    public List<User> list(){
        return userRepository.list();
    }
}
