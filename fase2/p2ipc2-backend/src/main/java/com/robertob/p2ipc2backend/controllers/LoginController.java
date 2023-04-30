package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.User;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/login")
public class LoginController extends HttpServlet {
    private final GsonUtils<User> gsonUser;
    private final UserService userService;

    public LoginController() {
        this.gsonUser = new GsonUtils<>();
        this.userService =  new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var user = gsonUser.readFromJson(request, User.class);

        var loggedUser = userService.login(user);

        if (loggedUser == null) {
            System.out.println("log: error on login");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on login");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUser.sendAsJson(response, loggedUser);
//        boolean success = false;
//        success = userService.create(user, response);
//        if (!success) {
//            System.out.println("log: error on creating user");
//            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on creating user");
//            return;
//        }
//        response.setStatus(HttpServletResponse.SC_CREATED);
//        gsonUser.sendAsJson(response, user);
    }
}
