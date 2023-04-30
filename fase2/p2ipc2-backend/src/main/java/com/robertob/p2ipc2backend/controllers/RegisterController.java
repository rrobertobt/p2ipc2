package com.robertob.p2ipc2backend.controllers;

import java.io.*;
import java.sql.SQLException;

import com.robertob.p2ipc2backend.models.User;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/register")
public class RegisterController extends HttpServlet {
    private final GsonUtils<User> gsonUser;
    private final UserService userService;

    public RegisterController() {
        this.gsonUser = new GsonUtils<>();
        this.userService =  new UserService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var users = userService.list();
        gsonUser.sendAsJson(response, users);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var user = gsonUser.readFromJson(request, User.class);
        boolean success = false;
        success = userService.create(user, response);
        if (!success) {
            System.out.println("log: error on creating user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on creating user");
            return;
        }
        response.setStatus(HttpServletResponse.SC_CREATED);
        gsonUser.sendAsJson(response, user);
    }
}